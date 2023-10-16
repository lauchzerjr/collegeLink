import React from "react";

export interface ToastProps {
  message: string;
  type: "error" | "success";
}

export interface ToastContextType {
  toast: ToastProps | null;
  addToast: (toast: ToastProps) => void;
}

export const ToastContext = React.createContext<ToastContextType | null>(null);

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = React.useState<ToastProps | null>(null);

  const addToast = (newToast: ToastProps) => {
    setToast(newToast);
  };

  return (
    <ToastContext.Provider value={{ toast, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
