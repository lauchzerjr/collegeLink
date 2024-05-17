import { useEffect, useState } from "react";
import { UserProfileInfo } from "../../models/user.model";
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
import { useAuthStore } from "../../stores/authStore";
import { useController } from "../../hooks/useController";
import { useToastStore } from "../../stores/useToastStore";
import { Keyboard } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { UserProfileController } from "../../controllers/user.controller";
import { AuthController } from "../../controllers/auth.controller";

export function useUserInfoProfile() {
  const { user, loading } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      loading: state.loading,
    }))
  );
  const userProfileController = useController<UserProfileController>(
    "UserProfileController"
  );
  const authController = useController<AuthController>("AuthController");

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

  useEffect(() => {
    const unsubscribe = userProfileController.subscribe({
      onSuccessGetUserProfileInfo: (userData) => {
        if (userData) {
          setUserData(userData);
          setValue("name", userData?.name);
          setValue("city", userData?.city);
          setValue("linkedin", userData?.linkedin);
          setValue("bio", userData?.bio);
        }

        setLoadingScreenProfile(false);
      },
      onSuccessChangeUserProfileCityToggle: (msg) => {
        showToast({
          message: msg,
          type: "success",
        });
      },
      onSuccessUpdateFormProfile(msg) {
        showToast({
          message: msg,
          type: "success",
        });
        setLoadingUpdateFormProfile(false);
      },
      onError: (error) => {
        showToast({
          message: error,
          type: "error",
        });
        setLoadingScreenProfile(false);
        setLoadingUpdateFormProfile(false);
      },
      onLoadingScreenProfile: () => {
        setLoadingScreenProfile(true);
        setLoadingUpdateFormProfile(false);
      },
      onLoadingUpdateFormProfile: () => {
        setLoadingUpdateFormProfile(true);
        setLoadingScreenProfile(false);
      },
    });

    userProfileController.getUserProfileInfo(params?.userId || user.uid);

    return () => {
      unsubscribe();
    };
  }, []);

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
    userProfileController.updateFormProfile(
      getValues("name"),
      getValues("city"),
      getValues("linkedin"),
      getValues("bio"),
      user
    );
    Keyboard.dismiss();
  };

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
