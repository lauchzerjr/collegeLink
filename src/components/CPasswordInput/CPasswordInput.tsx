import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { CTextInput, CTextInputProps } from "../CTextInput/CTextInput";
import { CTouchableOpacityBox } from "../CBox/CBox";

export type CPasswordInputProps = Omit<CTextInputProps, "iconRight">;

export function CPasswordInput(props: CPasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = React.useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry((prev) => !prev);
  }

  return (
    <CTextInput
      secureTextEntry={isSecureTextEntry}
      {...props}
      iconRight={
        <CTouchableOpacityBox onPress={toggleSecureTextEntry}>
        {isSecureTextEntry ? (
          <FontAwesome5 name="eye-slash" size={20} color="#005999" />
        ) : (
          <FontAwesome5 name="eye" size={20} color="#005999" />
        )}
      </CTouchableOpacityBox>
      }
    />
  );
}
