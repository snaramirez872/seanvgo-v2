from fastapi import APIRouter, HTTPException, Depends
from app.core.config import supabase

router = APIRouter()

@router.get("/games", tags=["games"])
def get_games_list():
    try:
        resp = supabase.table("games_list").select("*").execute()

        return {
            "count": len(resp.data),
            "data": resp.data
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )