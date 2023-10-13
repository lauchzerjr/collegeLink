import { ThemeProvider, createBox } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProps, theme } from "./src/theme/theme";
import { CText } from "./src/components/CText/CText";
import { CButton } from "./src/components/CButton/CButton";
import { CTextInput } from "./src/components/CTextInput/CTextInput";

export const Box = createBox<ThemeProps>();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <Box bg="background" justifyContent="center" alignItems="center" flex={1}>
        <CText fontWeight="bold" fontSize={50}>
          Restyle done
        </CText>
        <CButton title="outline" preset="outline"/>
        <CButton title="normal" preset="primary"/>

        <CTextInput label="E-mail" errorMessage="error"/>
      </Box>
    </ThemeProvider>
  );
}
