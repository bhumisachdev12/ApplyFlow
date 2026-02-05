import mongoose, { Schema } from 'mongoose';
import { IApplication, ApplicationStatus } from '../types';

const ApplicationSchema = new Schema<IApplication>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    ref: 'User'
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  applicationLink: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Optional field
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Application link must be a valid URL'
    }
  },
  appliedDate: {
    type: Date,
    required: [true, 'Applied date is required'],
    default: Date.now
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: Object.values(ApplicationStatus),
    default: ApplicationStatus.APPLIED
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
ApplicationSchema.index({ userId: 1, createdAt: -1 });
ApplicationSchema.index({ userId: 1, status: 1 });
ApplicationSchema.index({ userId: 1, company: 1 });

export default mongoose.model<IApplication>('Application', ApplicationSchema);