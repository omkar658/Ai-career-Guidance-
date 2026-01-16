'use client';

import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

interface UserProfileFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

interface FormData {
  education: {
    degree: string;
    field: string;
    institution: string;
    graduation_year: string;
    gpa: string;
  };
  current_skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  career_goals: string;
  experience_level: string;
}

const initialFormData: FormData = {
  education: {
    degree: '',
    field: '',
    institution: '',
    graduation_year: '',
    gpa: ''
  },
  current_skills: {
    technical: [],
    soft: [],
    certifications: []
  },
  career_goals: '',
  experience_level: ''
};

export default function UserProfileForm({ onSubmit, isLoading }: UserProfileFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentSoftSkill, setCurrentSoftSkill] = useState('');
  const [currentCertification, setCurrentCertification] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (section: keyof FormData, field: string, value: any) => {
    if (section === 'education') {
      setFormData(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [field]: value
        }
      }));
    } else if (section === 'current_skills') {
      setFormData(prev => ({
        ...prev,
        current_skills: {
          ...prev.current_skills,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }

    // Clear error for this field
    if (errors[section as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [section]: undefined
      }));
    }
  };

  const addSkill = (skillType: 'technical' | 'soft' | 'certifications', skill: string) => {
    if (!skill.trim()) return;

    const currentSkills = formData.current_skills[skillType];
    if (!currentSkills.includes(skill.trim())) {
      handleInputChange('current_skills', skillType, [...currentSkills, skill.trim()]);
    }

    // Clear input
    if (skillType === 'technical') setCurrentSkill('');
    else if (skillType === 'soft') setCurrentSoftSkill('');
    else setCurrentCertification('');
  };

  const removeSkill = (skillType: 'technical' | 'soft' | 'certifications', skillToRemove: string) => {
    const currentSkills = formData.current_skills[skillType];
    handleInputChange('current_skills', skillType, currentSkills.filter(skill => skill !== skillToRemove));
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.education.degree.trim()) {
      newErrors.education = { ...newErrors.education, degree: 'Degree is required' };
    }
    if (!formData.education.field.trim()) {
      newErrors.education = { ...newErrors.education, field: 'Field of study is required' };
    }
    if (!formData.education.institution.trim()) {
      newErrors.education = { ...newErrors.education, institution: 'Institution is required' };
    }
    if (!formData.career_goals.trim()) {
      newErrors.career_goals = 'Career goals are required';
    }
    if (!formData.experience_level) {
      newErrors.experience_level = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const experienceLevels = [
    { value: 'student', label: 'Student', description: 'Currently studying or recent graduate' },
    { value: 'fresher', label: 'Fresher', description: '0-2 years of professional experience' },
    { value: 'professional', label: 'Professional', description: '2+ years of professional experience' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Education Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Education Background</h3>
            <p className="text-sm text-gray-600 mt-1">Tell us about your educational qualifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree/Certificate *
              </label>
              <input
                type="text"
                value={formData.education.degree}
                onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Bachelor of Computer Science"
              />
              {errors.education?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.education.degree}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={formData.education.field}
                onChange={(e) => handleInputChange('education', 'field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Computer Science"
              />
              {errors.education?.field && (
                <p className="text-red-500 text-sm mt-1">{errors.education.field}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={formData.education.institution}
                onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., University of Technology"
              />
              {errors.education?.institution && (
                <p className="text-red-500 text-sm mt-1">{errors.education.institution}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year
              </label>
              <input
                type="number"
                value={formData.education.graduation_year}
                onChange={(e) => handleInputChange('education', 'graduation_year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2024"
                min="1950"
                max="2030"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA/Grade (Optional)
              </label>
              <input
                type="text"
                value={formData.education.gpa}
                onChange={(e) => handleInputChange('education', 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3.8/4.0 or 85%"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Skills & Competencies</h3>
            <p className="text-sm text-gray-600 mt-1">List your technical skills, soft skills, and certifications</p>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Technical Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('technical', currentSkill))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., JavaScript, Python, React"
              />
              <button
                type="button"
                onClick={() => addSkill('technical', currentSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.current_skills.technical.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('technical', skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Soft Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentSoftSkill}
                onChange={(e) => setCurrentSoftSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('soft', currentSoftSkill))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Communication, Leadership, Problem Solving"
              />
              <button
                type="button"
                onClick={() => addSkill('soft', currentSoftSkill)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.current_skills.soft.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill('soft', skill)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Certifications (Optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentCertification}
                onChange={(e) => setCurrentCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('certifications', currentCertification))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., AWS Certified Developer, Google Analytics"
              />
              <button
                type="button"
                onClick={() => addSkill('certifications', currentCertification)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.current_skills.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeSkill('certifications', cert)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Career Goals Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Career Goals</h3>
            <p className="text-sm text-gray-600 mt-1">What do you want to achieve in your career?</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Goals *
            </label>
            <textarea
              value={formData.career_goals}
              onChange={(e) => handleInputChange('career_goals', '', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your career aspirations, desired job role, industry preferences, and long-term goals..."
            />
            {errors.career_goals && (
              <p className="text-red-500 text-sm mt-1">{errors.career_goals}</p>
            )}
          </div>
        </div>

        {/* Experience Level Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Experience Level</h3>
            <p className="text-sm text-gray-600 mt-1">Where are you in your professional journey?</p>
          </div>

          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <label
                key={level.value}
                className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.experience_level === level.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="experience_level"
                  value={level.value}
                  checked={formData.experience_level === level.value}
                  onChange={(e) => handleInputChange('experience_level', '', e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                    formData.experience_level === level.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.experience_level === level.value && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                </div>
              </label>
            ))}
            {errors.experience_level && (
              <p className="text-red-500 text-sm">{errors.experience_level}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Your Profile...
              </>
            ) : (
              'Generate My Career Plan'
            )}
          </button>
          <p className="text-center text-sm text-gray-600 mt-3">
            Our AI will analyze your profile and create a personalized career development plan
          </p>
        </div>
      </form>
    </div>
  );
}