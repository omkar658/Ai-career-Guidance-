'use client';

import { LucideIcon } from 'lucide-react';
import CircularProgress from './CircularProgress';

interface MetricCardProps {
  title: string;
  value: string | number;
  percentage?: number;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  percentage,
  icon: Icon,
  color,
  trend,
  trendValue,
  className = ''
}: MetricCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      progress: '#3B82F6'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      icon: 'text-green-600',
      progress: '#10B981'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      progress: '#8B5CF6'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      progress: '#F59E0B'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      icon: 'text-emerald-600',
      progress: '#059669'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-200',
      icon: 'text-red-600',
      progress: '#EF4444'
    }
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-sm`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          {percentage !== undefined && (
            <CircularProgress
              percentage={percentage}
              size={50}
              strokeWidth={4}
              color={colors.progress}
              showPercentage={true}
              animated={true}
            />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900">
              {value}
            </p>
            {trend && trendValue && (
              <div className={`flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' :
                trend === 'down' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                <span className="font-medium">{trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient bar */}
      <div className={`h-1 bg-gradient-to-r ${colors.bg} opacity-50`}></div>
    </div>
  );
}