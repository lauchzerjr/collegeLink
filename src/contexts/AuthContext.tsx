import React, { ReactNode, createContext, useEffect, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useToast } from "../hooks/useToast";
import { Keyboard } from "react-native";
import { authApi } from "../services/auth.service";
import { userInfosApi } from "../services/user.service";

export interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  createUserWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();

  const createUserWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);

      const user = await authApi.createUserWithEmailAndPassword(
        name,
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: name,
        });

        await user.sendEmailVerification();
      }

      await userInfosApi.changeUserProfileForm(user, name, "", "", "");

      addToast({
        message:
          "E-mail de confirmação enviado com sucesso!\nPor favor, verifique seu e-mail",
        type: "success",
      });
    } catch (error) {
      console.log("Erro ao criar um usuario ==>", error);

      if (error.code === "auth/email-already-in-use") {
        console.log("Esse endereço de e-mail já está em uso!");
        addToast({
          message: "Esse endereço de e-mail já está em uso!",
          type: "error",
        });
      }

      if (error.code === "auth/invalid-email") {
        console.log("Esse endereço de e-mail é inválido!");
        addToast({
          message: "Esse endereço de e-mail é inválido!",
          type: "error",
        });
      }

      if (error.code === "auth/weak-password") {
        console.log("Esse endereço de e-mail é inválido!");
        addToast({
          message: "A senha deve ter no mínimo 6 caracteres!",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);

      const user = await authApi.signInWithEmailAndPassword(email, password);

      if (!user.emailVerified) {
        addToast({
          message: "Por favor, verifique seu e-mail antes de fazer login!",
          type: "error",
        });

        return;
      }

      console.log("User ==>", user);
      setUser(user);
    } catch (error) {
      console.log("Não foi possivel fazer o login ==>", error);
      addToast({
        message: "E-mail ou senha inválidos!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();
      await setUser(null);
    } catch (error) {
      throw new Error("Erro ao fazer logout. Tente novamente mais tarde.");
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);

      await authApi.changeUserPassword(
        user.email,
        oldPassword,
        newPassword,
        user
      );

      addToast({
        message: "Senha alterada com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.log("Erro ao alterar a senha:", error);

      if (error.code === "auth/invalid-login") {
        addToast({
          message: "Erro ao alterar a senha!",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);

      authApi.forgotUserPassword(email);

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

  async function loadUserStorageData() {
    setIsLoading(true);
    const storage = authApi.loadUserStorageData(setUser);
    setIsLoading(false);

    return storage;
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        changePassword,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
