import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./src/theme/theme";
import { AuthProvider } from "./src/contexts/AuthContext";
import { useAuth } from "./src/hooks/useAuth";
import { Routes } from "./src/routes";
import { CToast } from "./src/components/CToast/CToast";
import { ToastProvider } from "./src/contexts/ToastContext";

export default function App() {
  const { user } = useAuth();

  console.log("user", user);
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="dark" backgroundColor="white" translucent />
        <ToastProvider>
          <AuthProvider>
            <Routes />
            <CToast />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
