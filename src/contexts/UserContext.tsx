import React, { createContext } from "react";
import { Keyboard } from "react-native";
import { userInfosApi } from "../services/user.service";
import { useAuthStore } from "../stores/authStore";
import { useToastStore } from "../stores/useToastStore";

export interface UserContextProps {
  changeUserProfileForm: (
    name: string,
    city: string,
    linkedin: string,
    bio: string
  ) => Promise<void>;
  changeUserProfileCityToggle: (isEnabledCity: boolean) => Promise<void>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useAuthStore();

  const showToast = useToastStore((state) => state.showToast);

  const changeUserProfileForm = async (
    name: string,
    city: string,
    linkedin: string,
    bio: string
  ) => {
    try {
      setIsLoading(true);

      await userInfosApi.changeUserProfileForm(
        user,
        name,
        city,
        linkedin,
        bio,
        user.email
      );

      showToast({
        message: "Perfil atualizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      showToast({
        message: "Erro ao enviar atualizar perfil",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const changeUserProfileCityToggle = async (isEnabledCity: boolean) => {
    try {
      await userInfosApi.changeUserProfileCityToggle(user, isEnabledCity);

      if (isEnabledCity) {
        showToast({
          message: "Sua cidade será exibida para outros usuários!",
          type: "success",
        });
      } else {
        showToast({
          message: "Sua cidade não será exibida para outros usuários!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao exibir cidade:", error);
      showToast({
        message: "Erro ao enviar atualizar perfil",
        type: "error",
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        changeUserProfileForm,
        changeUserProfileCityToggle,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
