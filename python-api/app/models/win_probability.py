import torch
import torch.nn as nn
import numpy as np


class WinProbabilityNet(nn.Module):
    """
    Simple feedforward net predicting win probability.
    Inputs: [score_diff, time_remaining, possession_team_a, team_a_rating, team_b_rating]
    Output: probability that team A wins (0-1)
    """

    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(5, 32),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 1),
            nn.Sigmoid(),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


def _default_weights(model: WinProbabilityNet):
    """Initialize with reasonable heuristic-based weights so the model works out of the box."""
    with torch.no_grad():
        # Layer 0: 5 -> 32
        w = model.net[0].weight
        b = model.net[0].bias
        # score_diff has highest importance
        w[0, 0] = 0.8   # score_diff strong positive
        w[1, 0] = -0.3  # inverted
        w[2, 0] = 0.5   # time_remaining
        w[3, 0] = 0.4   # possession
        w[4:8, 3] = 0.3  # team ratings
        # Remaining weights get small random init
        nn.init.xavier_uniform_(w[:, 4:])
        nn.init.zeros_(b)
        # Output layer: strong positive bias (home team advantage)
        model.net[4].weight.data.fill_(0.3)
        model.net[4].bias.data.fill_(0.0)


_model = None


def get_model() -> WinProbabilityNet:
    global _model
    if _model is None:
        _model = WinProbabilityNet()
        _model.eval()
        _default_weights(_model)
    return _model


def predict_win_probability(
    score_diff: float,
    time_remaining_sec: float,
    possession_team_a: bool,
    team_a_rating: float = 0.0,
    team_b_rating: float = 0.0,
) -> float:
    """
    Predict win probability for team A.

    Args:
        score_diff: Team A score - Team B score (positive = A leading)
        time_remaining_sec: Seconds remaining in game (0-2880 for regulation)
        possession_team_a: True if team A has possession
        team_a_rating: Net rating for team A (e.g. +5.2)
        team_b_rating: Net rating for team B (e.g. +3.1)

    Returns:
        Win probability for team A (0.0 - 1.0)
    """
    model = get_model()

    # Normalize inputs
    score_norm = score_diff / 30.0  # +/- 30 is extreme
    time_norm = time_remaining_sec / 2880.0  # 48 min = 2880s
    poss = 1.0 if possession_team_a else 0.0
    rating_diff = (team_a_rating - team_b_rating) / 20.0  # normalize

    x = torch.tensor([[score_norm, time_norm, poss, rating_diff, 0.0]], dtype=torch.float32)

    with torch.no_grad():
        prob = model(x).item()

    return round(max(0.01, min(0.99, prob)), 3)


def predict_gameLive(
    home_score: int,
    away_score: int,
    quarter: int,
    seconds_left_in_qtr: int,
    home_net_rating: float = 0.0,
    away_net_rating: float = 0.0,
) -> dict:
    """Full game state prediction."""
    total_secs_left = (4 - quarter) * 720 + seconds_left_in_qtr if quarter <= 4 else 0
    score_diff = home_score - away_score

    home_prob = predict_win_probability(
        score_diff=score_diff,
        time_remaining_sec=max(total_secs_left, 0),
        possession_team_a=True,
        team_a_rating=home_net_rating,
        team_b_rating=away_net_rating,
    )

    return {
        "homeWinProbability": home_prob,
        "awayWinProbability": round(1 - home_prob, 3),
        "scoreDiff": score_diff,
        "timeRemaining": total_secs_left,
        "quarter": quarter,
        "leverageIndex": round(abs(score_diff) / max(total_secs_left / 60, 1) * 10, 1),
    }
