from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import (
    UserProfileCreate, UserProfileResponse, APIResponse
)
from app.utils.supabase_client import supabase
from app.utils.memory_storage import memory_storage
from app.services.career_guidance import career_guidance_service
from app.core.config import supabase_configured
from app.core.auth import get_current_user_id
from typing import Dict, Any
import json

router = APIRouter()

@router.post("/", response_model=APIResponse)
async def create_or_update_profile(
    profile_data: UserProfileCreate,
    user_id: str = Depends(get_current_user_id)
):
    """Create or update user profile"""
    try:
        profile_dict = {
            "user_id": user_id,
            "education": profile_data.education,
            "current_skills": profile_data.current_skills,
            "career_goals": profile_data.career_goals,
            "experience_level": profile_data.experience_level
        }

        if supabase_configured:
            # Use Supabase
            existing_profile = supabase.table('user_profiles').select('id').eq('user_id', user_id).execute()

            if existing_profile.data:
                # Update existing profile
                result = supabase.table('user_profiles').update(profile_dict).eq('user_id', user_id).execute()
            else:
                # Create new profile
                result = supabase.table('user_profiles').insert(profile_dict).execute()

            if not result.data:
                raise HTTPException(status_code=400, detail="Failed to save profile")

            profile = result.data[0]
        else:
            # Use memory storage
            profile = memory_storage.save_user_profile(user_id, profile_dict)

        return APIResponse(
            success=True,
            data={"profile": UserProfileResponse(**profile)},
            message="Profile saved successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Profile save error: {e}")
        raise HTTPException(status_code=500, detail="Server error saving profile")

@router.get("/", response_model=APIResponse)
async def get_profile(user_id: str = Depends(get_current_user_id)):
    """Get user profile"""
    try:
        if supabase_configured:
            # Use Supabase
            result = supabase.table('user_profiles').select('*').eq('user_id', user_id).execute()
            if not result.data:
                return APIResponse(success=True, data={"profile": None})
            profile = result.data[0]
        else:
            # Use memory storage
            profile = memory_storage.get_user_profile(user_id)
            if not profile:
                return APIResponse(success=True, data={"profile": None})

        return APIResponse(
            success=True,
            data={"profile": UserProfileResponse(**profile)}
        )

    except Exception as e:
        print(f"Profile fetch error: {e}")
        raise HTTPException(status_code=500, detail="Server error retrieving profile")

@router.post("/submit", response_model=APIResponse)
async def submit_profile(profile_data: UserProfileCreate, user_id: str = Depends(get_current_user_id)):
    """Submit user profile and generate AI career guidance analysis"""
    try:
        profile_dict = {
            "user_id": user_id,
            "education": profile_data.education,
            "current_skills": profile_data.current_skills,
            "career_goals": profile_data.career_goals,
            "experience_level": profile_data.experience_level
        }

        if supabase_configured:
            # Use Supabase
            existing_profile = supabase.table('user_profiles').select('id').eq('user_id', user_id).execute()

            if existing_profile.data:
                # Update existing profile
                result = supabase.table('user_profiles').update(profile_dict).eq('user_id', user_id).execute()
            else:
                # Create new profile
                result = supabase.table('user_profiles').insert(profile_dict).execute()

            if not result.data:
                raise HTTPException(status_code=400, detail="Failed to save profile")

            profile = result.data[0]

            # Generate and save AI analysis data
            await save_ai_analysis(user_id, profile['id'], profile_dict)

        else:
            # Use memory storage
            profile = memory_storage.save_user_profile(user_id, profile_dict)

        return APIResponse(
            success=True,
            data={"profile": UserProfileResponse(**profile)},
            message="Profile submitted successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Profile submission error: {e}")
        raise HTTPException(status_code=500, detail="Server error saving profile")


async def save_ai_analysis(user_id: str, profile_id: str, profile_data: Dict[str, Any]):
    """Generate and save AI analysis data to database"""
    try:
        # Create a profile response object for the AI service
        from app.models.schemas import UserProfileResponse
        profile_obj = UserProfileResponse(**profile_data)

        # Generate all AI analysis
        career_rec = career_guidance_service.generate_career_recommendations(profile_obj)
        skill_analysis = career_guidance_service.analyze_skill_gaps(profile_obj)
        job_recs = career_guidance_service.generate_job_recommendations(profile_obj)
        resume_guide = career_guidance_service.generate_resume_guidance(profile_obj)

        # Save career recommendations
        career_data = {
            "user_id": user_id,
            "profile_id": profile_id,
            "career_path": career_rec.career_path,
            "short_term_goals": career_rec.short_term_goals,
            "long_term_goals": career_rec.long_term_goals,
            "industry_trends": career_rec.industry_trends,
            "salary_potential": career_rec.salary_potential
        }
        supabase.table('career_recommendations').upsert(career_data, on_conflict='user_id').execute()

        # Save skill gap analysis
        skill_data = {
            "user_id": user_id,
            "profile_id": profile_id,
            "missing_skills": skill_analysis.missing_skills,
            "recommended_skills": skill_analysis.recommended_skills,
            "skill_priority": skill_analysis.skill_priority,
            "time_to_acquire": skill_analysis.time_to_acquire
        }
        supabase.table('skill_gap_analysis').upsert(skill_data, on_conflict='user_id').execute()

        # Save job recommendations (delete existing and insert new ones)
        supabase.table('job_recommendations').delete().eq('user_id', user_id).execute()
        for job in job_recs:
            job_data = {
                "user_id": user_id,
                "profile_id": profile_id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "salary_range": job.salary_range,
                "match_score": job.match_score,
                "required_skills": job.required_skills,
                "description": job.description
            }
            supabase.table('job_recommendations').insert(job_data).execute()

        # Save resume guidance
        resume_data = {
            "user_id": user_id,
            "profile_id": profile_id,
            "strengths": resume_guide.strengths,
            "areas_for_improvement": resume_guide.areas_for_improvement,
            "suggested_sections": resume_guide.suggested_sections,
            "keyword_suggestions": resume_guide.keyword_suggestions,
            "ats_friendly_tips": resume_guide.ats_friendly_tips
        }
        supabase.table('resume_guidance').upsert(resume_data, on_conflict='user_id').execute()

    except Exception as e:
        print(f"AI analysis save error: {e}")
        # Don't fail the profile submission if AI analysis fails
        pass