import { useTheme } from "@shopify/restyle";
import { ThemeProps } from "../theme/theme";

export function useAppTheme() {
  return useTheme<ThemeProps>()
}