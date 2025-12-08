export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  name?: string;
  role?: 'employee' | 'admin';
  scheduleStart?: string;
  scheduleEnd?: string;
};

export type RegisterValidationErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
  submit?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginValidationErrors = {
  email?: string;
  password?: string;
  submit?: string;
};

export type UserRole = 'employee' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  timezone: string;
  schedule: {
    start: string;
    end: string;
  };
  createdAt: Date;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  email: string;
  name: string;
  date: Date;
  dateString: string;
  punchIn: string;
  punchInTimestamp: Date;
  punchOut?: string;
  punchOutTimestamp?: Date;
  lateTime: string;
  regularHours: string;
  overtimeHours: string;
  nightDiffHours: string;
  underTime: string;
  status: 'present' | 'absent' | 'pending';
  scheduleUsed: {
    start: string;
    end: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface DailySummary {
  id: string;
  userId: string;
  date: Date;
  dateString: string;
  regularHours: number;
  overtimeHours: number;
  nightDiffHours: number;
  lateMinutes: number;
  undertimeMinutes: number;
  totalHours: number;
  lastUpdated: Date;
}