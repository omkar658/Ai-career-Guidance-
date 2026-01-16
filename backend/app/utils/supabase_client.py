from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    return create_client(settings.supabase_url, settings.supabase_key)

def get_supabase_admin_client() -> Client:
    """Get Supabase admin client with service role key"""
    if not settings.supabase_service_role_key:
        raise ValueError("SUPABASE_SERVICE_ROLE_KEY is required for admin operations")

    return create_client(settings.supabase_url, settings.supabase_service_role_key)

# Create global client instances
supabase = get_supabase_client()

async def test_connection() -> bool:
    """Test Supabase connection"""
    try:
        # Simple query to test connection
        response = supabase.table('users').select('id').limit(1).execute()
        return True
    except Exception as e:
        print(f"Supabase connection error: {e}")
        return False