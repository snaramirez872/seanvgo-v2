from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.health import router as health_router
from app.routes.games import router as games_router

app = FastAPI(title="SeanVGO v2 API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",              # local dev frontend
        "https://seanvgo-v2.vercel.app"   # deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Sanity Check
@app.get("/")
def root():
    return {
        "message": "Backend is running"
    }

# Other Routes
app.include_router(health_router, prefix="/api")
app.include_router(games_router, prefix="/api")