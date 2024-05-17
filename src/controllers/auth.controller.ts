import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { authApi } from "../services/auth.service";
import {
  AbstractSubscribableController,
  SubscribableController,
} from "./AbstractSubscribableController";
import { userInfosApi } from "../services/user.service";

export type AuthReducer = {
  onSuccessSignIn(response: FirebaseAuthTypes.User): void;
  onSuccessSignUp(response: string): void;
  onSuccessChangePassword(response: string): void;
  onSuccessForgotPassword(response: string): void;
  onError(msg: string): void;
  onLoading(): void;
};

export interface AuthController extends SubscribableController<AuthReducer> {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    user: FirebaseAuthTypes.User
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export class AuthControllerImpl
  extends AbstractSubscribableController<AuthReducer>
  implements AuthController
{
  constructor() {
    super();
  }

  async signOut(): Promise<void> {
    try {
      await authApi.signOut();
    } catch (error) {
      this.dispatch(
        "onError",
        "Erro ao fazer logout. Tente novamente mais tarde"
      );
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      this.dispatch("onLoading");

      const user = await authApi.signInWithEmailAndPassword(email, password);

      if (!user.emailVerified) {
        this.dispatch(
          "onError",
          "Por favor, verifique seu e-mail antes de fazer login"
        );

        return;
      }

      this.dispatch("onSuccessSignIn", user);
    } catch (error) {
      this.dispatch("onError", "E-mail ou senha inválidos");
    }
  }

  async signUp(name: string, email: string, password: string) {
    try {
      this.dispatch("onLoading");

      const user = await authApi.createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: name,
        });

        await user.sendEmailVerification();
      }

      await userInfosApi.updateFormProfile(user, name, "", "", "", user.email);
      await userInfosApi.changeUserProfileCityToggle(user, false);

      this.dispatch(
        "onSuccessSignUp",
        "E-mail de confirmação enviado com sucesso!\nPor favor, verifique seu e-mail"
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        this.dispatch("onError", "Esse endereço de e-mail já está em uso");
      }

      if (error.code === "auth/invalid-email") {
        this.dispatch("onError", "Esse endereço de e-mail é inválido");
      }

      if (error.code === "auth/weak-password") {
        this.dispatch("onError", "A senha deve ter no mínimo 8 caracteres");
      }
    }
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    user: FirebaseAuthTypes.User
  ) {
    try {
      this.dispatch("onLoading");

      await authApi.updatePassword(user.email, oldPassword, newPassword, user);

      this.dispatch("onSuccessChangePassword", "Senha alterada com sucesso");
    } catch (error) {
      if (error.code === "auth/invalid-login") {
        this.dispatch("onError", "Erro ao alterar a senha");
      }
    }
  }

  async forgotPassword(email: string) {
    try {
      this.dispatch("onLoading");

      authApi.forgotUserPassword(email);

      this.dispatch(
        "onSuccessForgotPassword",
        "Enviamos as instruções para seu e-mail"
      );
    } catch (error) {
      this.dispatch("onError", "Erro ao recuperar senha");
    }
  }
}
