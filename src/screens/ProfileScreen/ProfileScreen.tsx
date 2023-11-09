import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";

import { CScreen } from "../../components/CScreen/CScreen";
import { useAuth } from "../../hooks/useAuth";
import { CBox } from "../../components/CBox/CBox";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CText } from "../../components/CText/CText";
import { CFormTextInput } from "../../components/CForm/CFormTextInput";
import { ProfileSchema, profileSchema } from "./profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CButton } from "../../components/CButton/CButton";
import { CModal } from "../../components/CModal/CModal";
import { useUser } from "../../hooks/useUser";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "./changePasswordSchema";

export function ProfileScreen() {
  const { user } = useAuth();
  const { colors } = useAppTheme();
  const { changePassword } = useUser();

  const [modalChangePassword, setModalChangePassword] = React.useState(false);

  const { control, formState, handleSubmit, getValues } =
    useForm<ProfileSchema>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: user.displayName,
        city: "",
        linkedin: "",
        bio: "",
      },
      mode: "onChange",
    });

  const {
    control: controlChangePassword,
    formState: formStateChangePassword,
    handleSubmit: handleSubmitChangePassword,
    getValues: getValuesChangePassword,
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
    mode: "onChange",
  });

  const changeForm = () => {
    console.log("formState", formState.dirtyFields);
  };

  function toggleModal() {
    setModalChangePassword((prev) => !prev);
  }

  const handleChangePassword = async () => {
    await changePassword(
      getValuesChangePassword("oldPassword"),
      getValuesChangePassword("newPassword")
    );
    reset({ oldPassword: "" });
    reset({ newPassword: "" });
    toggleModal();
  };

  return (
    <CScreen isScroll>
      <CBox alignItems="center" justifyContent="center" mb="s10">
        <View
          style={{
            width: 130,
            height: 130,
            backgroundColor: colors.gray4,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            borderWidth: 2,
            borderColor: colors.bluePrimary,
            position: "relative",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              position: "absolute",
              backgroundColor: colors.bluePrimary,
              zIndex: 9,
              right: 0,
              bottom: 0,
              borderRadius: 25,
              padding: 8,
            }}
          >
            <MaterialIcons
              name="mode-edit"
              size={20}
              color={colors.grayWhite}
            />
          </TouchableOpacity>
          {!user?.photoURL ? (
            <Image
              // source={{ uri: user?.photoURL }}
              source={{
                uri: "https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2019/01/12/Photos/Processed/uri1-U20573096666kjH--621x414@LiveMint.jpg",
              }}
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
              }}
            />
          ) : (
            <FontAwesome5
              name="user-graduate"
              size={70}
              color={colors.bluePrimary}
            />
          )}
        </View>

        <CText mt="s10" fontSize={16} color="bluePrimary">
          {user.email}
        </CText>
      </CBox>

      <CFormTextInput
        control={control}
        name="name"
        iconRight={<FontAwesome5 name="user-alt" size={20} color="#005999" />}
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{ mb: "s10" }}
      />

      <CFormTextInput
        control={control}
        name="city"
        iconRight={<Entypo name="location" size={20} color="#005999" />}
        label="Cidade"
        placeholder="Digite sua cidade"
        boxProps={{ mb: "s10" }}
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
      />

      <CFormTextInput
        control={control}
        name="bio"
        iconRight={<Entypo name="open-book" size={20} color="#005999" />}
        label="Biografia"
        placeholder="Digite sua biografia"
        boxProps={{ mb: "s10" }}
        multiline
        editable={false}
      />

      {formState.isDirty ? (
        <CButton
          mt="s12"
          preset="primary"
          title="Salvar alterações"
          onPress={handleSubmit(changeForm)}
        />
      ) : (
        <CButton
          mt="s12"
          preset="outline"
          title="Alterar senha"
          onPress={toggleModal}
        />
      )}

      <CModal
        disabledButton={!formStateChangePassword.isValid}
        titleButton="Alterar senha"
        visible={modalChangePassword}
        onClose={toggleModal}
        control={controlChangePassword}
        title="Alterar senha"
        onPress={handleSubmitChangePassword(handleChangePassword)}
        error={formStateChangePassword?.errors?.newPassword?.message}
      />
    </CScreen>
  );
}
