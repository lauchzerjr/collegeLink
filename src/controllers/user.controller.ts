import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  AbstractSubscribableController,
  SubscribableController,
} from "./AbstractSubscribableController";
import { userInfosApi } from "../services/user.service";
import {
  UserPostCommentInfos,
  UserPostInfos,
  UserProfileInfo,
} from "../models/user.model";

export type UserProfileReducer = {
  onSuccessGetUserProfileInfo(response: UserProfileInfo): void;
  onSuccessChangeUserProfileCityToggle(response: string): void;
  onSuccessUpdateFormProfile(response: string): void;
  onError(msg: string): void;
  onLoadingScreenProfile(): void;
  onLoadingUpdateFormProfile(): void;
};

export interface UserProfileController
  extends SubscribableController<UserProfileReducer> {
  updateFormProfile: (
    name: string,
    city: string,
    linkedin: string,
    bio: string,
    user: FirebaseAuthTypes.User
  ) => Promise<void>;
  changeUserProfileCityToggle: (
    isEnabledCity: boolean,
    user: FirebaseAuthTypes.User
  ) => Promise<void>;
  getUserPostInfo: (userId: string) => Promise<UserPostInfos>;
  getUserPostCommentInfo: (userId: string) => Promise<UserPostCommentInfos>;
  getUserProfileInfo: (userId: string) => Promise<void>;
}

export class UserProfileControllerImpl
  extends AbstractSubscribableController<UserProfileReducer>
  implements UserProfileController
{
  constructor() {
    super();
  }

  async updateFormProfile(
    name: string,
    city: string,
    linkedin: string,
    bio: string,
    user: FirebaseAuthTypes.User
  ) {
    try {
      this.dispatch("onLoadingUpdateFormProfile");

      await userInfosApi.updateFormProfile(
        user,
        name,
        city,
        linkedin,
        bio,
        user.email
      );

      this.dispatch(
        "onSuccessUpdateFormProfile",
        "Perfil atualizado com sucesso"
      );
    } catch (error) {
      this.dispatch("onError", "Erro ao atualizar perfil");
    }
  }

  async changeUserProfileCityToggle(
    isEnabledCity: boolean,
    user: FirebaseAuthTypes.User
  ) {
    try {
      await userInfosApi.changeUserProfileCityToggle(user, isEnabledCity);

      if (isEnabledCity) {
        this.dispatch(
          "onSuccessChangeUserProfileCityToggle",
          "Sua cidade será exibida para outros usuários"
        );
      } else {
        this.dispatch(
          "onError",
          "Sua cidade não será exibida para outros usuários"
        );
      }
    } catch (error) {
      this.dispatch("onError", "Erro ao exibir cidade");
    }
  }

  async getUserPostInfo(userId: string): Promise<UserPostInfos> {
    try {
      const { name, userPhoto, createdAt, email } =
        await userInfosApi.getUserInfos(userId);

      return {
        name,
        email,
        userPhoto,
        createdAt,
      } as UserPostInfos;
    } catch (error) {
      console.log("Erro ao trazer informacoes dos usuarios no post: ", error);
    }
  }

  async getUserPostCommentInfo(userId: string): Promise<UserPostCommentInfos> {
    try {
      const { name, userPhoto, createdAt } = await userInfosApi.getUserInfos(
        userId
      );
      return {
        name,
        userPhoto,
        createdAt,
      } as UserPostCommentInfos;
    } catch (error) {
      console.log(
        "Erro ao trazer informacoes dos usuarios nos comentarios do post: ",
        error
      );
    }
  }

  async getUserProfileInfo(userId: string): Promise<void> {
    try {
      this.dispatch("onLoadingScreenProfile");

      const userData = await userInfosApi.getUserInfos(userId);

      this.dispatch("onSuccessGetUserProfileInfo", userData);
    } catch (error) {
      this.dispatch("onError", "Erro ao exibir informações do usuário");
    }
  }
}
