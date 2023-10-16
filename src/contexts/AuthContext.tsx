import React, { ReactNode, createContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useToast } from "../hooks/useToast";

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
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: name,
        });
        // Envie o e-mail de verificação
        await user.sendEmailVerification();
        console.log("E-mail de confirmação enviado com sucesso!");
        addToast({
          message:
            "E-mail de confirmação enviado com sucesso!\nPor favor, verifique seu e-mail",
          type: "success",
        });
      }
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
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      if (!user.emailVerified) {
        addToast({
          message: "Por favor, verifique seu e-mail antes de fazer login!",
          type: "error",
        });
        console.log("Por favor, verifique seu e-mail antes de fazer login.");
      }

      console.log("User ==>", user);
      setUser(user);
    } catch (error) {
      console.log("ERRROO ==>", error);
      addToast({
        message: "E-mail ou senha inválidos!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw new Error("Erro ao fazer logout. Tente novamente mais tarde.");
    }
  };

  async function loadUserStorageData() {
    setIsLoading(true);
    const storage = await auth().onAuthStateChanged(setUser);
    setIsLoading(false);

    return storage;
  }

  useEffect(() => {
    loadUserStorageData();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
