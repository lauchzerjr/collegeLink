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

export function ProfileScreen() {
  const {
    userData,
    isLoading,
    control,
    handleSubmit,
    changeForm,
    controlChangePassword,
    handleSubmitChangePassword,
    isLoadingUserContext,
    modalChangePassword,
    toggleOpenModalChangePassword,
    formStateChangePassword,
    handleChangePassword,
    isLoadingUserChangePassword,
  } = useUserInfoProfile();

  if (isLoading) {
    return (
      <CBox flex={1} alignItems="center" justifyContent="center">
        <CActivityIndicator size="large" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <CScreen isScroll>
      <CBox alignItems="center" justifyContent="center" mb="s10">
        <CUserProfilePhoto photoURL={userData?.userPhoto} />

        <CText mt="s10" fontSize={16} color="bluePrimary">
          {userData?.email}
        </CText>
      </CBox>

      <CUserProfileForm isEditableInput control={control} />

      <CBox width="100%" flexDirection="row" justifyContent="space-around">
        <CButton
          mt="s12"
          preset="primary"
          title="Salvar alterações"
          onPress={handleSubmit(changeForm)}
          loading={isLoadingUserContext}
        />
        <CButton
          mt="s12"
          preset="outline"
          title="Alterar senha"
          onPress={toggleOpenModalChangePassword}
        />
      </CBox>

      <CModal
        visible={modalChangePassword}
        onClose={toggleOpenModalChangePassword}
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
              loading={isLoadingUserChangePassword}
              mb="s10"
            />
          </>
        }
      />
    </CScreen>
  );
}
