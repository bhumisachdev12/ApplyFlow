import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Application, ApplicationStatus, CreateApplicationData, UpdateApplicationData } from '@/types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateApplicationData | UpdateApplicationData) => void;
  application?: Application | null;
  isLoading?: boolean;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  application,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    applicationLink: '',
    appliedDate: new Date().toISOString().split('T')[0],
    status: ApplicationStatus.APPLIED,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company,
        role: application.role,
        location: application.location,
        applicationLink: application.applicationLink || '',
        appliedDate: new Date(application.appliedDate).toISOString().split('T')[0],
        status: application.status,
        notes: application.notes || '',
      });
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        applicationLink: '',
        appliedDate: new Date().toISOString().split('T')[0],
        status: ApplicationStatus.APPLIED,
        notes: '',
      });
    }
    setErrors({});
  }, [application, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Applied date is required';
    }

    if (formData.applicationLink && !isValidUrl(formData.applicationLink)) {
      newErrors.applicationLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      appliedDate: new Date(formData.appliedDate).toISOString(),
      applicationLink: formData.applicationLink || undefined,
      notes: formData.notes || undefined,
    };

    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {application ? 'Edit Application' : 'Add New Application'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.company ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Google, Microsoft"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.role ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Software Engineer Intern"
            />
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.location ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Remote, San Francisco, CA"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Application Link */}
          <div>
            <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-700 mb-1">
              Application Link
            </label>
            <input
              type="url"
              id="applicationLink"
              name="applicationLink"
              value={formData.applicationLink}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.applicationLink ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://..."
            />
            {errors.applicationLink && <p className="mt-1 text-sm text-red-600">{errors.applicationLink}</p>}
          </div>

          {/* Applied Date */}
          <div>
            <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-700 mb-1">
              Applied Date *
            </label>
            <input
              type="date"
              id="appliedDate"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.appliedDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.appliedDate && <p className="mt-1 text-sm text-red-600">{errors.appliedDate}</p>}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.values(ApplicationStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Any additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Saving...' : application ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;