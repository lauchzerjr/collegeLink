import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle";
import { ThemeProps } from "../../theme/theme";

export const CBox = createBox<ThemeProps>();
export type BoxProps = React.ComponentProps<typeof CBox>;

export type CTouchableOpacityBoxProps = BackgroundColorProps<ThemeProps> &
  SpacingProps<ThemeProps> &
  LayoutProps<ThemeProps> &
  BorderProps<ThemeProps> &
  SpacingShorthandProps<ThemeProps> &
  TouchableOpacityProps;

export const CTouchableOpacityBox = createRestyleComponent<
  CTouchableOpacityBoxProps,
  ThemeProps
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity
);
