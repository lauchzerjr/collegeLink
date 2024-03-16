import { UserPostInfos } from "../../models/user.model";
import { userInfosApi } from "../../api/user.api";

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
