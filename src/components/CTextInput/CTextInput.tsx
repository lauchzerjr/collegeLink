import { Pressable, TextInput, TextInputProps, TextStyle } from "react-native";
import { CBox, BoxProps } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { useApptheme } from "../../hooks/useAppTheme";
import React from "react";

export interface CTextInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  iconRight?: React.ReactElement;
  boxProps?: BoxProps;
}
export function CTextInput({
  label,
  errorMessage,
  iconRight,
  boxProps,
  ...textInputProps
}: CTextInputProps) {
  const { colors } = useApptheme();
  const inputRef = React.useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const $textInputContainer: BoxProps = {
    flexDirection: "row",
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? "error" : "gray4",
    p: "s16",
    borderRadius: "s12",
  };

  return (
    <CBox {...boxProps}>
      <Pressable onPress={focusInput}>
        <CText mb="s4" fontWeight="bold" fontSize={16} color="bluePrimary">
          {label}
        </CText>
        <CBox {...$textInputContainer}>
          <TextInput
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            style={$textInputStyle}
            {...textInputProps}
          />
          {iconRight && (
            <CBox justifyContent="center" ml="s16">
              {iconRight}
            </CBox>
          )}
        </CBox>
        {errorMessage && (
          <CText color="error">
            {errorMessage}
          </CText>
        )}
      </Pressable>
    </CBox>
  );
}

const $textInputStyle: TextStyle = {
  flexGrow: 1,
  flexShrink: 1,
};
