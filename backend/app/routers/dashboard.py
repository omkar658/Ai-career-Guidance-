from fastapi import APIRouter, HTTPException, Depends
from app.utils.supabase_client import supabase
from app.utils.memory_storage import memory_storage
from app.services.career_guidance import career_guidance_service
from app.core.config import supabase_configured
from app.core.auth import get_current_user_id
from app.models.schemas import APIResponse, DashboardData, UserProfileResponse

router = APIRouter(tags=["dashboard"])

@router.get("/", response_model=APIResponse)
async def get_dashboard_data(user_id: str = Depends(get_current_user_id)):
    """Get user's dashboard data with career guidance"""
    try:
        dashboard_data = DashboardData(has_profile=False)

        # Get user profile
        profile_data = None
        if supabase_configured:
            # Use Supabase
            profile_result = supabase.table('user_profiles').select('*').eq('user_id', user_id).execute()
            if profile_result.data:
                profile_data = profile_result.data[0]
        else:
            # Use memory storage
            profile_data = memory_storage.get_user_profile(user_id)

        if profile_data:
            dashboard_data.user_profile = UserProfileResponse(**profile_data)
            dashboard_data.has_profile = True

            if supabase_configured:
                # Retrieve stored AI analysis from database
                try:
                    # Get career recommendations
                    career_result = supabase.table('career_recommendations').select('*').eq('user_id', user_id).execute()
                    if career_result.data:
                        career_data = career_result.data[0]
                        from app.models.schemas import CareerRecommendation
                        dashboard_data.career_recommendations = CareerRecommendation(
                            career_path=career_data['career_path'],
                            short_term_goals=career_data['short_term_goals'],
                            long_term_goals=career_data['long_term_goals'],
                            industry_trends=career_data['industry_trends'],
                            salary_potential=career_data['salary_potential']
                        )

                    # Get skill gap analysis
                    skill_result = supabase.table('skill_gap_analysis').select('*').eq('user_id', user_id).execute()
                    if skill_result.data:
                        skill_data = skill_result.data[0]
                        from app.models.schemas import SkillGapAnalysis
                        dashboard_data.skill_gap_analysis = SkillGapAnalysis(
                            missing_skills=skill_data['missing_skills'],
                            recommended_skills=skill_data['recommended_skills'],
                            skill_priority=skill_data['skill_priority'],
                            time_to_acquire=skill_data['time_to_acquire']
                        )

                    # Get job recommendations
                    job_result = supabase.table('job_recommendations').select('*').eq('user_id', user_id).order('match_score', desc=True).execute()
                    if job_result.data:
                        from app.models.schemas import JobRecommendation
                        dashboard_data.job_recommendations = [
                            JobRecommendation(
                                title=job['title'],
                                company=job['company'],
                                location=job['location'],
                                salary_range=job['salary_range'],
                                match_score=job['match_score'],
                                required_skills=job['required_skills'],
                                description=job['description']
                            ) for job in job_result.data
                        ]

                    # Get resume guidance
                    resume_result = supabase.table('resume_guidance').select('*').eq('user_id', user_id).execute()
                    if resume_result.data:
                        resume_data = resume_result.data[0]
                        from app.models.schemas import ResumeGuidance
                        dashboard_data.resume_guidance = ResumeGuidance(
                            strengths=resume_data['strengths'],
                            areas_for_improvement=resume_data['areas_for_improvement'],
                            suggested_sections=resume_data['suggested_sections'],
                            keyword_suggestions=resume_data['keyword_suggestions'],
                            ats_friendly_tips=resume_data['ats_friendly_tips']
                        )

                except Exception as e:
                    print(f"Error retrieving stored analysis: {e}")
                    # Fall back to generating fresh analysis
                    dashboard_data.career_recommendations = career_guidance_service.generate_career_recommendations(profile_data)
                    dashboard_data.skill_gap_analysis = career_guidance_service.analyze_skill_gaps(profile_data)
                    dashboard_data.job_recommendations = career_guidance_service.generate_job_recommendations(profile_data)
                    dashboard_data.resume_guidance = career_guidance_service.generate_resume_guidance(profile_data)
            else:
                # Generate fresh analysis for memory storage
                dashboard_data.career_recommendations = career_guidance_service.generate_career_recommendations(profile_data)
                dashboard_data.skill_gap_analysis = career_guidance_service.analyze_skill_gaps(profile_data)
                dashboard_data.job_recommendations = career_guidance_service.generate_job_recommendations(profile_data)
                dashboard_data.resume_guidance = career_guidance_service.generate_resume_guidance(profile_data)

        return APIResponse(
            success=True,
            data=dashboard_data.dict()
        )

    except Exception as e:
        print(f"Dashboard data error: {e}")
        raise HTTPException(status_code=500, detail="Server error retrieving dashboard data")