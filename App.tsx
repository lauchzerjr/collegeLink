import { ThemeProvider, createBox } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProps, theme } from "./src/theme/theme";
import { LoginScreen } from "./src/screens/LoginScreen/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { AuthProvider } from "./src/contexts/AuthContext";
import { useAuth } from "./src/hooks/useAuth";
import { Routes } from "./src/routes";
import { useApptheme } from "./src/hooks/useAppTheme";
import { CToast } from "./src/components/CToast/CToast";

export const Box = createBox<ThemeProps>();

export default function App() {
  const { user } = useAuth();
  const { colors } = useApptheme();

  console.log("user", user);
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
