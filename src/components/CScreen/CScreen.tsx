import React from "react";
import { CBox } from "../CBox/CBox";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  ScrollViewContainer,
  ViewContainer,
} from "./components/ScreenContainer";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAppSafeArea } from "../../hooks/useAppSafeArea";

interface CScreenProps {
  children: React.ReactNode;
  isScroll?: boolean;
  isStackHeader?: boolean;
}

export function CScreen({
  children,
  isScroll = false,
  isStackHeader = false,
}: CScreenProps) {
  const { colors } = useAppTheme();
  const { bottom, top } = useAppSafeArea();
  const Container = isScroll ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container backgroundColor={colors.background}>
        <CBox
          pb="s20"
          paddingHorizontal="s20"
          style={{
            paddingTop: isStackHeader ? 20 : top,
            paddingBottom: bottom,
          }}
        >
          {children}
        </CBox>
      </Container>
    </KeyboardAvoidingView>
  );
}
