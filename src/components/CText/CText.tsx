import React from "react";
import { createText } from "@shopify/restyle";
import { ThemeProps } from "../../theme/theme";

const SRText = createText<ThemeProps>();
type SRTextProps = React.ComponentProps<typeof SRText>;

export function CText({ children, ...sRTextProps }: SRTextProps) {
  return (
    <SRText {...sRTextProps}>
      {children}
    </SRText>
  );
}
