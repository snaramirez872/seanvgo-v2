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
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/games", tags=["games"])
def create_game(game: dict):
    try:
        resp = supabase.table("games_list").insert(game).execute()
        return {"count": 1, "data": resp.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/games/{game_id}", tags=["games"])
def delete_game(game_id: int):
    try:
        resp = supabase.table("games_list").delete().eq("id", game_id).execute()
        return {"message": "Game deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))