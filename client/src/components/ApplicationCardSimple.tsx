import React from 'react';
import { Application, ApplicationStatus } from '@/types';

interface ApplicationCardProps {
  application: Application;
  index: number;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

const ApplicationCardSimple: React.FC<ApplicationCardProps> = ({
  application,
  index,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: ApplicationStatus): string => {
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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onEdit(application);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onDelete(application._id);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {application.company}
          </h3>
          <p className="text-sm text-gray-600 truncate">{application.role}</p>
        </div>
        
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={handleEditClick}
            className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
            type="button"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
            type="button"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-1">📍</span>
          <span className="truncate">{application.location}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-1">📅</span>
          <span>Applied {formatDate(application.appliedDate)}</span>
        </div>

        {application.applicationLink && (
          <div className="flex items-center">
            <a
              href={application.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center text-xs text-primary-600 hover:text-primary-800 transition-colors"
            >
              <span className="mr-1">🔗</span>
              <span>View Application</span>
            </a>
          </div>
        )}
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600 line-clamp-2">{application.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationCardSimple;