export type UserStatus = 'active' | 'inactive';

export interface UserPerformance {
  assigned: number;
  satisfaction: number;
  open: number;
  resolved: number;
  averageResponseMinutes: number;
  sla: number;
  lastActivity: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  email: string;
  phone_number: string;
  city: string;
  role: string;
  department: string;
  status: UserStatus;
  joinedAt: string;
  performance: UserPerformance;
  resolvedTickets: {label: string; value: number}[];
}

export type UserFormValues = Pick<ManagedUser, 'name' | 'email' | 'phone_number' | 'role' | 'department' | 'status'>;
