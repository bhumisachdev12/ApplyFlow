import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { analyticsAPI } from '@/services/api';
import { AnalyticsSummary } from '@/types';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await analyticsAPI.getSummary();
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColors = () => ({
    Applied: '#3b82f6',
    OA: '#f59e0b',
    Interview: '#8b5cf6',
    Offer: '#10b981',
    Rejected: '#ef4444',
  });

  const barChartData = {
    labels: analytics?.applicationsPerWeek.map(item => item.week) || [],
    datasets: [
      {
        label: 'Applications',
        data: analytics?.applicationsPerWeek.map(item => item.count) || [],
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const doughnutChartData = {
    labels: analytics?.statusDistribution.map(item => item.status) || [],
    datasets: [
      {
        data: analytics?.statusDistribution.map(item => item.count) || [],
        backgroundColor: [
          getStatusColors().Applied,
          getStatusColors().OA,
          getStatusColors().Interview,
          getStatusColors().Offer,
          getStatusColors().Rejected,
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    cutout: '60%',
  };

  const getSuccessRate = () => {
    if (!analytics || analytics.totalApplications === 0) return 0;
    return Math.round(((analytics.offersReceived / analytics.totalApplications) * 100) * 100) / 100;
  };

  const getConversionRate = () => {
    if (!analytics || analytics.totalApplications === 0) return 0;
    const interviewsAndOffers = analytics.statusDistribution
      .filter(item => item.status === 'Interview' || item.status === 'Offer')
      .reduce((sum, item) => sum + item.count, 0);
    return Math.round(((interviewsAndOffers / analytics.totalApplications) * 100) * 100) / 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your application performance and identify improvement opportunities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.totalApplications || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{getSuccessRate()}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{getConversionRate()}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.averageResponseTime || 0}d
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Applications Per Week Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Applications Per Week
            </h2>
            <div className="h-64">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Status Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Status Distribution
            </h2>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Insights */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {analytics?.offersReceived || 0} offers received
                  </p>
                  <p className="text-xs text-gray-600">
                    {getSuccessRate()}% success rate from total applications
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Average response time: {analytics?.averageResponseTime || 0} days
                  </p>
                  <p className="text-xs text-gray-600">
                    Time from application to first response
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {getConversionRate()}% conversion to interviews/offers
                  </p>
                  <p className="text-xs text-gray-600">
                    Applications that progressed beyond initial screening
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
            <div className="space-y-4">
              {analytics && analytics.totalApplications === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">
                    Start adding applications to see personalized recommendations!
                  </p>
                </div>
              ) : (
                <>
                  {getSuccessRate() < 10 && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Improve application quality
                        </p>
                        <p className="text-xs text-gray-600">
                          Consider tailoring your resume and cover letter for each application
                        </p>
                      </div>
                    </div>
                  )}

                  {analytics && analytics.averageResponseTime > 30 && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Follow up on pending applications
                        </p>
                        <p className="text-xs text-gray-600">
                          Consider sending follow-up emails after 2-3 weeks
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Keep applying consistently
                      </p>
                      <p className="text-xs text-gray-600">
                        Aim for 5-10 applications per week for best results
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Track your progress
                      </p>
                      <p className="text-xs text-gray-600">
                        Regular tracking helps identify patterns and improve strategy
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;