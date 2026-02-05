export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  applicationLink?: string;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  OA = 'OA',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  REJECTED = 'Rejected'
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
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
  appliedDate: string;
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

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}