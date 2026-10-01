

import type { BasicInfoProps } from "@/types";

const dashboardService = {

  read: async (): Promise<BasicInfoProps> => {
    const res = await fetch(`http://localhost:3001/ticketStats`, {
      'method': 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    return data
  },

};

export default dashboardService;