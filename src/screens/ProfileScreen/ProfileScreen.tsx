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

export function ProfileScreen() {
  const {
    userData,
    isLoading,
    control,
    formState,
    handleSubmit,
    changeForm,
    controlChangePassword,
    handleSubmitChangePassword,
    isLoadingUserContext,
    modalChangePassword,
    toggleOpenModalChangePassword,
    formStateChangePassword,
    handleChangePassword,
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

      {formState.isDirty ? (
        <CButton
          mt="s12"
          preset="primary"
          title="Salvar alterações"
          onPress={handleSubmit(changeForm)}
          loading={isLoadingUserContext}
        />
      ) : (
        <CButton
          mt="s12"
          preset="outline"
          title="Alterar senha"
          onPress={toggleOpenModalChangePassword}
        />
      )}

      <CModal
        disabledButton={!formStateChangePassword.isValid}
        titleButton="Alterar senha"
        visible={modalChangePassword}
        onClose={toggleOpenModalChangePassword}
        control={controlChangePassword}
        title="Alterar senha"
        onPress={handleSubmitChangePassword(handleChangePassword)}
        error={formStateChangePassword?.errors?.newPassword?.message}
      />
    </CScreen>
  );
}
