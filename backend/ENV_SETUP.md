# Environment Setup Instructions

## Creating Your Environment Variables File

### Step 1: Create the .env file
```bash
# In your python-backend directory, create a .env file
touch .env
```

### Step 2: Copy this content into your .env file:

```env
# AI Career Guidance Platform - Environment Configuration

# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=8000
DEBUG=true

# ==========================================
# SUPABASE DATABASE CONFIGURATION
# ==========================================
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ==========================================
# OPENAI API CONFIGURATION
# ==========================================
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# ==========================================
# JWT SECURITY CONFIGURATION
# ==========================================
# Generate a secure random string for JWT secret (min 32 characters)
JWT_SECRET_KEY=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=168

# ==========================================
# CORS CONFIGURATION
# ==========================================
# Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# ==========================================
# RATE LIMITING CONFIGURATION
# ==========================================
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000
```

### Step 3: Get Your API Keys

#### Supabase Keys:
1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**
5. For service role key, use the **service_role** key (keep this secret!)

#### OpenAI API Key:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in to your account
3. Go to **API Keys** section
4. Click **Create new secret key**
5. Copy the generated key (keep this secret!)

#### JWT Secret Key:
1. Generate a secure random string (at least 32 characters)
2. You can use an online generator or create one yourself
3. Example: `my_super_secret_jwt_key_for_ai_career_platform_2024_secure_random_string`

### Step 4: Security Best Practices

❌ **NEVER** commit your `.env` file to version control
❌ **NEVER** share your API keys publicly
❌ **NEVER** use the same keys for development and production

✅ **ALWAYS** add `.env` to your `.gitignore` file
✅ **ALWAYS** use environment-specific keys
✅ **ALWAYS** rotate your keys regularly

### Step 5: Test Your Configuration

```bash
# Run the backend to test if your environment is configured correctly
python run.py
```

If you see errors about missing environment variables, double-check your `.env` file.

## Virtual Environment (Optional but Recommended)

```bash
# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python run.py
```

## Troubleshooting

### "Module not found" errors:
Make sure you've activated your virtual environment and installed all dependencies.

### "Environment variable not found" errors:
Check that your `.env` file exists and contains all required variables.

### "Invalid API key" errors:
Verify your Supabase and OpenAI API keys are correct and haven't expired.