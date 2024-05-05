import { create } from "zustand";

interface ToastProps {
  message: string;
  type: "error" | "success";
}

type ToastState = {
  toast: ToastProps | null;
};

type ToastActions = {
  showToast: (newToast: ToastProps) => void;
};

export const useToastStore = create<ToastState & ToastActions>((set) => ({
  toast: null,
  showToast: (toast) => set({ toast }),
}));
