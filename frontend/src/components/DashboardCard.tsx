'use client';

import { LucideIcon, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  data: any;
  content: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  metrics?: {
    label: string;
    value: string | number;
    percentage?: number;
  }[];
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    hover: 'hover:shadow-blue-100/50',
    accent: 'bg-blue-500',
    progress: '#3B82F6'
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    border: 'border-green-200',
    icon: 'text-green-600',
    hover: 'hover:shadow-green-100/50',
    accent: 'bg-green-500',
    progress: '#10B981'
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    hover: 'hover:shadow-purple-100/50',
    accent: 'bg-purple-500',
    progress: '#8B5CF6'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    border: 'border-orange-200',
    icon: 'text-orange-600',
    hover: 'hover:shadow-orange-100/50',
    accent: 'bg-orange-500',
    progress: '#F59E0B'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    border: 'border-red-200',
    icon: 'text-red-600',
    hover: 'hover:shadow-red-100/50',
    accent: 'bg-red-500',
    progress: '#EF4444'
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    icon: 'text-emerald-600',
    hover: 'hover:shadow-emerald-100/50',
    accent: 'bg-emerald-500',
    progress: '#059669'
  }
};

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  color,
  data,
  content,
  isSelected,
  onClick,
  metrics
}: DashboardCardProps) {
  const colors = colorClasses[color as keyof typeof colorClasses];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-1 ${
        colors.hover
      } ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-2xl scale-[1.02]'
          : 'hover:shadow-xl'
      } overflow-hidden`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient background */}
      <div className={`p-6 ${colors.bg} relative overflow-hidden`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
              <Icon className={`w-7 h-7 ${colors.icon}`} />
            </div>

            {/* Animated chevron */}
            <div className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>
              {isSelected ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

          {/* Metrics Row */}
          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                  <span className="text-xs font-medium text-gray-700">{metric.label}:</span>
                  <span className="font-bold text-gray-900">{metric.value}</span>
                  {metric.percentage !== undefined && (
                    <div className="w-6 h-6">
                      <div className="w-full h-full rounded-full border-2 border-current text-xs flex items-center justify-center font-bold"
                           style={{ color: colors.progress }}>
                        {metric.percentage}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats - Legacy support */}
          {data && !metrics && (
            <div className="flex flex-wrap gap-2 mt-4">
              {data.missing_skills && (
                <div className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                  <span className="text-gray-600">Missing:</span>
                  <span className="font-semibold text-red-600">{data.missing_skills.length}</span>
                </div>
              )}

              {data.duration_months && (
                <div className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-green-600">{data.duration_months}mo</span>
                </div>
              )}

              {data.primary_recommendations && (
                <div className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                  <span className="text-gray-600">Match:</span>
                  <span className="font-semibold text-purple-600">
                    {data.primary_recommendations[0]?.match_percentage}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expand/Collapse indicator with animation */}
      <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            {isSelected ? 'Click to collapse details' : 'Click to view details'}
          </p>
          <Sparkles className={`w-4 h-4 text-gray-400 transition-all duration-300 ${
            isHovered ? 'scale-110 text-blue-500' : ''
          }`} />
        </div>
      </div>

      {/* Expanded Content with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isSelected ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white px-6 py-6">
          {content}
        </div>
      </div>
    </div>
  );
}