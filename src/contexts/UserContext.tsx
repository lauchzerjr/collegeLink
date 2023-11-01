import React, { createContext } from "react";
import auth from "@react-native-firebase/auth";
import { useToast } from "../hooks/useToast";

export interface UserContextProps {
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
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
  const user = auth().currentUser;

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
      console.error("Erro ao alterar a senha:", error);
      addToast({
        message: "Erro ao alterar a senha!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
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
      console.error("Erro ao enviar o e-mail", error);
      addToast({
        message: "Erro ao enviar o e-mail",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ changePassword, forgotPassword, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
