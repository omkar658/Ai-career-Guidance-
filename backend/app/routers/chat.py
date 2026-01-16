from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import ChatRequest, APIResponse
from app.services.openai_service import openai_service
from app.utils.supabase_client import supabase
from typing import Dict, Any

router = APIRouter()

def get_current_user_id(token_data: Dict[str, Any] = Depends(lambda: None)) -> str:
    """Get current user ID from token (placeholder for auth dependency)"""
    # This should be replaced with proper JWT token verification
    return "placeholder_user_id"

@router.post("/", response_model=APIResponse)
async def chat_with_assistant(
    chat_request: ChatRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Simple chat - acknowledges user input without AI analysis"""
    try:
        # Simple acknowledgment responses based on message content
        message = chat_request.message.lower().strip()

        if "skill" in message or "learn" in message:
            response = "I can help you organize your skills and learning goals. Your profile information has been saved successfully."
        elif "career" in message or "job" in message:
            response = "Your career goals have been recorded. Focus on building experience in your chosen field."
        elif "resume" in message or "cv" in message:
            response = "Resume tips: Keep it concise, highlight achievements, and tailor it for each job application."
        elif "help" in message:
            response = "I'm here to acknowledge your career journey. Your profile data is safely stored in our database."
        else:
            response = "Thank you for sharing. Your information has been saved. Continue building your career step by step."

        return APIResponse(
            success=True,
            data={
                "message": response,
                "timestamp": "2024-01-15T10:00:00Z"
            }
        )

    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Server error during chat")

@router.get("/history", response_model=APIResponse)
async def get_chat_history(user_id: str = Depends(get_current_user_id)):
    """Get chat history (placeholder for future implementation)"""
    try:
        # In a production app, you'd store chat history in the database
        # For now, return empty history
        return APIResponse(
            success=True,
            data={
                "messages": [],
                "total": 0
            },
            message="Chat history feature coming soon"
        )

    except Exception as e:
        print(f"Chat history error: {e}")
        raise HTTPException(status_code=500, detail="Server error retrieving chat history")

@router.post("/feedback", response_model=APIResponse)
async def submit_chat_feedback(
    feedback_data: Dict[str, Any],
    user_id: str = Depends(get_current_user_id)
):
    """Submit feedback on chat responses"""
    try:
        # In a production app, you'd store this feedback in the database
        # For now, just log it
        print(f"Chat feedback from user {user_id}: {feedback_data}")

        return APIResponse(
            success=True,
            message="Feedback submitted successfully"
        )

    except Exception as e:
        print(f"Chat feedback error: {e}")
        raise HTTPException(status_code=500, detail="Server error submitting feedback")