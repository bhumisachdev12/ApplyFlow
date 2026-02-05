import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus, Search, Filter } from 'lucide-react';
import { applicationsAPI } from '@/services/api';
import { Application, ApplicationStatus, CreateApplicationData, UpdateApplicationData } from '@/types';
import KanbanColumn from '@/components/KanbanColumn';
import ApplicationModal from '@/components/ApplicationModal';
import toast from 'react-hot-toast';

const Board: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const data = await applicationsAPI.getAll();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleCreateApplication = async (data: CreateApplicationData) => {
    try {
      setIsSubmitting(true);
      const newApplication = await applicationsAPI.create(data);
      setApplications(prev => [newApplication, ...prev]);
      setIsModalOpen(false);
      toast.success('Application created successfully!');
    } catch (error) {
      toast.error('Failed to create application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateApplication = async (data: UpdateApplicationData) => {
    if (!editingApplication) return;

    try {
      setIsSubmitting(true);
      const updatedApplication = await applicationsAPI.update(editingApplication._id, data);
      setApplications(prev =>
        prev.map(app => app._id === editingApplication._id ? updatedApplication : app)
      );
      setEditingApplication(null);
      setIsModalOpen(false);
      toast.success('Application updated successfully!');
    } catch (error) {
      toast.error('Failed to update application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      await applicationsAPI.delete(id);
      setApplications(prev => prev.filter(app => app._id !== id));
      toast.success('Application deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as ApplicationStatus;
    const applicationId = draggableId;

    try {
      // Optimistically update the UI
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      // Update on the server
      await applicationsAPI.update(applicationId, { status: newStatus });
      toast.success(`Application moved to ${newStatus}`);
    } catch (error) {
      // Revert the optimistic update
      loadApplications();
      toast.error('Failed to update application status');
    }
  };

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return filteredApplications.filter(app => app.status === status);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingApplication(null);
  };

  const handleModalSubmit = (data: CreateApplicationData | UpdateApplicationData) => {
    if (editingApplication) {
      handleUpdateApplication(data);
    } else {
      handleCreateApplication(data as CreateApplicationData);
    }
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Application Board</h1>
            <p className="text-gray-600 mt-2">
              Drag and drop applications to update their status
            </p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Application</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')}
              className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">All Statuses</option>
              {Object.values(ApplicationStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {Object.values(ApplicationStatus).map((status) => {
            const count = getApplicationsByStatus(status).length;
            return (
              <div key={status} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{status}</div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {Object.values(ApplicationStatus).map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                applications={getApplicationsByStatus(status)}
                onEditApplication={handleEditApplication}
                onDeleteApplication={handleDeleteApplication}
              />
            ))}
          </div>
        </DragDropContext>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start tracking your internship applications by adding your first application to the board.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Application</span>
            </button>
          </div>
        )}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        application={editingApplication}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Board;