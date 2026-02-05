import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Application, ApplicationStatus } from '@/types';
import ApplicationCard from './ApplicationCard';

interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  onEditApplication: (application: Application) => void;
  onDeleteApplication: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  applications,
  onEditApplication,
  onDeleteApplication,
}) => {
  const getColumnColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPLIED:
        return 'border-blue-200 bg-blue-50';
      case ApplicationStatus.OA:
        return 'border-yellow-200 bg-yellow-50';
      case ApplicationStatus.INTERVIEW:
        return 'border-purple-200 bg-purple-50';
      case ApplicationStatus.OFFER:
        return 'border-green-200 bg-green-50';
      case ApplicationStatus.REJECTED:
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.APPLIED:
        return 'text-blue-700';
      case ApplicationStatus.OA:
        return 'text-yellow-700';
      case ApplicationStatus.INTERVIEW:
        return 'text-purple-700';
      case ApplicationStatus.OFFER:
        return 'text-green-700';
      case ApplicationStatus.REJECTED:
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={`flex-1 min-w-80 rounded-lg border-2 ${getColumnColor(status)} p-4`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-lg ${getHeaderColor(status)}`}>
          {status}
        </h3>
        <span className="bg-white text-gray-600 text-sm font-medium px-2 py-1 rounded-full">
          {applications.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-96 transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-white/50 rounded-lg' : ''
            }`}
          >
            {applications.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xl">+</span>
                  </div>
                  <p>No applications yet</p>
                  <p className="text-xs mt-1">Drag applications here</p>
                </div>
              </div>
            ) : (
              applications.map((application, index) => (
                <ApplicationCard
                  key={application._id}
                  application={application}
                  index={index}
                  onEdit={onEditApplication}
                  onDelete={onDeleteApplication}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;