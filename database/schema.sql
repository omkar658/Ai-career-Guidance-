-- ============================================================================
-- AI Career Guidance Platform Database Schema
-- ============================================================================
-- Complete version with comprehensive AI analysis features
--
-- TABLES CREATED:
-- 1. users - Basic user authentication and profile info
-- 2. user_profiles - Detailed user career profiles (education, skills, goals)
-- 3. career_recommendations - AI-generated career path suggestions
-- 4. skill_gap_analysis - AI analysis of missing vs required skills
-- 5. job_recommendations - AI-suggested job opportunities
-- 6. resume_guidance - AI-powered resume improvement suggestions
--
-- SETUP INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
-- 5. Update your .env file with real Supabase credentials
--
-- ============================================================================

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table - stores basic user information
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table - stores user-entered details
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Education details entered by user
    education JSONB NOT NULL,  -- {degree, field, institution, graduation_year, gpa}

    -- Skills entered by user
    current_skills JSONB NOT NULL,  -- {technical[], soft[], certifications[]}

    -- Career goals entered by user
    career_goals TEXT NOT NULL,

    -- Experience level selected by user
    experience_level TEXT NOT NULL CHECK (experience_level IN ('student', 'fresher', 'entry_level', 'mid_level', 'senior_level', 'executive')),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Career recommendations table - stores AI-generated career guidance
CREATE TABLE IF NOT EXISTS career_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- AI-generated career path recommendation
    career_path TEXT NOT NULL,

    -- Goals and trends
    short_term_goals TEXT[] NOT NULL,  -- Array of short-term goals
    long_term_goals TEXT[] NOT NULL,   -- Array of long-term goals
    industry_trends TEXT[] NOT NULL,   -- Array of industry trends
    salary_potential TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)  -- One recommendation per user
);

-- Skill gap analysis table - stores AI-generated skill analysis
CREATE TABLE IF NOT EXISTS skill_gap_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- Missing and recommended skills
    missing_skills TEXT[] NOT NULL,      -- Skills user lacks
    recommended_skills TEXT[] NOT NULL,  -- Skills to acquire

    -- Skill prioritization and timeline
    skill_priority JSONB NOT NULL,       -- {skill: priority_level}
    time_to_acquire JSONB NOT NULL,      -- {skill: estimated_time}

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)  -- One analysis per user
);

-- Job recommendations table - stores AI-generated job suggestions
CREATE TABLE IF NOT EXISTS job_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- Job details
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary_range TEXT NOT NULL,
    match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    required_skills TEXT[] NOT NULL,  -- Skills required for this job
    description TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

    -- Note: Multiple job recommendations per user allowed
);

-- Resume guidance table - stores AI-generated resume improvement suggestions
CREATE TABLE IF NOT EXISTS resume_guidance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

    -- Resume analysis and suggestions
    strengths TEXT[] NOT NULL,           -- Resume strengths
    areas_for_improvement TEXT[] NOT NULL, -- Areas to improve
    suggested_sections TEXT[] NOT NULL,   -- Suggested resume sections
    keyword_suggestions TEXT[] NOT NULL,  -- Keywords to include
    ats_friendly_tips TEXT[] NOT NULL,    -- ATS optimization tips

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)  -- One guidance per user
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_career_recommendations_user_id ON career_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_analysis_user_id ON skill_gap_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_job_recommendations_user_id ON job_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_job_recommendations_match_score ON job_recommendations(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_resume_guidance_user_id ON resume_guidance(user_id);

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_gap_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_guidance ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for user_profiles table
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for career_recommendations table
CREATE POLICY "Users can view their own career recommendations" ON career_recommendations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career recommendations" ON career_recommendations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career recommendations" ON career_recommendations
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for skill_gap_analysis table
CREATE POLICY "Users can view their own skill gap analysis" ON skill_gap_analysis
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skill gap analysis" ON skill_gap_analysis
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skill gap analysis" ON skill_gap_analysis
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for job_recommendations table
CREATE POLICY "Users can view their own job recommendations" ON job_recommendations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job recommendations" ON job_recommendations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job recommendations" ON job_recommendations
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for resume_guidance table
CREATE POLICY "Users can view their own resume guidance" ON resume_guidance
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resume guidance" ON resume_guidance
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resume guidance" ON resume_guidance
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns on all tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_recommendations_updated_at
    BEFORE UPDATE ON career_recommendations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skill_gap_analysis_updated_at
    BEFORE UPDATE ON skill_gap_analysis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_guidance_updated_at
    BEFORE UPDATE ON resume_guidance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: job_recommendations doesn't have updated_at trigger as it's primarily insert-only