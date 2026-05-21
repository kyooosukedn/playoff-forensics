from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import stats, predictions

app = FastAPI(
    title="Playoff Forensics Analytics API",
    description="NBA playoff analytics powered by nba_api, pandas, and PyTorch",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stats.router)
app.include_router(predictions.router)


@app.get("/")
async def root():
    return {
        "service": "Playoff Forensics Analytics",
        "endpoints": [
            "/stats/players",
            "/stats/teams",
            "/stats/team/{abbr}",
            "/stats/shot-chart/{player_id}",
            "/stats/standings",
            "/stats/box-score/{game_id}",
            "/predictions/win-probability",
            "/predictions/win-probability/sample",
        ],
        "stack": ["FastAPI", "nba_api", "pandas", "PyTorch"],
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
