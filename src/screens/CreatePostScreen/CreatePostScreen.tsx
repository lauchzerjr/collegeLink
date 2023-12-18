import React from "react";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { useNameCollectionFirebase } from "../../hooks/useNameCollectionFirebase";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { useForm } from "react-hook-form";
import { CreatePostSchemaSchema, createPostSchema } from "./createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CButton } from "../../components/CButton/CButton";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

export function CreatePostScreen() {
  const { user } = useAuth();
  const { nameCollection, courseName } = useNameCollectionFirebase();

  const { control, formState, handleSubmit, getValues, setValue } =
    useForm<CreatePostSchemaSchema>({
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        subjectPost: "",
        disciplinePost: "",
        textPost: "",
      },
      mode: "onChange",
    });

  const handleCreatePost = () => {
    firestore()
      .collection(nameCollection)
      .add({
        userId: user.uid,
        disciplinePost: getValues("disciplinePost"),
        subjectPost: getValues("subjectPost"),
        textPost: getValues("textPost"),
      });
  };

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
