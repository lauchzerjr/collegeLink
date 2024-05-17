import React from "react";

import { CScreen } from "../../components/CScreen/CScreen";
import { CBox } from "../../components/CBox/CBox";
import { CText } from "../../components/CText/CText";
import { CButton } from "../../components/CButton/CButton";
import { CModal } from "../../components/CModal/CModal";

import { CActivityIndicator } from "../../components/CActivityIndicator/CActivityIndicator";
import { CUserProfilePhoto } from "../../components/CUserProfilePhoto/CUserProfilePhoto";
import { CUserProfileForm } from "../../components/CUserProfileForm/CUserProfileForm";
import { useUserInfoProfile } from "../../useCases/profile/useUserInfoProfile";
import { CFormPasswordInput } from "../../components/CForm/CFormPasswordInput";
import { Switch } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuthStore } from "../../stores/authStore";

export function PostProfileScreen() {
  const {
    userData,
    loadingScreenProfile,
    control,
    handleSubmit,
    handleUpdateFormProfile,
    controlChangePassword,
    handleSubmitChangePassword,
    loadingUpdateFormProfile,
    modalChangePassword,
    handleToggleOpenModalToChangePassword,
    formStateChangePassword,
    handleChangePassword,
    loading: loadingChangePassword,
    isEnabledCity,
    handleToggleCity,
  } = useUserInfoProfile();

  const { params } = useRoute();
  const user = useAuthStore((state) => state.user);

  const isUserLoged = params?.userId === user.uid;

  if (loadingScreenProfile) {
    return (
      <CBox flex={1} alignItems="center" justifyContent="center">
        <CActivityIndicator size="large" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <CScreen isScroll>
      <CBox
        alignItems="center"
        justifyContent="center"
        mb="s10"
        position="relative"
      >
        <CUserProfilePhoto
          photoURL={userData?.userPhoto}
          isUserLoged={isUserLoged}
        />
        {isUserLoged && (
          <CBox position="absolute" top={0} left={0}>
            <Switch
              trackColor={{ false: "#B3B3B3", true: "#00599950" }}
              thumbColor={!isEnabledCity ? "#8E8E8E" : "#005999"}
              onValueChange={handleToggleCity}
              value={isEnabledCity}
            />
            <CText mt="s4" fontSize={16} color="bluePrimary">
              Cidade
            </CText>
          </CBox>
        )}

        <CText mt="s10" fontSize={16} color="bluePrimary">
          {userData?.email}
        </CText>
      </CBox>

      <CUserProfileForm
        isEditableInput={isUserLoged}
        control={control}
        isEnabledCity={userData?.isEnabledCity}
      />

      {isUserLoged && (
        <CBox width="100%" flexDirection="row" justifyContent="space-around">
          <CButton
            mt="s12"
            preset="primary"
            title="Salvar alterações"
            onPress={handleSubmit(handleUpdateFormProfile)}
            loading={loadingUpdateFormProfile}
          />
          <CButton
            mt="s12"
            preset="outline"
            title="Alterar senha"
            onPress={handleToggleOpenModalToChangePassword}
          />
        </CBox>
      )}

      <CModal
        visible={modalChangePassword}
        onClose={handleToggleOpenModalToChangePassword}
        title="Alterar senha"
        children={
          <>
            <CFormPasswordInput
              control={controlChangePassword}
              name="oldPassword"
              label="Senha atual"
              placeholder="Digite sua senha atual"
              boxProps={{ mb: "s10" }}
            />
            <CFormPasswordInput
              control={controlChangePassword}
              name="newPassword"
              label="Nova senha"
              placeholder="Digite sua nova senha"
              boxProps={{ mb: "s10" }}
              errorMessage={
                formStateChangePassword?.errors?.newPassword?.message
              }
            />

            <CButton
              disabled={!formStateChangePassword.isValid}
              title={"Alterar senha"}
              onPress={handleSubmitChangePassword(handleChangePassword)}
              loading={loadingChangePassword}
              mb="s10"
            />
          </>
        }
      />
    </CScreen>
  );
}
