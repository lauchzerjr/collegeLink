import React, { createContext } from "react";
import { useToast } from "../hooks/useToast";
import { Keyboard } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { userInfosApi } from "../services/user.service";

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
  const { user } = useAuth();

  const { addToast } = useToast();

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

      addToast({
        message: "Perfil atualizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      addToast({
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
        addToast({
          message: "Sua cidade será exibida para outros usuários!",
          type: "success",
        });
      } else {
        addToast({
          message: "Sua cidade não será exibida para outros usuários!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao exibir cidade:", error);
      addToast({
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
