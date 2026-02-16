from fastapi import APIRouter, HTTPException, Request
from app.core.config import supabase

router = APIRouter()

@router.get("/games", tags=["games"])
def get_games_list(request: Request):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise HTTPException(status_code=401, detail="Missing Authorization header")

        token = auth_header.replace("Bearer ", "")

        user_resp = supabase.auth.get_user(token)
        user = user_resp.user

        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        resp = (
            supabase
            .table("games_list")
            .select("*")
            .eq("user_id", user.id)
            .execute()
        )

        return {
            "count": len(resp.data),
            "data": resp.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/games", tags=["games"])
def create_game(game: dict, request: Request):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise HTTPException(status_code=401, detail="Missing Authorization header")

        token = auth_header.replace("Bearer ", "")

        user_resp = supabase.auth.get_user(token)
        user = user_resp.user

        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        game["user_id"] = user.id

        resp = supabase.table("games_list").insert(game).execute()
        return {"count": 1, "data": resp.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/games/{game_id}", tags=["games"])
def delete_game(game_id: int, request: Request):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise HTTPException(status_code=401, detail="Missing Authorization header")

        token = auth_header.replace("Bearer ", "")

        user_resp = supabase.auth.get_user(token)
        user = user_resp.user

        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        resp = (
            supabase
            .table("games_list")
            .delete()
            .eq("id", game_id)
            .eq("user_id", user.id)
            .execute()
        )

        if not resp.data:
            raise HTTPException(status_code=404, detail="Game not found")
        
        return {"message": "Game deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))