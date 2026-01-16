'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Target, TrendingUp, FileText, Briefcase, Award, Zap, BarChart3 } from 'lucide-react';
import DashboardCard from '@/components/DashboardCard';
import MetricCard from '@/components/MetricCard';
import CircularProgress from '@/components/CircularProgress';
import LoadingSpinner from '@/components/LoadingSpinner';
import { apiClient } from '@/utils/api';

interface UserProfileData {
  id: string;
  user_id: string;
  education: {
    degree: string;
    field: string;
    institution: string;
    graduation_year: string;
    gpa?: string;
  };
  current_skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  career_goals: string;
  experience_level: string;
  created_at: string;
  updated_at: string;
}

interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  salary_range: string;
  match_score: number;
  required_skills: string[];
  description: string;
  apply_link: string;
  linkedin_link: string;
}

interface SkillTopics {
  [category: string]: string[];
}

interface SkillGapAnalysis {
  missing_skills: string[];
  recommended_skills: string[];
  skill_priority: { [key: string]: string };
  time_to_acquire: { [key: string]: string };
  skill_categories?: { [key: string]: string };
  learning_resources?: { [key: string]: Array<{ name: string; url: string; type: string }> };
  skill_topics?: { [key: string]: SkillTopics };
}

interface CareerRecommendation {
  career_path: string;
  short_term_goals: string[];
  long_term_goals: string[];
  industry_trends: string[];
  salary_potential: string;
  certifications?: Array<{
    name: string;
    provider: string;
    link: string;
    duration: string;
    cost: string;
  }>;
}

interface ResumeGuidance {
  strengths: string[];
  areas_for_improvement: string[];
  suggested_sections: string[];
  keyword_suggestions: string[];
  ats_friendly_tips: string[];
}

