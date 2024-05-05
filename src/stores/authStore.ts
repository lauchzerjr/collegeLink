import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

type AuthState = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
};

type AuthActions = {
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
