export type UserStatus = 'active' | 'inactive';

export interface UserTicketPerformance {
  assigned: number;
  open: number;
  resolved: number;
  averageResponseMinutes: number;
  sla: number;
  lastActivity: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  mobile: string;
  role: string;
  department: string;
  status: UserStatus;
  joinedAt: string;
  performance: UserTicketPerformance;
}

export type UserFormValues = Pick<ManagedUser, 'name' | 'email' | 'mobile' | 'role' | 'department' | 'status'>;
