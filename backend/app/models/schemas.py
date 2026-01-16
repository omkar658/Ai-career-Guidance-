from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

# Authentication models
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    id: str
    created_at: datetime

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Profile models
class UserProfileCreate(BaseModel):
    education: Dict[str, Any]
    current_skills: Dict[str, List[str]]
    career_goals: str
    experience_level: str

class UserProfileResponse(BaseModel):
    id: str
    user_id: str
    education: Dict[str, Any]
    current_skills: Dict[str, List[str]]
    career_goals: str
    experience_level: str
    created_at: str
    updated_at: str

# Career guidance models
class JobRecommendation(BaseModel):
    title: str
    company: str
    location: str
    salary_range: str
    match_score: int
    required_skills: List[str]
    description: str
    apply_link: str
    linkedin_link: str

class SkillGapAnalysis(BaseModel):
    missing_skills: List[str]
    recommended_skills: List[str]
    skill_priority: Dict[str, str]  # skill -> priority level
    time_to_acquire: Dict[str, str]  # skill -> estimated time
    skill_categories: Dict[str, str]  # skill -> category (Technical, Soft Skills, Tools, etc.)
    learning_resources: Dict[str, List[Dict[str, str]]]  # skill -> list of learning resources with name, url, type
    skill_topics: Dict[str, Dict[str, List[str]]]  # skill -> {category: [topics]}

class CareerRecommendation(BaseModel):
    career_path: str
    short_term_goals: List[str]
    long_term_goals: List[str]
    industry_trends: List[str]
    salary_potential: str
    certifications: List[Dict[str, str]] = []

class ResumeGuidance(BaseModel):
    strengths: List[str]
    areas_for_improvement: List[str]
    suggested_sections: List[str]
    keyword_suggestions: List[str]
    ats_friendly_tips: List[str]

# Dashboard models
class DashboardData(BaseModel):
    user_profile: Optional[UserProfileResponse] = None
    has_profile: bool = False
    career_recommendations: Optional[CareerRecommendation] = None
    skill_gap_analysis: Optional[SkillGapAnalysis] = None
    job_recommendations: Optional[List[JobRecommendation]] = None
    resume_guidance: Optional[ResumeGuidance] = None

# Chat models
class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None

# Generic API response
class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[str] = None