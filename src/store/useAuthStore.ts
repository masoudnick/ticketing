import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthUser } from "@/services/auth";

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  signOut: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: "authSession", storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
