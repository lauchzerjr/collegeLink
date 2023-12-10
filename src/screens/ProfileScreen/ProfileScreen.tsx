import React from "react";
import firestore from "@react-native-firebase/firestore";

import { CScreen } from "../../components/CScreen/CScreen";
import { useAuth } from "../../hooks/useAuth";
import { CBox } from "../../components/CBox/CBox";
import { CText } from "../../components/CText/CText";
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
import { CActivityIndicator } from "../../components/CActivityIndicator/CActivityIndicator";
import { CUserProfilePhoto } from "../../components/CUserProfilePhoto/CUserProfilePhoto";
import { CUserProfileForm } from "../../components/CUserProfileForm/CUserProfileForm";
import { Userprofile } from "../../services/user/models/userModels";

export function ProfileScreen() {
  const { user } = useAuth();

  const {
    changePassword,
    changeUserProfileForm,
    isLoading: isLoadingUserContext,
  } = useUser();

  const [modalChangePassword, setModalChangePassword] = React.useState(false);
  const [userData, setUserData] = React.useState<Userprofile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const { control, formState, handleSubmit, getValues, setValue } =
    useForm<ProfileSchema>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: userData?.name || user.displayName,
        city: userData?.city || "",
        linkedin: userData?.linkedin || "",
        bio: userData?.bio || "",
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

  function toggleOpenModalChangePassword() {
    setModalChangePassword((prev) => !prev);
  }

  const handleChangePassword = async () => {
    await changePassword(
      getValuesChangePassword("oldPassword"),
      getValuesChangePassword("newPassword")
    );
    reset({ oldPassword: "" });
    reset({ newPassword: "" });
    toggleOpenModalChangePassword();
  };

  const changeForm = async () => {
    changeUserProfileForm(
      getValues("name"),
      getValues("city"),
      getValues("linkedin"),
      getValues("bio")
    );
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore()
          .collection("usersProfiles")
          .doc(user.uid)
          .get();
        const userData = userDoc.data() as Userprofile;
        if (userData) {
          setUserData(userData);
          setValue("name", userData?.name);
          setValue("city", userData?.city);
          setValue("linkedin", userData?.linkedin);
          setValue("bio", userData?.bio);
        }
      } catch (error) {
        console.log("Erro ao buscar as informações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user.uid, setValue]);

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
          {userData.email}
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
