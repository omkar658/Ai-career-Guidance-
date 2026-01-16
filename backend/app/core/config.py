from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from pydantic import field_validator

class Settings(BaseSettings):
    # Server settings
    port: int = 8000
    debug: bool = False

    # Supabase settings
    supabase_url: str = "https://placeholder.supabase.co"
    supabase_key: str = "placeholder_key"
    supabase_service_role_key: Optional[str] = None

    # OpenAI settings (not used in simplified version)
    openai_api_key: str = ""

    # Google API settings (optional)
    google_api_key: Optional[str] = None

    # JWT settings (not used in simplified version)
    jwt_secret_key: str = ""
    jwt_algorithm: str = "HS256"
    jwt_expiration_hours: int = 24 * 7  # 7 days

    # CORS settings
    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000"

    # Rate limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 900000  # 15 minutes in milliseconds

    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings()

# Check if Supabase is configured
supabase_configured = (
    settings.supabase_url != "https://placeholder.supabase.co" and
    settings.supabase_url != "https://your-project-id.supabase.co" and
    settings.supabase_key != "placeholder_key" and
    settings.supabase_key != "your-anon-key-here" and
    len(settings.supabase_key) > 10 and
    not settings.supabase_url.startswith("https://your-")  # Check for placeholder patterns
)

if supabase_configured:
    print("Supabase is configured - using database storage")
else:
    print("Using in-memory storage (data won't persist between restarts)")
    print("Database tables not set up - running in demo mode")