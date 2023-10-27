import React from "react";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { CTextInput, CTextInputProps } from "../CTextInput/CTextInput";

export function CFormTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...cTextInputProps
}: CTextInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <CTextInput
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          {...cTextInputProps}
        />
      )}
    />
  );
}
