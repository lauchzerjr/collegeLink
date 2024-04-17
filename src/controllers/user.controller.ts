import {
  UserPostCommentInfos,
  UserPostInfos,
  UserProfileInfo,
} from "../models/user.model";
import { userInfosApi } from "../services/user.service";

const getUserPostInfo = async (userId: string): Promise<UserPostInfos> => {
  const { name, userPhoto, createdAt, email } = await userInfosApi.getUserInfos(
    userId
  );
  return {
    name,
    email,
    userPhoto,
    createdAt,
  } as UserPostInfos;
};

const getUserPostCommentInfo = async (
  userId: string
): Promise<UserPostCommentInfos> => {
  const { name, userPhoto, createdAt } = await userInfosApi.getUserInfos(
    userId
  );
  return {
    name,
    userPhoto,
    createdAt,
  } as UserPostCommentInfos;
};

const getUserProfileInfo = async (userId: string): Promise<UserProfileInfo> => {
  const {
    name,
    city,
    linkedin,
    bio,
    userPhoto,
    email,
    createdAt,
    isEnabledCity,
  } = await userInfosApi.getUserInfos(userId);

  return {
    name,
    city,
    linkedin,
    bio,
    userPhoto,
    email,
    createdAt,
    isEnabledCity,
  } as UserProfileInfo;
};

export const UserController = {
  getUserPostCommentInfo,
  getUserPostInfo,
  getUserProfileInfo,
};
