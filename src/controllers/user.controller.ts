import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { userInfosApi } from "../services/user.service";
import {
  UserPostCommentInfos,
  UserPostInfos,
  UserProfileInfo,
} from "../models/user.model";

async function updateFormProfile(
  name: string,
  city: string,
  linkedin: string,
  bio: string,
  user: FirebaseAuthTypes.User
): Promise<string> {
  try {
    await userInfosApi.updateFormProfile(
      user,
      name,
      city,
      linkedin,
      bio,
      user.email
    );

    return "Perfil atualizado com sucesso";
  } catch (error) {
    return "Erro ao atualizar perfil";
  }
}

async function changeUserProfileCityToggle(
  isEnabledCity: boolean,
  user: FirebaseAuthTypes.User
): Promise<string> {
  try {
    await userInfosApi.changeUserProfileCityToggle(user, isEnabledCity);

    if (isEnabledCity) {
      return "Sua cidade será exibida para outros usuários";
    } else {
      return "Sua cidade não será exibida para outros usuários";
    }
  } catch (error) {
    return "Erro ao exibir cidade";
  }
}

async function getUserPostInfo(userId: string): Promise<UserPostInfos> {
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

async function getUserPostCommentInfo(
  userId: string
): Promise<UserPostCommentInfos> {
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

async function getUserProfileInfo(userId: string): Promise<UserProfileInfo> {
  try {
    const userData = await userInfosApi.getUserInfos(userId);

    return userData;
  } catch (error) {
    console.log("Erro ao exibir informações do usuário");
  }
}

export const userProfileController = {
  getUserPostCommentInfo,
  getUserPostInfo,
  getUserProfileInfo,
  changeUserProfileCityToggle,
  updateFormProfile,
};
