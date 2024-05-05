import React, { useEffect } from "react";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "./src/theme/theme";
import { Routes } from "./src/routes";
import { CToast } from "./src/components/CToast/CToast";
import { ToastProvider } from "./src/contexts/ToastContext";
import { UserProvider } from "./src/contexts/UserContext";
import { NameCollectionFirebaseContextProvider } from "./src/contexts/NameCollectionFirebase";
import { ControllerProvider } from "./src/contexts/Provider";
import { authApi } from "./src/services/auth.service";
import { useAuthStore } from "./src/stores/authStore";

export default function App() {
  const { setUser } = useAuthStore();

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
        <ToastProvider>
          <ControllerProvider>
            <UserProvider>
              <NameCollectionFirebaseContextProvider>
                <Routes />
                <CToast />
              </NameCollectionFirebaseContextProvider>
            </UserProvider>
          </ControllerProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
