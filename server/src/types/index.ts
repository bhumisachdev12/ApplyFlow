import { Request } from 'express';
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IApplication extends Document {
  _id: Types.ObjectId;
  userId: string;
  company: string;
  role: string;
  location: string;
  applicationLink?: string;
  appliedDate: Date;
  status: ApplicationStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  OA = 'OA',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  REJECTED = 'Rejected'
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface CreateApplicationData {
  company: string;
  role: string;
  location: string;
  applicationLink?: string;
  appliedDate: Date;
  status: ApplicationStatus;
  notes?: string;
}

export interface UpdateApplicationData extends Partial<CreateApplicationData> {}

export interface AnalyticsSummary {
  totalApplications: number;
  offersReceived: number;
  rejectionRate: number;
  averageResponseTime: number;
  applicationsPerWeek: Array<{
    week: string;
    count: number;
  }>;
  statusDistribution: Array<{
    status: ApplicationStatus;
    count: number;
  }>;
}