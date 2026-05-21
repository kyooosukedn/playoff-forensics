from fastapi import APIRouter, HTTPException
from app.services import nba_stats

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/players")
async def playoff_player_stats():
    """Top 25 playoff performers with counting stats."""
    try:
        return {"players": nba_stats.get_playoff_player_stats()}
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/teams")
async def playoff_team_stats():
    """Advanced team stats: offensive/defensive rating, net rating, PIE, pace."""
    try:
        return {"teams": nba_stats.get_playoff_team_stats()}
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/team/{abbr}")
async def team_record(abbr: str):
    """Specific team playoff record and averages."""
    try:
        return nba_stats.get_team_record(abbr.upper())
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/shot-chart/{player_id}")
async def shot_chart(player_id: int):
    """Shot location data for a specific player."""
    try:
        return {"shots": nba_stats.get_shot_chart(player_id)}
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/standings")
async def standings():
    """Current playoff standings."""
    try:
        return {"standings": nba_stats.get_standings()}
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/box-score/{game_id}")
async def box_score(game_id: str):
    """Advanced box score for a specific game."""
    try:
        return {"boxScore": nba_stats.get_box_score_advanced(game_id)}
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
