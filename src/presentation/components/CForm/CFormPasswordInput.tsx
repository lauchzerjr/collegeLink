import React from "react";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import {
  CPasswordInput,
  CPasswordInputProps,
} from "../CPasswordInput/CPasswordInput";

export function CFormPasswordInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...cPasswordInputProps
}: CPasswordInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <CPasswordInput
          value={field.value}
          onChangeText={field.onChange}
          errorMessage={fieldState.error?.message}
          {...cPasswordInputProps}
        />
      )}
    />
  );
}
