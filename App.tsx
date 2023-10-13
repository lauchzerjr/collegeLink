import { ThemeProvider, createBox } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProps, theme } from "./src/theme/theme";
import { Text } from "react-native";

export const Box = createBox<ThemeProps>();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Box bg="primary" justifyContent="center" alignItems="center" flex={1}>
        <Text>Restyle done</Text>
      </Box>
    </ThemeProvider>
  );
}
