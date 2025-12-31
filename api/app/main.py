from fastapi import FastAPI
from app.routes.health import router as health_router

app = FastAPI(title="SeanVGO v2 API")

# Root Sanity Check
@app.get("/")
def root():
    return {
        "message": "Backend is running"
    }

# Other Routes
app.include_router(health_router, prefix="/api")