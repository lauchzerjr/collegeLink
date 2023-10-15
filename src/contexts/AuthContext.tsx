import React, { ReactNode, createContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
      }

      console.log("User register ==>", user.displayName);

      // Envie o e-mail de verificação
      await user.sendEmailVerification();
      console.log("E-mail de confirmação enviado.");

      // Verifique o status de verificação do e-mail
      if (!user.emailVerified) {
        console.log("Por favor, verifique seu e-mail antes de fazer login.");
        setUser(user);
      }
    } catch (error: any) {
      console.error("Erro ao criar um usuario ==>", error);
      if (error.code === "auth/email-already-in-use") {
        console.log("Esse endereço de e-mail já está em uso!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("Esse endereço de e-mail é inválido!");
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
      console.log("User ==>", user);
      setUser(user);
    } catch (error) {
      console.log("ERRROO ==>", error);
      throw new Error("Erro ao fazer login. Verifique suas credenciais.");
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
    setIsLoading(true)
    const storage = await auth().onAuthStateChanged(setUser)
    setIsLoading(false)
    
    return storage;
  }

  useEffect(() => {
    loadUserStorageData()
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
