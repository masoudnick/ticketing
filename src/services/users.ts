import type { ManagedUser } from '@/types/user';

const usersEndpoint = 'http://localhost:3001/users';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('امکان ارتباط با سرویس کاربران وجود ندارد.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

const userService = {
  read: () => request<ManagedUser[]>(usersEndpoint),
  readById: (id: string) => request<ManagedUser>(`${usersEndpoint}/${id}`),
  create: (user: ManagedUser) => request<ManagedUser>(usersEndpoint, { method: 'POST', body: JSON.stringify(user) }),
  update: (id: string, values: Partial<ManagedUser>) => request<ManagedUser>(`${usersEndpoint}/${id}`, { method: 'PATCH', body: JSON.stringify(values) }),
  delete: (id: string) => request<void>(`${usersEndpoint}/${id}`, { method: 'DELETE' }),
};

export default userService;
