import type { BasicInfoProps } from "@/types";

const basicInfoService = {
  create: async (data: any) => {
    const res = await fetch("/create/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

  readCategories: async (): Promise<BasicInfoProps[]> => {
    const res = await fetch(`http://localhost:3001/basicInfoCategories`, {
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
  
  read: async (id?: number): Promise<BasicInfoProps> => {
    const res = await fetch(`http://localhost:3001/basicInfoData${id ? `/${id}` : ''}`, {
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

  update: async (data: any) => {
    const res = await fetch("/update/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch("/delete/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  },

};

export default basicInfoService;