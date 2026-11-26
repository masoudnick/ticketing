import type { ManagedTicket, NewTicketValues } from "@/types/ticket";

const endpoint = "http://localhost:3001/tickets";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error("دریافت یا ذخیره‌سازی تیکت با خطا مواجه شد.");
  }

  return response.json() as Promise<T>;
}

const ticketService = {
  readAll: () => request<ManagedTicket[]>(endpoint),
  create: (ticket: ManagedTicket) =>
    request<ManagedTicket>(endpoint, {
      method: "POST",
      body: JSON.stringify(ticket),
    }),
  makeTicket: (values: NewTicketValues, currentTickets: ManagedTicket[]) => {
    const now = new Date();
    const id = String(
      Math.max(705000, ...currentTickets.map((ticket) => Number(ticket.id) || 0)) + 1
    );
    const createdAt = new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(now);

    return {
      ...values,
      id,
      status: "جدید" as const,
      progress: 0,
      createdAt,
      history: [
        {
          id: `${id}-history-1`,
          by: "مدیر سیستم",
          action: "ثبت تیکت",
          date: createdAt,
          note: "تیکت توسط مدیر در میزکار ثبت شد.",
        },
      ],
    };
  },
};

export default ticketService;
