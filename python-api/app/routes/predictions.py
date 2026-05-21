from fastapi import APIRouter
from pydantic import BaseModel
from app.models.win_probability import predict_game_live

router = APIRouter(prefix="/predictions", tags=["predictions"])


class WinProbRequest(BaseModel):
    homeScore: int = 0
    awayScore: int = 0
    quarter: int = 1
    secondsLeftInQtr: int = 720
    homeNetRating: float = 0.0
    awayNetRating: float = 0.0


@router.post("/win-probability")
async def win_probability(req: WinProbRequest):
    """
    PyTorch-powered win probability prediction.

    Uses a feedforward neural net considering score differential,
    time remaining, possession, and team net ratings.
    """
    result = predict_game_live(
        home_score=req.homeScore,
        away_score=req.awayScore,
        quarter=req.quarter,
        seconds_left_in_qtr=req.secondsLeftInQtr,
        home_net_rating=req.homeNetRating,
        away_net_rating=req.awayNetRating,
    )
    return result


@router.get("/win-probability/sample")
async def win_probability_sample():
    """Sample prediction for a close 4th quarter game."""
    return predict_game_live(
        home_score=98,
        away_score=96,
        quarter=4,
        seconds_left_in_qtr=324,
        home_net_rating=5.2,
        away_net_rating=3.8,
    )
