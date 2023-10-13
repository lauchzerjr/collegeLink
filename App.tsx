import { ThemeProvider, createBox } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProps, theme } from "./src/theme/theme";
import { CText } from "./src/components/CText/CText";

export const Box = createBox<ThemeProps>();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Box bg="primary" justifyContent="center" alignItems="center" flex={1}>
        <CText fontWeight="bold" fontSize={50}>Restyle done</CText>
      </Box>
    </ThemeProvider>
  );
}
