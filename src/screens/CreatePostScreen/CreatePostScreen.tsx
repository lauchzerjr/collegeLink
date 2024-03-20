import React from "react";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { CButton } from "../../components/CButton/CButton";
import { useCreatePost } from "../../useCases/post/useCreatePost";

export function CreatePostScreen() {
  const { control, courseName, handleCreatePost, handleSubmit } =
    useCreatePost();

  return (
    <CScreen isStackHeader>
      <CText
        textAlign="center"
        mb="s12"
        fontSize={16}
        fontWeight="bold"
        color="bluePrimary"
        fontStyle="italic"
        textDecorationLine="underline"
      >
        {courseName}
      </CText>

      <CFormTextInput
        control={control}
        name="subjectPost"
        label="Titulo da postagem"
        placeholder="Digite o titulo da postagem"
        boxProps={{ mb: "s10" }}
        maxLength={50}
      />

      <CFormTextInput
        control={control}
        name="disciplinePost"
        label="Disciplina"
        placeholder="Digite a disciplina"
        boxProps={{ mb: "s10" }}
        maxLength={30}
      />

      <CFormTextInput
        control={control}
        name="textPost"
        label="Adicionar textos"
        placeholder="Digite seu texto"
        boxProps={{ mb: "s10" }}
        multiline
      />

      <CButton title="Adicionar imagens" preset="outline" />

      <CButton title="Publicar" onPress={handleSubmit(handleCreatePost)} />
    </CScreen>
  );
}
