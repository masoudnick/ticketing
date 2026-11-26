export interface PerformanceTrendPoint {
  label: string;
  resolved: number;
  target: number;
}

export interface PerformanceActivity {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'resolved' | 'feedback' | 'warning' | 'achievement';
}

export interface PerformanceProfile {
  id: string;
  userId: string;
  period: string;
  satisfaction: number;
  qualityScore: number;
  firstResponseMinutes: number;
  resolutionHours: number;
  workload: number;
  backlog: number;
  goal: string;
  updatedAt: string;
  trend: PerformanceTrendPoint[];
  activities: PerformanceActivity[];
}

export type PerformanceProfileFormValues = Pick<
  PerformanceProfile,
  | 'period'
  | 'satisfaction'
  | 'qualityScore'
  | 'firstResponseMinutes'
  | 'resolutionHours'
  | 'workload'
  | 'backlog'
  | 'goal'
>;
