import React from "react";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { CButton } from "../../components/CButton/CButton";
import { useCreatePost } from "../../hooks/useCreatePost";
import { CBox, CTouchableOpacityBox } from "../../components/CBox/CBox";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function CreatePostScreen() {
  const {
    control,
    courseName,
    handleCreatePost,
    handleSubmit,
    formState,
    selectedImage,
    setSelectedImage,
    pickImageGallery,
  } = useCreatePost();

  return (
    <CScreen isStackHeader isScroll>
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

      {selectedImage && (
        <CBox position="relative" marginVertical="s12">
          <CTouchableOpacityBox
            onPress={() => setSelectedImage("")}
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              zIndex: 2,
              backgroundColor: "white",
              padding: 4,
              borderRadius: 16,
              borderWidth: 1,
            }}
          >
            <MaterialIcons name="delete" size={20} color="black" />
          </CTouchableOpacityBox>
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 12,
            }}
            resizeMode="stretch"
          />
        </CBox>
      )}

      <CButton
        title="Adicionar imagem"
        preset="outline"
        onPress={pickImageGallery}
      />

      <CButton
        title="Publicar"
        onPress={handleSubmit(handleCreatePost)}
        disabled={!formState.isValid}
        marginTop="s10"
      />
    </CScreen>
  );
}
