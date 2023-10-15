import { ThemeProvider, createBox } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProps, theme } from "./src/theme/theme";
import { LoginScreen } from "./src/screens/LoginScreen/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export const Box = createBox<ThemeProps>();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar style="dark" />
        <LoginScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}
