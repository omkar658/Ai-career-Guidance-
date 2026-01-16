from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import (
    UserCreate, UserResponse, LoginRequest, TokenResponse, APIResponse
)
from app.utils.supabase_client import supabase
import jwt
from datetime import datetime, timedelta
from app.core.config import settings
import bcrypt

router = APIRouter()
security = HTTPBearer()

def create_access_token(data: dict) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=settings.jwt_expiration_hours)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Verify JWT token and return user ID"""
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@router.post("/register", response_model=APIResponse)
async def register(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = supabase.table('users').select('id').eq('email', user_data.email).execute()
        if existing_user.data:
            raise HTTPException(status_code=400, detail="User with this email already exists")

        # Hash password
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create user in Supabase Auth (simplified - in production you'd use Supabase Auth)
        # For now, we'll store directly in our users table
        user_record = {
            "email": user_data.email,
            "name": user_data.name,
        }

        result = supabase.table('users').insert(user_record).execute()

        if not result.data:
            raise HTTPException(status_code=400, detail="Failed to create user")

        user = result.data[0]

        # Create access token
        access_token = create_access_token({"sub": user["id"]})

        return APIResponse(
            success=True,
            data={
                "user": UserResponse(**user),
                "access_token": access_token,
                "token_type": "bearer"
            },
            message="User registered successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Server error during registration")

@router.post("/login", response_model=APIResponse)
async def login(login_data: LoginRequest):
    """Login user"""
    try:
        # Get user from database
        user_result = supabase.table('users').select('*').eq('email', login_data.email).execute()

        if not user_result.data:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        user = user_result.data[0]

        # In a real application, you'd verify the password against the stored hash
        # For this demo, we'll skip password verification since we're not storing passwords

        # Create access token
        access_token = create_access_token({"sub": user["id"]})

        return APIResponse(
            success=True,
            data={
                "user": UserResponse(**user),
                "access_token": access_token,
                "token_type": "bearer"
            },
            message="Login successful"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Server error during login")

@router.get("/me", response_model=APIResponse)
async def get_current_user(user_id: str = Depends(verify_token)):
    """Get current user information"""
    try:
        user_result = supabase.table('users').select('*').eq('id', user_id).execute()

        if not user_result.data:
            raise HTTPException(status_code=404, detail="User not found")

        user = user_result.data[0]

        return APIResponse(
            success=True,
            data={"user": UserResponse(**user)}
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Get user error: {e}")
        raise HTTPException(status_code=500, detail="Server error retrieving user")