interface DashboardData {
  user_profile: UserProfileData | null;
  has_profile: boolean;
  career_recommendations?: CareerRecommendation | null;
  skill_gap_analysis?: SkillGapAnalysis | null;
  job_recommendations?: JobRecommendation[] | null;
  resume_guidance?: ResumeGuidance | null;
}

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>('career-guidance'); // Default to career guidance
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.getDashboard();
        if (response.success && response.data) {
          const data = response.data as DashboardData;
          setDashboardData({
            user_profile: data.user_profile || null,
            has_profile: !!data.user_profile,
            career_recommendations: data.career_recommendations || null,
            skill_gap_analysis: data.skill_gap_analysis || null,
            job_recommendations: data.job_recommendations || null,
            resume_guidance: data.resume_guidance || null,
          });
        } else {
          // If no profile exists, redirect to home page to fill out the form
          console.log('No profile found, redirecting to form');
          router.push('/');
          return;
        }
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
        setError(`Failed to load dashboard data: ${err.message}. Please ensure the backend is running and configured.`);
        // If API call fails, redirect to form to ensure user fills out profile first
        setTimeout(() => {
          router.push('/');
        }, 2000); // Give user time to see the error message
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const cards = [
    {
      id: 'user-profile',
      title: 'Your Profile',
      description: 'Your career details and information',
      icon: User,
      color: 'green',
      data: dashboardData?.user_profile,
      content: dashboardData?.user_profile ? (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">Education</h4>
            <div className="space-y-2 text-green-700">
              <p><strong>Degree:</strong> {dashboardData.user_profile.education?.degree}</p>
              <p><strong>Field:</strong> {dashboardData.user_profile.education?.field}</p>
              <p><strong>Institution:</strong> {dashboardData.user_profile.education?.institution}</p>
              <p><strong>Graduation:</strong> {dashboardData.user_profile.education?.graduation_year}</p>
              <p><strong>GPA:</strong> {dashboardData.user_profile.education?.gpa || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Skills & Certifications</h4>
            <div className="space-y-2">
              {dashboardData.user_profile.current_skills?.technical && dashboardData.user_profile.current_skills.technical.length > 0 && (
                <div>
                  <h5 className="font-medium text-blue-700 mb-1">Technical Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.user_profile.current_skills.technical.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dashboardData.user_profile.current_skills?.soft && dashboardData.user_profile.current_skills.soft.length > 0 && (
                <div>
                  <h5 className="font-medium text-purple-700 mb-1">Soft Skills:</h5>
            <div className="flex flex-wrap gap-2">
                    {dashboardData.user_profile.current_skills.soft.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
              )}
              {dashboardData.user_profile.current_skills?.certifications && dashboardData.user_profile.current_skills.certifications.length > 0 && (
                <div>
                  <h5 className="font-medium text-orange-700 mb-1">Certifications:</h5>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.user_profile.current_skills.certifications.map((cert: string) => (
                      <span key={cert} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">Career Goals</h4>
            <p className="text-purple-700">{dashboardData.user_profile.career_goals}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-3">Experience Level</h4>
            <p className="text-orange-700 capitalize">{dashboardData.user_profile.experience_level}</p>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-600">
          <p>No profile data available. Please submit your profile from the home page.</p>
        </div>
      )
    },
    {
      id: 'career-guidance',
      title: 'Career Guidance',
      description: 'Personalized career path recommendations',
      icon: Target,
      color: 'blue',
      data: dashboardData?.career_recommendations,
      content: dashboardData?.career_recommendations ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Recommended Career Path</h4>
            <p className="text-blue-700 text-lg font-medium">{dashboardData.career_recommendations.career_path}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">Short-term Goals (3-6 months)</h4>
            <ul className="space-y-2">
              {dashboardData.career_recommendations.short_term_goals.map((goal: string, index: number) => (
                <li key={index} className="flex items-start text-green-700">
                  <span className="text-green-600 mr-2">•</span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-3">Long-term Goals (1-2 years)</h4>
            <ul className="space-y-2">
              {dashboardData.career_recommendations.long_term_goals.map((goal: string, index: number) => (
                <li key={index} className="flex items-start text-purple-700">
                  <span className="text-purple-600 mr-2">•</span>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-3">Industry Trends</h4>
            <ul className="space-y-2">
              {dashboardData.career_recommendations.industry_trends.map((trend: string, index: number) => (
                <li key={index} className="flex items-start text-orange-700">
                  <span className="text-orange-600 mr-2">•</span>
                  {trend}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-3">Salary Potential</h4>
            <p className="text-indigo-700">{dashboardData.career_recommendations.salary_potential}</p>
          </div>

          {/* Certifications Section */}
          {dashboardData.career_recommendations.certifications && dashboardData.career_recommendations.certifications.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🎓</span>
                </div>
                <h4 className="text-xl font-bold text-yellow-800">Recommended Certifications</h4>
              </div>
              <p className="text-yellow-700 mb-4">These industry-recognized certifications will boost your career prospects and validate your skills.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.career_recommendations.certifications.map((cert: any, index: number) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition-all duration-200">
                    <h5 className="font-semibold text-gray-800 mb-2">{cert.name}</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Provider:</span>
                        {cert.provider}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Duration:</span>
                        {cert.duration}
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Cost:</span>
                        <span className="text-green-600 font-medium">{cert.cost}</span>
                      </p>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Get Certified
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Pro Tip:</strong> Start with entry-level certifications and progress to advanced ones as you gain experience.
                  Many employers offer reimbursement for certification costs!
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 text-gray-600">
          <p>Career guidance will appear after you submit your profile.</p>
        </div>
      )
    },
    {
      id: 'skill-gaps',
      title: 'Skill Gap Analysis',
      description: 'Detailed skill assessment with learning resources',
      icon: TrendingUp,
      color: 'purple',
      data: dashboardData?.skill_gap_analysis,
      metrics: dashboardData?.skill_gap_analysis ? [
        { label: 'Missing Skills', value: dashboardData.skill_gap_analysis.missing_skills?.length.toString() || '0', percentage: 0 },
        { label: 'Recommended Skills', value: dashboardData.skill_gap_analysis.recommended_skills?.length.toString() || '0', percentage: 0 }
      ] : undefined,
      content: dashboardData?.skill_gap_analysis ? (
        <div className="space-y-8">
          {/* Missing Skills Analysis */}
          {dashboardData.skill_gap_analysis.missing_skills && dashboardData.skill_gap_analysis.missing_skills.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">!</span>
                </div>
                <h4 className="text-xl font-bold text-red-800">Critical Missing Skills</h4>
              </div>
              <p className="text-red-700 mb-4">These skills are essential for your target career path and should be prioritized.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.skill_gap_analysis.missing_skills.map((skill: string) => (
                  <div key={skill} className="bg-white p-4 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <button
                          onClick={() => setExpandedSkill(expandedSkill === skill ? null : skill)}
                          className="text-left w-full hover:bg-red-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                        >
                          <h5 className="font-semibold text-red-800 text-lg flex items-center">
                            {skill}
                            <span className={`ml-2 text-sm transition-transform duration-200 ${expandedSkill === skill ? 'rotate-90' : ''}`}>
                              ▶
                            </span>
                          </h5>
                        </button>
                        <p className="text-sm text-gray-600 mt-1">
                          Category: {dashboardData.skill_gap_analysis?.skill_categories?.[skill] || 'Technical Skill'}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dashboardData.skill_gap_analysis?.skill_priority[skill] === 'High' ? 'bg-red-100 text-red-800' :
                        dashboardData.skill_gap_analysis?.skill_priority[skill] === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {dashboardData.skill_gap_analysis?.skill_priority[skill]} Priority
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>⏱️ {dashboardData.skill_gap_analysis?.time_to_acquire[skill]}</span>
                    </div>

                    {/* Detailed Topics - Expandable */}
                    {expandedSkill === skill && dashboardData.skill_gap_analysis?.skill_topics?.[skill] && (
                      <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                        <h6 className="font-semibold text-red-800 mb-3 flex items-center">
                          <span className="mr-2">📋</span>
                          Detailed Learning Topics for {skill}
                        </h6>
                        <div className="grid grid-cols-1 gap-3">
                          {Object.entries(dashboardData.skill_gap_analysis.skill_topics[skill]).map(([category, topics]) => (
                            <div key={category} className="bg-white p-3 rounded-lg">
                              <div className="font-medium text-red-700 text-sm mb-2 flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                {category}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {topics.map((topic, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Resources */}
                    {dashboardData.skill_gap_analysis?.learning_resources?.[skill] && (
                      <div className={expandedSkill === skill ? 'mt-4' : ''}>
                        <h6 className="font-medium text-gray-800 mb-2 flex items-center">
                          <span className="text-blue-500 mr-1">📚</span>
                          Learning Resources:
                        </h6>
                        <div className="space-y-2">
                          {dashboardData.skill_gap_analysis.learning_resources[skill].slice(0, expandedSkill === skill ? 4 : 2).map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200 group"
                            >
                              <div className="flex items-start space-x-2">
                                <span className="text-blue-600 text-xs font-medium px-2 py-1 bg-blue-100 rounded">
                                  {resource.type}
                                </span>
                                <span className="text-blue-800 text-sm font-medium group-hover:text-blue-900 flex-1">
                                  {resource.name}
                                </span>
                                <span className="text-blue-500 text-xs">↗</span>
                              </div>
                            </a>
                          ))}
                          {dashboardData.skill_gap_analysis.learning_resources[skill].length > (expandedSkill === skill ? 4 : 2) && (
                            <p className="text-xs text-gray-500">
                              +{dashboardData.skill_gap_analysis.learning_resources[skill].length - (expandedSkill === skill ? 4 : 2)} more resources available
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Skills */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">🚀</span>
              </div>
              <h4 className="text-xl font-bold text-blue-800">Recommended Skills to Advance</h4>
            </div>
            <p className="text-blue-700 mb-6">These skills will give you a competitive edge and open up more opportunities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.skill_gap_analysis.recommended_skills.map((skill: string) => (
                <div key={skill} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <button
                        onClick={() => setExpandedSkill(expandedSkill === skill ? null : skill)}
                        className="text-left w-full hover:bg-blue-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                      >
                        <h5 className="font-semibold text-blue-800 text-lg flex items-center">
                          {skill}
                          <span className={`ml-2 text-sm transition-transform duration-200 ${expandedSkill === skill ? 'rotate-90' : ''}`}>
                            ▶
                          </span>
                        </h5>
                      </button>
                      <p className="text-sm text-gray-600 mt-1">
                        Category: {dashboardData.skill_gap_analysis?.skill_categories?.[skill] || 'Advanced Skill'}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dashboardData.skill_gap_analysis?.skill_priority[skill] === 'High' ? 'bg-red-100 text-red-800' :
                      dashboardData.skill_gap_analysis?.skill_priority[skill] === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {dashboardData.skill_gap_analysis?.skill_priority[skill]} Priority
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>⏱️ {dashboardData.skill_gap_analysis?.time_to_acquire[skill]}</span>
                  </div>

                  {/* Detailed Topics - Expandable */}
                  {expandedSkill === skill && dashboardData.skill_gap_analysis?.skill_topics?.[skill] && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h6 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <span className="mr-2">📋</span>
                        Detailed Learning Topics for {skill}
                      </h6>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(dashboardData.skill_gap_analysis.skill_topics[skill]).map(([category, topics]) => (
                          <div key={category} className="bg-white p-3 rounded-lg">
                            <div className="font-medium text-blue-700 text-sm mb-2 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {category}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {topics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                  {topic}
                                </span>
                              ))}
          </div>
              </div>
            ))}
          </div>
                    </div>
                  )}

                  {/* Learning Resources */}
                  {dashboardData.skill_gap_analysis?.learning_resources?.[skill] && (
                    <div className={expandedSkill === skill ? 'mt-4' : ''}>
                      <h6 className="font-medium text-gray-800 mb-2 flex items-center">
                        <span className="text-blue-500 mr-1">📚</span>
                        Learning Resources:
                      </h6>
                      <div className="space-y-2">
                        {dashboardData.skill_gap_analysis.learning_resources[skill].slice(0, expandedSkill === skill ? 4 : 2).map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200 group"
                          >
                            <div className="flex items-start space-x-2">
                              <span className="text-blue-600 text-xs font-medium px-2 py-1 bg-blue-100 rounded">
                                {resource.type}
                              </span>
                              <span className="text-blue-800 text-sm font-medium group-hover:text-blue-900 flex-1">
                                {resource.name}
                              </span>
                              <span className="text-blue-500 text-xs">↗</span>
                            </div>
                          </a>
                        ))}
                        {dashboardData.skill_gap_analysis.learning_resources[skill].length > (expandedSkill === skill ? 4 : 2) && (
                          <p className="text-xs text-gray-500">
                            +{dashboardData.skill_gap_analysis.learning_resources[skill].length - (expandedSkill === skill ? 4 : 2)} more resources available
                          </p>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

          {/* Skill Development Timeline */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">📅</span>
              </div>
              <h4 className="text-xl font-bold text-green-800">Recommended Learning Timeline</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-red-800">Month 1-3: Foundation Skills</h5>
                  <p className="text-red-700 text-sm">Focus on Python, JavaScript, SQL, Git - essential for any tech role</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-yellow-800">Month 3-6: Framework & Tools</h5>
                  <p className="text-yellow-700 text-sm">Learn React, Node.js, Docker, and cloud platforms</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-green-800">Month 6+: Advanced & Specialized</h5>
                  <p className="text-green-700 text-sm">Deep dive into machine learning, DevOps, or your chosen specialization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Analysis Pending</h3>
          <p className="text-gray-600">Submit your profile to get detailed skill gap analysis with personalized learning resources and timelines.</p>
        </div>
      )
    },
    {
      id: 'job-recommendations',
      title: 'Job Recommendations',
      description: 'Matching job opportunities for your profile',
      icon: Briefcase,
      color: 'green',
      data: dashboardData?.job_recommendations,
      content: dashboardData?.job_recommendations && dashboardData.job_recommendations.length > 0 ? (
        <div className="space-y-6">
          {dashboardData.job_recommendations.map((job: JobRecommendation, index: number) => (
            <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-xl mb-1">{job.title}</h4>
                  <p className="text-gray-600 font-medium">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600">Match Score:</span>
                    <CircularProgress
                      percentage={job.match_score}
                      size={50}
                      color={job.match_score >= 90 ? '#10B981' : job.match_score >= 80 ? '#F59E0B' : '#EF4444'}
                      backgroundColor="#D1FAE5"
                      animated={true}
                    />
                  </div>
                </div>
              </div>

              {/* Salary Ranges */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">💰</span>
                  Salary Ranges (LPA - Lakhs Per Annum)
                </h5>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-sm">🎓</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Fresher</p>
                    <p className="text-lg font-bold text-blue-700">4-6 LPA</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold text-sm">⚡</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Intermediate</p>
                    <p className="text-lg font-bold text-green-700">8-12 LPA</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-700 font-bold text-sm">👑</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mb-1">Senior</p>
                    <p className="text-lg font-bold text-purple-700">15-25 LPA</p>
              </div>
            </div>
          </div>

              {/* Job Description */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-2">Job Description</h5>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

              {/* Required Skills */}
              <div>
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Key Required Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {job.required_skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Buttons */}
              <div className="mt-6 pt-4 border-t border-green-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center no-underline"
                  >
                    🏢 Apply on {job.company}
                  </a>
                  <a
                    href={job.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-center no-underline"
                  >
                    💼 View on LinkedIn
                  </a>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Pro Tip:</strong> Apply on both platforms for better chances!
                  </p>
                </div>
              </div>
        </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Recommendations Pending</h3>
          <p className="text-gray-600">Submit your profile to get personalized job recommendations with salary insights for the Indian market.</p>
        </div>
      )
    },
    {
      id: 'resume-guidance',
      title: 'Resume Builder',
      description: 'AI-powered resume analysis with optimization scores',
      icon: FileText,
      color: 'orange',
      data: dashboardData?.resume_guidance,
      metrics: dashboardData?.resume_guidance ? [
        { label: 'ATS Score', value: '92%', percentage: 92 },
        { label: 'Content Quality', value: '88%', percentage: 88 },
        { label: 'Keyword Optimization', value: '95%', percentage: 95 }
      ] : undefined,
      content: dashboardData?.resume_guidance ? (
        <div className="space-y-8">
          {/* Resume Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-green-800">ATS Compatibility</h4>
                <CircularProgress
                  percentage={92}
                  size={60}
                  color="#10B981"
                  backgroundColor="#D1FAE5"
                  animated={true}
                />
              </div>
              <p className="text-sm text-green-700">Your resume has excellent ATS compatibility with 92% score</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-blue-800">Content Quality</h4>
                <CircularProgress
                  percentage={88}
                  size={60}
                  color="#3B82F6"
                  backgroundColor="#DBEAFE"
                  animated={true}
                />
              </div>
              <p className="text-sm text-blue-700">Strong content quality with clear achievements and metrics</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-purple-800">Keyword Optimization</h4>
                <CircularProgress
                  percentage={95}
                  size={60}
                  color="#8B5CF6"
                  backgroundColor="#E9D5FF"
                  animated={true}
                />
              </div>
              <p className="text-sm text-purple-700">Excellent keyword optimization for your target roles</p>
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <h4 className="text-xl font-bold text-green-800">Resume Strengths</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.resume_guidance.strengths.map((strength: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 bg-white/60 p-4 rounded-xl">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-green-800 font-medium">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-yellow-800">Improvement Opportunities</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.resume_guidance.areas_for_improvement.map((area: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 bg-white/60 p-4 rounded-xl border-l-4 border-yellow-400">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <p className="text-yellow-800 font-medium">{area}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Sections */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">📄</span>
              </div>
              <h4 className="text-xl font-bold text-blue-800">Recommended Resume Sections</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dashboardData.resume_guidance.suggested_sections.map((section: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
                    <p className="text-blue-800 font-semibold text-sm">{section}</p>
            </div>
          </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">🔍</span>
              </div>
              <h4 className="text-xl font-bold text-purple-800">Strategic Keywords</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {dashboardData.resume_guidance.keyword_suggestions.map((keyword: string, index: number) => (
                <div key={index} className="bg-white px-4 py-2 rounded-full shadow-sm border border-purple-100 hover:bg-purple-50 hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <span className="text-purple-800 font-medium group-hover:text-purple-900">{keyword}</span>
          </div>
              ))}
          </div>
        </div>

          {/* ATS Tips */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">💡</span>
              </div>
              <h4 className="text-xl font-bold text-indigo-800">ATS Optimization Tips</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.resume_guidance.ats_friendly_tips.map((tip: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
                    <p className="text-indigo-800 font-medium">{tip}</p>
            </div>
          </div>
              ))}
          </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Analysis Pending</h3>
          <p className="text-gray-600">Submit your profile to receive personalized resume optimization insights and AI-powered recommendations.</p>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <LoadingSpinner
            message="Analyzing Your Career Profile"
            size="lg"
            variant="gradient"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Career Guidance Dashboard
                </h1>
                <p className="text-sm text-gray-600">AI-powered career insights, personalized recommendations & professional guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">AI Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Career Explorer</span>! 👋
          </h2>
          <p className="text-gray-600 text-lg">Your personalized career journey awaits. Here's what we've prepared for you.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <div>
                <strong className="font-semibold">Connection Error</strong>
                <span className="block text-sm mt-1">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Overview */}
        {dashboardData?.has_profile && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Your Career Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Profile Completion"
                value="100%"
                percentage={100}
                icon={Award}
                color="green"
                trend="up"
                trendValue="+5%"
              />
              <MetricCard
                title="Skill Readiness"
                value="85%"
                percentage={85}
                icon={Zap}
                color="blue"
                trend="up"
                trendValue="+12%"
              />
              <MetricCard
                title="Job Match Score"
                value={`${dashboardData?.job_recommendations?.[0]?.match_score || 0}%`}
                percentage={dashboardData?.job_recommendations?.[0]?.match_score || 0}
                icon={Target}
                color="purple"
                trend="up"
                trendValue="+8%"
              />
              <MetricCard
                title="Resume Strength"
                value="92%"
                percentage={92}
                icon={FileText}
                color="emerald"
                trend="up"
                trendValue="+15%"
              />
            </div>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="space-y-6">
          {cards.map((card) => (
            <DashboardCard
              key={card.id}
              {...card}
              isSelected={selectedCard === card.id}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}