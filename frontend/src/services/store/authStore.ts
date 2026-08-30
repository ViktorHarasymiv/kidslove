import { create } from "zustand";

import {
  login,
  checkSession,
  getMe,
  logout,
  deleteAccount,
  refreshSession,
} from "../Api/auth.ts";

import type { LoginValues, User } from "../../types/auth.ts";

interface AuthState {
  user: User | null;
  authorized: boolean;
  loading: boolean;

  setUser: (user: User | null) => void;
  setAuthorized: (value: boolean) => void;
  setLoading: (value: boolean) => void;

  getLogin: (data: LoginValues) => Promise<void>;
  getLogout: () => Promise<void>;
  fetchUser: () => Promise<User | null>;
  deleteAccountFunc: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  authorized: false,
  loading: true,

  // SETTERS

  setUser: (user) => set({ user }),
  setAuthorized: (value: boolean) => set({ authorized: value }),
  setLoading: (value: boolean) => set({ loading: value }),

  // FUNCTION

  getLogin: async (data) => {
    const res = await login(data);
    if (res) {
      set({ authorized: true });
    }
  },

  getLogout: async () => {
    await logout();
    set({ user: null, authorized: false });
  },

  // loginWithGoogleCode: async (code) => {
  //   try {
  //     console.log(code);

  //     const res = await axios.post(
  //       `${API_URL}/auth/confirm-oauth`,
  //       { code },
  //       { withCredentials: true },
  //     );
  //     const { user } = res.data.data;
  //     if (user) {
  //       set({ user, authorized: true });
  //     }
  //   } catch (err) {
  //     console.error("❌ Google login failed:", err);
  //     set({ authorized: false, user: null });
  //   }
  // },

  fetchUser: async () => {
    const { setLoading, setAuthorized, setUser } = get();

    try {
      setLoading(true);

      // 1. Перевіряємо сесію
      const isAuthenticated = await checkSession();

      if (!isAuthenticated) {
        console.log("⚠️ Session invalid, trying refresh...");
        const ref = await refreshSession();

        if (!ref) {
          console.log("❌ Refresh failed");
          setAuthorized(false);
          setUser(null);
          return;
        }

        // refresh успішний → тягнемо юзера
        const user = await getMe();
        if (user) {
          setUser(user);
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }

        return;
      }

      // 2. Якщо accessToken валідний → getMe()
      const user = await getMe();

      if (user) {
        setUser(user);
        setAuthorized(true);
        console.log("✅ Session valid");
      } else {
        setAuthorized(false);
      }

      return user;
    } catch (err) {
      console.error("❌ Session check error:", err);
      setAuthorized(false);
      setUser(null);
    } finally {
      setLoading(false); // 🔥 завжди викликається
    }
  },

  deleteAccountFunc: async () => {
    try {
      await deleteAccount();
    } catch (err) {
      console.error(err);
    }
  },
}));
