import { useCallback, useEffect, useState } from "react";
import { UserProfileInfo } from "../../models/user.model";
import { useAuth } from "../../hooks/useAuth";
import { UserController } from "../../controllers/user.controller";
import { useUser } from "../../hooks/useUser";
import {
  ProfileSchema,
  profileSchema,
} from "../../screens/ProfileScreen/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../../screens/ProfileScreen/changePasswordSchema";
import { useRoute } from "@react-navigation/native";

export function useUserInfoProfile() {
  const {
    user,
    changePassword,
    isLoading: isLoadingUserChangePassword,
  } = useAuth();
  const {
    changeUserProfileForm,
    isLoading: isLoadingUserContext,
    changeUserProfileCityToggle,
  } = useUser();

  const { params } = useRoute();

  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabledCity, setIsEnabledCity] = useState(userData?.isEnabledCity);

  const { control, formState, handleSubmit, getValues, setValue } =
    useForm<ProfileSchema>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: userData?.name || user?.displayName,
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

  async function toggleCity() {
    setIsEnabledCity((prev) => !prev);
    changeUserProfileCityToggle(!isEnabledCity);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserController.getUserProfileInfo(
          params?.userId || user.uid
        );
        console.log("🚀 ~ fetchUserData ~ userData:", userData);

        if (userData) {
          setUserData(userData);
          setValue("name", userData?.name);
          setValue("city", userData?.city);
          setValue("linkedin", userData?.linkedin);
          setValue("bio", userData?.bio);
        }
      } catch (error) {
        console.log("Erro ao buscar as informações de usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [params?.userId, user.uid, setValue, isEnabledCity]);

  return {
    userData,
    isLoading,
    control,
    formState,
    isLoadingUserContext,
    modalChangePassword,
    controlChangePassword,
    formStateChangePassword,
    isLoadingUserChangePassword,
    isEnabledCity,
    handleSubmit,
    toggleOpenModalChangePassword,
    changeForm,
    handleSubmitChangePassword,
    handleChangePassword,
    toggleCity,
  };
}
