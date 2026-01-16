from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import settings
from app.core.config import settings

# Import routers
from app.routers import auth, profile, dashboard, chat

# Create FastAPI app
app = FastAPI(
    title="AI Career Guidance Platform API",
    description="AI-powered personalized learning, career guidance, and resume readiness platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
def parse_cors_origins(origins_str: str) -> list[str]:
    """Parse comma-separated CORS origins string into list"""
    if not origins_str or not origins_str.strip():
        return ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8000"]
    return [origin.strip() for origin in origins_str.split(',') if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=parse_cors_origins(settings.allowed_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile Management"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "success": True,
        "message": "AI Career Guidance Platform API is running",
        "version": "1.0.0",
        "status": "healthy"
    }

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "message": str(exc)
        }
    )

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )