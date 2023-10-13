import { useTheme } from "@shopify/restyle";
import { ThemeProps } from "../theme/theme";

export function useApptheme() {
  return useTheme<ThemeProps>()
}