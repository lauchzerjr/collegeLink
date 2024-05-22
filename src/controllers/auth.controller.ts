import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { authApi } from "../services/auth.service";
import { userInfosApi } from "../services/user.service";

async function signOut(): Promise<void> {
  try {
    await authApi.signOut();
  } catch (error) {
    console.log("Erro ao fazer logout. Tente novamente mais tarde");
  }
}

async function signIn(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User | string> {
  try {
    const user = await authApi.signInWithEmailAndPassword(email, password);

    if (!user.emailVerified) {
      return "Por favor, verifique seu e-mail antes de fazer login";
    }

    return user;
  } catch (error) {
    return "E-mail ou senha inválidos";
  }
}

async function signUp(
  name: string,
  email: string,
  password: string
): Promise<string> {
  try {
    const user = await authApi.createUserWithEmailAndPassword(email, password);

    if (user) {
      await user.updateProfile({
        displayName: name,
      });

      await user.sendEmailVerification();
    }

    await userInfosApi.updateFormProfile(user, name, "", "", "", user.email);
    await userInfosApi.changeUserProfileCityToggle(user, false);

    return "E-mail de confirmação enviado com sucesso!\nPor favor, verifique seu e-mail";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return "Esse endereço de e-mail já está em uso";
    }

    if (error.code === "auth/invalid-email") {
      return "Esse endereço de e-mail é inválido";
    }

    if (error.code === "auth/weak-password") {
      return "A senha deve ter no mínimo 8 caracteres";
    }
  }
}

async function changePassword(
  oldPassword: string,
  newPassword: string,
  user: FirebaseAuthTypes.User
): Promise<string> {
  try {
    await authApi.updatePassword(user.email, oldPassword, newPassword, user);

    return "Senha alterada com sucesso";
  } catch (error) {
    if (error.code === "auth/invalid-login") {
      return "Erro ao alterar a senha";
    }
  }
}

async function forgotPassword(email: string): Promise<string> {
  try {
    authApi.forgotUserPassword(email);

    return "Enviamos as instruções para seu e-mail";
  } catch (error) {
    return "Erro ao recuperar senha";
  }
}

export const authController = {
  signOut,
  signIn,
  signUp,
  changePassword,
  forgotPassword,
};
