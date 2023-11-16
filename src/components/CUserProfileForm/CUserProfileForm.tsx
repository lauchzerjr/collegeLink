import React from "react";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { FontAwesome5, Entypo, FontAwesome } from "@expo/vector-icons";
import { Control } from "react-hook-form";

interface UserProfileFormProps {
  control: Control;
  isEditableInput?: boolean;
}

export const CUserProfileForm = ({ control, isEditableInput = false }: UserProfileFormProps) => {
  return (
    <>
      <CFormTextInput
        control={control}
        name="name"
        iconRight={<FontAwesome5 name="user-alt" size={20} color="#005999" />}
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{ mb: "s10" }}
        editable={isEditableInput}
      />

      <CFormTextInput
        control={control}
        name="city"
        iconRight={<Entypo name="location" size={20} color="#005999" />}
        label="Cidade"
        placeholder="Digite sua cidade"
        boxProps={{ mb: "s10" }}
        editable={isEditableInput}
      />

      <CFormTextInput
        control={control}
        name="linkedin"
        iconRight={
          <FontAwesome name="linkedin-square" size={20} color="#005999" />
        }
        label="Linkedin"
        placeholder="Digite seu linkedin"
        boxProps={{ mb: "s10" }}
        editable={isEditableInput}
      />

      <CFormTextInput
        control={control}
        name="bio"
        iconRight={<Entypo name="open-book" size={20} color="#005999" />}
        label="Biografia"
        placeholder="Digite sua biografia"
        boxProps={{ mb: "s10" }}
        multiline
        editable={isEditableInput}
      />
    </>
  );
};
