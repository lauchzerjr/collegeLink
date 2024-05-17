import React, { useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./src/theme/theme";
import { Routes } from "./src/presentation/routes";
import { CToast } from "./src/components/CToast/CToast";
import { authApi } from "./src/services/auth.service";
import { useAuthStore } from "./src/stores/authStore";

export default function App() {
  const setUser = useAuthStore((state) => state.setUser);

  async function loadUserStorageData() {
    const storage = await authApi.loadUserStorageData(setUser);

    return storage;
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="dark" backgroundColor="white" translucent />
        <Routes />
        <CToast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
