import { useEffect, useState } from "react";
import { UserProfileInfo } from "../../models/user.model";
import {
  ProfileSchema,
  profileSchema,
} from "../screens/ProfileScreen/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../screens/ProfileScreen/changePasswordSchema";
import { useRoute } from "@react-navigation/native";
import { useAuthStore } from "../stores/authStore";
import { useToastStore } from "../stores/useToastStore";
import { Keyboard } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { userProfileController } from "../../controllers/user.controller";
import { authController } from "../../controllers/auth.controller";

export function useUserInfoProfile() {
  const { user, loading } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
    }))
  );

  const showToast = useToastStore((state) => state.showToast);

  const { params } = useRoute();

  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const [loadingScreenProfile, setLoadingScreenProfile] = useState(true);
  const [loadingUpdateFormProfile, setLoadingUpdateFormProfile] =
    useState(false);
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

  function handleToggleOpenModalToChangePassword() {
    setModalChangePassword((prev) => !prev);
  }

  async function handleToggleCity() {
    setIsEnabledCity((prev) => !prev);
    userProfileController.changeUserProfileCityToggle(!isEnabledCity, user);
  }

  const handleChangePassword = async () => {
    await authController.changePassword(
      getValuesChangePassword("oldPassword"),
      getValuesChangePassword("newPassword"),
      user
    );
    reset({ oldPassword: "" });
    reset({ newPassword: "" });
    handleToggleOpenModalToChangePassword();
  };

  const handleUpdateFormProfile = async () => {
    try {
      setLoadingUpdateFormProfile(true);
      userProfileController.updateFormProfile(
        getValues("name"),
        getValues("city"),
        getValues("linkedin"),
        getValues("bio"),
        user
      );
      Keyboard.dismiss();
    } catch (error) {
      console.log("erro:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoadingScreenProfile(true);
        const userData = await userProfileController.getUserProfileInfo(
          params?.userId || user.uid
        );

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
        setLoadingScreenProfile(false);
      }
    };

    fetchUserData();
  }, [params?.userId, user.uid, setValue, isEnabledCity]);

  return {
    userData,
    loadingScreenProfile,
    control,
    formState,
    loadingUpdateFormProfile,
    modalChangePassword,
    controlChangePassword,
    formStateChangePassword,
    loading,
    isEnabledCity,
    handleSubmit,
    handleToggleOpenModalToChangePassword,
    handleUpdateFormProfile,
    handleSubmitChangePassword,
    handleChangePassword,
    handleToggleCity,
  };
}
