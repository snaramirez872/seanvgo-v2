from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.health import router as health_router

app = FastAPI(title="SeanVGO v2 API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",              # local dev frontend
        "https://your-frontend.vercel.app"   # deployed frontend
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