import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Clock, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { applicationsAPI, analyticsAPI } from '@/services/api';
import { Application, AnalyticsSummary, ApplicationStatus } from '@/types';
import ApplicationModal from '@/components/ApplicationModal';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [applicationsData, analyticsData] = await Promise.all([
        applicationsAPI.getAll(),
        analyticsAPI.getSummary()
      ]);
      setApplications(applicationsData);
      setAnalytics(analyticsData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApplication = async (data: any) => {
    try {
      setIsSubmitting(true);
      const newApplication = await applicationsAPI.create(data);
      setApplications(prev => [newApplication, ...prev]);
      setIsModalOpen(false);
      toast.success('Application created successfully!');
      
      // Refresh analytics
      const updatedAnalytics = await analyticsAPI.getSummary();
      setAnalytics(updatedAnalytics);
    } catch (error) {
      toast.error('Failed to create application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecentApplications = () => {
    return applications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPLIED:
        return 'bg-blue-100 text-blue-800';
      case ApplicationStatus.OA:
        return 'bg-yellow-100 text-yellow-800';
      case ApplicationStatus.INTERVIEW:
        return 'bg-purple-100 text-purple-800';
      case ApplicationStatus.OFFER:
        return 'bg-green-100 text-green-800';
      case ApplicationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
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
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your internship applications
          </p>
        </div>

        {/* Stats Cards */}
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
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offers Received</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.offersReceived || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics?.totalApplications 
                    ? Math.round(((analytics.offersReceived / analytics.totalApplications) * 100) * 100) / 100
                    : 0}%
                </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors mb-4"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Application</span>
              </button>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Applications this week</span>
                  <span className="font-semibold text-gray-900">
                    {analytics?.applicationsPerWeek?.slice(-1)[0]?.count || 0}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Pending responses</span>
                  <span className="font-semibold text-gray-900">
                    {applications.filter(app => 
                      app.status === ApplicationStatus.APPLIED || 
                      app.status === ApplicationStatus.OA
                    ).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <a
                  href="/board"
                  className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                >
                  View all →
                </a>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start tracking your internship applications to see them here.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Your First Application</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {getRecentApplications().map((application) => (
                    <div
                      key={application._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {application.company}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {application.role}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(application.appliedDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateApplication}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;