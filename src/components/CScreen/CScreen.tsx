import React from "react";
import { CBox } from "../CBox/CBox";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  ScrollViewContainer,
  ViewContainer,
} from "./components/ScreenContainer";
import { useAppTheme } from "../../presentation/hooks/useAppTheme";
import { useAppSafeArea } from "../../presentation/hooks/useAppSafeArea";
import { BoxProps } from "../CBox/CBox";

interface CScreenProps extends BoxProps {
  children: React.ReactNode;
  isScroll?: boolean;
  isStackHeader?: boolean;
}

export function CScreen({
  children,
  isScroll = false,
  isStackHeader = false,
  ...BoxProps
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
          {...BoxProps}
        >
          {children}
        </CBox>
      </Container>
    </KeyboardAvoidingView>
  );
}
