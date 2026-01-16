# AI-Powered Career Guidance Platform

A comprehensive AI-driven platform for personalized learning, career guidance, and resume readiness to improve employability and support SDG-8 (Decent Work and Economic Growth).

## 🚀 Features

### Core Modules
- **Skill Gap Analysis**: AI-powered assessment of current vs required skills
- **Learning Roadmap**: 3-month personalized development plans
- **Career Recommendations**: Job role suggestions with market insights
- **Resume Readiness**: ATS-optimized resume guidance and improvement
- **SDG-8 Impact Tracking**: Monitor contribution to sustainable development goals
- **AI Chat Assistant**: Interactive support for career-related queries

### Technical Features
- Modern card-based dashboard interface
- Responsive design for all devices
- Real-time AI processing
- Secure user data handling
- Professional UI with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend (Python FastAPI)
- **Python 3.8+** - Programming language
- **FastAPI** - Modern web framework
- **Pydantic** - Data validation and serialization
- **Supabase** - Database and authentication
- **OpenAI API** - AI processing and chat
- **Uvicorn** - ASGI server

### Database
- **Supabase** - PostgreSQL with real-time capabilities
- Row Level Security (RLS) policies
- Optimized queries and indexing

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- Supabase account
- OpenAI API key

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd ai-career-guidance-platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (Python)
cd ../backend
pip install -r requirements.txt
```

### 2. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Go to SQL Editor and run the schema from `database/schema.sql`

### 3. Configure Environment Variables

Create `.env` files in both frontend and backend directories.

**Backend (.env):**
```env
# Server Configuration
PORT=8000
DEBUG=true

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=168

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 4. Start the Development Servers

**Terminal 1: Start the Python Backend**
```bash
cd backend
python run.py
```
*Backend will run on: http://localhost:8000*

**Terminal 2: Start the Next.js Frontend**
```bash
cd frontend
npm run dev
```
*Frontend will run on: http://localhost:3000*

### 5. API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

Visit `http://localhost:3000` to see the application!

## 📁 Project Structure

```
ai-career-guidance-platform/
├── frontend/                    # Next.js frontend
│   ├── src/
│   │   ├── app/                 # Next.js app router
│   │   │   ├── page.tsx         # Landing page with form
│   │   │   └── dashboard/       # Dashboard page
│   │   │       └── page.tsx
│   │   └── components/          # Reusable components
│   │       ├── UserProfileForm.tsx
│   │       ├── DashboardCard.tsx
│   │       └── ChatBot.tsx
│   └── ...
├── backend/                     # Python FastAPI backend
│   ├── src/
│   │   ├── routes/              # API routes
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── dashboard.ts
│   │   │   └── chat.ts
│   │   ├── services/            # Business logic
│   │   │   └── openai.ts
│   │   ├── middleware/          # Express middleware
│   │   ├── types/               # TypeScript types
│   │   └── utils/               # Utility functions
│   └── ...
└── database/                    # Database schema
    └── schema.sql
```

## 🔧 API Endpoints

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

## 🎨 User Journey

1. **Profile Creation**: Users fill out a comprehensive form with education, skills, and career goals
2. **AI Analysis**: Backend processes the profile using OpenAI to generate insights
3. **Dashboard View**: Users see a card-based dashboard with all insights
4. **Interactive Exploration**: Click cards to see detailed information
5. **AI Assistance**: Use the integrated chatbot for additional guidance

## 🔒 Security Features

- JWT-based authentication
- Supabase Row Level Security (RLS)
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure environment variable management

## 🌱 SDG-8 Alignment

This platform contributes to SDG-8 by:
- Improving workforce preparedness
- Supporting decent employment opportunities
- Encouraging lifelong learning
- Reducing skills gaps in the labor market
- Promoting inclusive economic growth

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
npm run build
npm start
# Deploy to your preferred platform
```

### Database
- Supabase handles database hosting
- Automatic scaling and backups
- Real-time capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@careerguidance.ai or join our Discord community.

---

Built with ❤️ for a better workforce future.