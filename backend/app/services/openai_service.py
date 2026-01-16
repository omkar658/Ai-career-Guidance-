from app.core.config import settings

class OpenAIService:
    def __init__(self):
        # Simplified service - no AI processing
        pass

    async def chat_with_user(self, message: str, context: dict = None) -> str:
        """Basic chat responses - simplified version"""
        message = message.lower().strip()

        if "skill" in message or "learn" in message:
            return "I can help you organize your skills and learning goals. Your profile information has been saved successfully."
        elif "career" in message or "job" in message:
            return "Your career goals have been recorded. Focus on building experience in your chosen field."
        elif "resume" in message or "cv" in message:
            return "Resume tips: Keep it concise, highlight achievements, and tailor it for each job application."
        elif "help" in message:
            return "I'm here to acknowledge your career journey. Your profile data is safely stored in our database."
        else:
            return "Thank you for sharing. Your information has been saved. Continue building your career step by step."

# Create singleton instance
openai_service = OpenAIService()