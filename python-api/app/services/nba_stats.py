import time
import pandas as pd
from nba_api.stats.endpoints import (
    leagueleaders,
    playerdashptshots,
    teamdashboardbygeneralsplits,
    boxscoreadvancedv3,
    leaguedashteamstats,
    leaguestandings,
    scoreboardv2,
)
from functools import lru_cache

SEASON = "2025-26"
SEASON_TYPE = "Playoffs"

_headers = {
    "User-Agent": "PlayoffForensics/1.0",
    "Accept": "application/json",
}


def _df(endpoint_method, **kwargs) -> pd.DataFrame:
    """Call an nba_api endpoint and return a DataFrame."""
    time.sleep(0.6)  # rate limit
    result = endpoint_method(**kwargs, timeout=30)
    return result.get_data_frame()


def get_playoff_player_stats() -> list[dict]:
    """Top playoff performers sorted by PTS."""
    df = _df(
        leagueleaders.LeagueLeaders,
        season=SEASON,
        season_type_all_star=SEASON_TYPE,
        per_mode48="PerGame",
    )
    if df.empty:
        return []

    cols = {
        "PLAYER_ID": "playerId",
        "PLAYER": "player",
        "TEAM_ABBREVIATION": "team",
        "GP": "gp",
        "PTS": "pts",
        "REB": "reb",
        "AST": "ast",
        "STL": "stl",
        "BLK": "blk",
        "FG_PCT": "fgPct",
        "FG3_PCT": "fg3Pct",
        "FT_PCT": "ftPct",
        "TOV": "tov",
        "MIN": "min",
        "EFF": "eff",
    }
    df = df.rename(columns=cols)
    df = df[list(cols.values())]
    return df.head(25).to_dict(orient="records")


def get_playoff_team_stats() -> list[dict]:
    """Advanced team stats for the playoffs."""
    df = _df(
        leaguedashteamstats.LeagueDashTeamStats,
        season=SEASON,
        season_type_all_star=SEASON_TYPE,
        measure_type_detailed_defense="Advanced",
        per_mode_detailed="PerGame",
    )
    if df.empty:
        return []

    keep = {
        "TEAM_ID": "teamId",
        "TEAM_NAME": "team",
        "GP": "gp",
        "W": "wins",
        "L": "losses",
        "OFF_RATING": "offRating",
        "DEF_RATING": "defRating",
        "NET_RATING": "netRating",
        "PIE": "pie",
        "TS_PCT": "tsPct",
        "EFG_PCT": "efgPct",
        "AST_RATIO": "astRatio",
        "REB_PCT": "rebPct",
        "PACE": "pace",
    }
    df = df[[c for c in keep if c in df.columns]]
    df = df.rename(columns={k: v for k, v in keep.items() if k in df.columns})
    return df.to_dict(orient="records")


def get_team_record(team_abbr: str) -> dict:
    """Team dashboard for a specific team."""
    df = _df(
        teamdashboardbygeneralsplits.TeamDashboardByGeneralSplits,
        team_id=_team_id(team_abbr),
        season=SEASON,
        season_type_all_star=SEASON_TYPE,
    )
    if df.empty:
        return {}
    row = df.iloc[0]
    return {
        "team": team_abbr,
        "gp": int(row.get("GP", 0)),
        "wins": int(row.get("W", 0)),
        "losses": int(row.get("L", 0)),
        "pts": float(row.get("PTS", 0)),
        "reb": float(row.get("REB", 0)),
        "ast": float(row.get("AST", 0)),
        "fgPct": float(row.get("FG_PCT", 0)),
        "fg3Pct": float(row.get("FG3_PCT", 0)),
    }


@lru_cache(maxsize=40)
def _team_id(abbr: str) -> int:
    """Resolve team abbreviation to ID via standings."""
    df = _df(leaguestandings.LeagueStandings, season=SEASON, season_type=SEASON_TYPE)
    row = df[df["TeamAbbreviation"] == abbr]
    if row.empty:
        raise ValueError(f"Team not found: {abbr}")
    return int(row.iloc[0]["TeamID"])


def get_shot_chart(player_id: int) -> list[dict]:
    """Shot locations for a player in the playoffs."""
    df = _df(
        playerdashptshots.PlayerDashPtShots,
        player_id=player_id,
        season=SEASON,
        season_type_all_star=SEASON_TYPE,
    )
    if df.empty:
        return []
    return df.to_dict(orient="records")


def get_box_score_advanced(game_id: str) -> dict:
    """Advanced box score for a specific game."""
    df = _df(
        boxscoreadvancedv3.BoxScoreAdvancedV3,
        game_id=game_id,
    )
    if df.empty:
        return {}
    return df.to_dict(orient="records")


def get_standings() -> list[dict]:
    """Current playoff standings."""
    df = _df(
        leaguestandings.LeagueStandings,
        season=SEASON,
        season_type=SEASON_TYPE,
    )
    if df.empty:
        return []
    cols = ["TeamAbbreviation", "TeamCity", "TeamName", "Conference", "W", "L", "Pct", "GB", "PlayoffRank"]
    df = df[[c for c in cols if c in df.columns]]
    return df.to_dict(orient="records")
