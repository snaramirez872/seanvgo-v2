"""API Health"""
from fastapi import APIRouter
from app.core.config import supabase

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "supabase": supabase is not None
    }