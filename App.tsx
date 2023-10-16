import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "./src/theme/theme";
import { AuthProvider } from "./src/contexts/AuthContext";
import { useAuth } from "./src/hooks/useAuth";
import { Routes } from "./src/routes";
import { useApptheme } from "./src/hooks/useAppTheme";
import { CToast } from "./src/components/CToast/CToast";
import { ToastProvider } from "./src/contexts/ToastContext";

export default function App() {
  const { user } = useAuth();
  const { colors } = useApptheme();

  console.log("user", user);
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="white" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ToastProvider>
          <AuthProvider>
            <Routes />
            <CToast />
          </AuthProvider>
        </ToastProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
