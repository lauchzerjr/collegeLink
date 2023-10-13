import { useTheme } from "@shopify/restyle";
import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { ThemeColorsProps } from "../../theme/theme";
import { useApptheme } from "../../hooks/useAppTheme";

interface CActivityIndicatorProps
  extends Omit<ActivityIndicatorProps, "color"> {
  color: ThemeColorsProps;
}
export function CActivityIndicator({ color }: CActivityIndicatorProps) {
  const { colors } = useApptheme();

  return <ActivityIndicator color={colors[color]} />;
}
