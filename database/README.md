# AI Career Guidance Platform - Database Schema

## Overview

This directory contains the complete database schema for the AI Career Guidance Platform. The schema includes all necessary tables to store user profiles and AI-generated career guidance data.

## Tables Created

### 1. `users`
- **Purpose**: Basic user authentication and profile information
- **Key Fields**: `id`, `email`, `name`, `created_at`, `updated_at`

### 2. `user_profiles`
- **Purpose**: Detailed user career profiles containing education, skills, and goals
- **Key Fields**: `education` (JSONB), `current_skills` (JSONB), `career_goals`, `experience_level`

### 3. `career_recommendations`
- **Purpose**: AI-generated career path suggestions
- **Key Fields**: `career_path`, `short_term_goals[]`, `long_term_goals[]`, `industry_trends[]`, `salary_potential`

### 4. `skill_gap_analysis`
- **Purpose**: AI analysis of missing vs required skills
- **Key Fields**: `missing_skills[]`, `recommended_skills[]`, `skill_priority` (JSONB), `time_to_acquire` (JSONB)

### 5. `job_recommendations`
- **Purpose**: AI-suggested job opportunities
- **Key Fields**: `title`, `company`, `location`, `salary_range`, `match_score`, `required_skills[]`, `description`

### 6. `resume_guidance`
- **Purpose**: AI-powered resume improvement suggestions
- **Key Fields**: `strengths[]`, `areas_for_improvement[]`, `suggested_sections[]`, `keyword_suggestions[]`, `ats_friendly_tips[]`

## Setup Instructions

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Go to Settings → API to get your credentials

### 2. Database Setup
1. In your Supabase dashboard, navigate to **SQL Editor**
2. Copy the entire contents of `schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

### 3. Environment Configuration
Update your `backend/.env` file with real Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Verify Setup
1. Restart your backend server
2. The logs should show: `"Supabase is configured - using database storage"`
3. Submit a profile through the frontend
4. Check your Supabase tables - they should contain the profile and AI analysis data

## Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **User-based policies**: Users can only access their own data
- **JWT authentication**: Required for all operations
- **Automatic timestamps**: `created_at` and `updated_at` fields

## Performance Optimizations

- **Indexes**: Created on frequently queried columns (`user_id`, `match_score`)
- **JSONB fields**: Efficient storage for complex data structures
- **Array fields**: Optimized for skill lists and recommendations

## Data Flow

1. **User submits profile** → Profile stored in `user_profiles`
2. **AI analysis generated** → Results stored in respective analysis tables
3. **Dashboard loads** → Retrieves stored analysis (fast) or generates fresh (fallback)

## Backup & Recovery

- All data is stored in Supabase (managed PostgreSQL)
- Automatic daily backups included with Supabase
- Point-in-time recovery available

## Migration Notes

- Schema supports both new and existing installations
- All tables use `IF NOT EXISTS` for safe deployment
- Unique constraints prevent duplicate analysis per user
- Triggers automatically update `updated_at` timestamps