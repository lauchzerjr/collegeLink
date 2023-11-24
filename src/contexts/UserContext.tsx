import React, { createContext } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useToast } from "../hooks/useToast";
import { Keyboard } from "react-native";
import { useAuth } from "../hooks/useAuth";

export interface UserContextProps {
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  changeUserProfileForm: (
    name: string,
    city: string,
    linkedin: string,
    bio: string
  ) => Promise<void>;
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
  const { user } = useAuth()

  const { addToast } = useToast();

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(newPassword);

      addToast({
        message: "Senha alterada com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.log("Erro ao alterar a senha:", error);
      addToast({
        message: "Erro ao alterar a senha!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);

      await auth().sendPasswordResetEmail(email);

      addToast({
        message: "Enviamos as instruções para seu e-mail!",
        type: "success",
      });
    } catch (error) {
      console.log("Erro ao enviar o e-mail", error);
      addToast({
        message: "Erro ao enviar o e-mail",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const changeUserProfileForm = async (
    name: string,
    city: string,
    linkedin: string,
    bio: string
  ) => {
    try {
      setIsLoading(true);
      await firestore().collection("usersProfiles").doc(user.uid).set(
          {
            userID: user.uid,
            name,
            city,
            linkedin,
            bio,
          },
          { merge: true }
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

  return (
    <UserContext.Provider
      value={{
        changePassword,
        forgotPassword,
        changeUserProfileForm,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
