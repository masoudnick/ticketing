import type { PerformanceProfile } from '@/types/performance';

const endpoint = 'http://localhost:3001/performanceProfiles';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('امکان ارتباط با سرویس عملکرد وجود ندارد.');
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

const performanceService = {
  readAll: () => request<PerformanceProfile[]>(endpoint),
  read: (userId: string) => request<PerformanceProfile>(`${endpoint}/${userId}`),
  create: (profile: PerformanceProfile) => request<PerformanceProfile>(endpoint, { method: 'POST', body: JSON.stringify(profile) }),
  update: (userId: string, values: Partial<PerformanceProfile>) => request<PerformanceProfile>(`${endpoint}/${userId}`, { method: 'PATCH', body: JSON.stringify(values) }),
  delete: (userId: string) => request<void>(`${endpoint}/${userId}`, { method: 'DELETE' }),
};

export default performanceService;
