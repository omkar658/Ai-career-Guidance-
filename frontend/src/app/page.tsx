'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileForm from '@/components/UserProfileForm';
import { apiClient } from '@/utils/api';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      console.log('Submitting profile data:', formData);

      // Submit profile to backend
      const response = await apiClient.submitProfile(formData);

      if (response.success) {
        console.log('Profile submitted successfully');
        // Redirect to dashboard to view the profile
        router.push('/dashboard');
      } else {
        console.error('Failed to submit profile:', response.message);
        alert('Failed to submit profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <span className="text-white font-bold text-xl">CG</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  AI Career Guidance
                </h1>
                <p className="text-sm text-gray-600">
                  🚀 Powered by AI for SDG-8 Workforce Development
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">AI Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg mb-6">
              <span className="text-sm font-medium text-gray-700">✨ AI-Powered Career Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="block gradient-text animate-pulse-glow">Career Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover personalized career paths, skill development plans, and job opportunities
              tailored to your unique profile. Let AI guide you toward sustainable workforce success.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">AI analyzes your skills and goals to create custom career paths</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Development</h3>
              <p className="text-gray-600">Get actionable plans to bridge skill gaps and advance your career</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Job Matching</h3>
              <p className="text-gray-600">Find high-match job opportunities with detailed compatibility scores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Tell Us About Yourself
              </h2>
              <p className="text-gray-600">
                Fill out your profile to unlock personalized AI career insights
              </p>
            </div>

            <UserProfileForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-lg border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              © 2024 AI Career Guidance Platform
            </p>
            <p className="text-sm text-gray-500">
              🌍 Supporting SDG-8 through intelligent workforce development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
