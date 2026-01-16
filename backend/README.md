# AI Career Guidance Platform - Python Backend

FastAPI-based backend for the AI-powered career guidance platform.

## Features

- **FastAPI Framework**: Modern, fast web framework for Python
- **OpenAI Integration**: AI-powered career analysis and chat
- **Supabase Database**: Real-time database with authentication
- **Pydantic Models**: Type-safe data validation
- **CORS Support**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting for security

## Setup Instructions

### 1. Automated Setup (Recommended)

```bash
cd python-backend
python setup_venv.py
```

This will:
- ✅ Check Python version compatibility
- ✅ Create a virtual environment
- ✅ Install all dependencies
- ✅ Create your `.env` file
- ✅ Test the setup

### 2. Manual Setup

If automated setup doesn't work:

```bash
cd python-backend
pip install -r requirements.txt
```

Then create your `.env` file manually (see `ENV_SETUP.md` for detailed instructions).

### 2. Environment Configuration

Create a `.env` file in the `python-backend` directory:

```env
# Server Configuration
PORT=8000
DEBUG=false

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_change_this_in_production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=168

# CORS Configuration (comma-separated URLs)
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000
```

### 3. Database Setup

Run the SQL schema in your Supabase project:

```sql
-- Copy and run the contents of database/schema.sql in your Supabase SQL editor
```

### 4. Start the Server

```bash
# Development mode (with auto-reload)
python -m app.main

# Or using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profile Management
- `POST /api/profile` - Create/update user profile
- `GET /api/profile` - Get user profile
- `POST /api/profile/analyze` - Trigger AI analysis

### Dashboard
- `GET /api/dashboard` - Get dashboard overview
- `GET /api/dashboard/skill-gaps` - Get skill gap analysis
- `GET /api/dashboard/roadmap` - Get learning roadmap
- `GET /api/dashboard/career` - Get career recommendations
- `GET /api/dashboard/resume` - Get resume guidance
- `GET /api/dashboard/sdg` - Get SDG impact

### Chat
- `POST /api/chat` - Send message to AI assistant
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/feedback` - Submit feedback

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Project Structure

```
python-backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── core/
│   │   └── config.py        # Configuration settings
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   ├── routers/
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── profile.py       # Profile management
│   │   ├── dashboard.py     # Dashboard data
│   │   └── chat.py          # Chat functionality
│   ├── services/
│   │   └── openai_service.py # OpenAI integration
│   └── utils/
│       └── supabase_client.py # Database client
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
└── README.md               # This file
```

## Key Technologies

- **FastAPI**: Modern Python web framework
- **Pydantic**: Data validation and serialization
- **Supabase**: PostgreSQL database with real-time capabilities
- **OpenAI**: AI-powered analysis and chat
- **Uvicorn**: ASGI server for FastAPI
- **python-jose**: JWT token handling

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation with Pydantic
- Supabase Row Level Security (RLS)

## Development

### Code Style
- Use type hints throughout the codebase
- Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Add docstrings to all functions and classes

### Testing
```bash
# Run tests (when implemented)
pytest

# Run with coverage
pytest --cov=app
```

### Linting
```bash
# Install development dependencies
pip install black isort flake8 mypy

# Format code
black .

# Sort imports
isort .

# Lint code
flake8 .

# Type checking
mypy .
```

## Deployment

### Production Deployment

1. Set `DEBUG=false` in environment
2. Use a production ASGI server (e.g., Gunicorn with Uvicorn workers)
3. Set up proper environment variables
4. Configure reverse proxy (nginx)
5. Enable HTTPS

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.