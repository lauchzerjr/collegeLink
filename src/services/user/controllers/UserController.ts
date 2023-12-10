import { UserPostInfos } from "../models/userModels";
import { userInfosApi } from "../api/userApi";

const getUserInfos = async (userId: string): Promise<UserPostInfos> => {
  const { name, email, userPhoto } = await userInfosApi.getUsersInfos(userId);
  return {
    name,
    email,
    userPhoto,
  };
};

export const UserController = {
  getUserInfos,
};
