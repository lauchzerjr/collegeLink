import { PaginatedData, Post } from "../models/postModels";
import { postApi } from "../api/postApi";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../../user/models/userModels";
import { UserController } from "../../user/controllers/UserController";

const getPosts = async (
  nameCollection: string,
  startAfter?: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
): Promise<PaginatedData<Post>> => {
  const { data, lastVisible } = await postApi.getPosts(
    nameCollection,
    startAfter
  );

  const postsWithDetails: Post[] = await Promise.all(
    data.map(async (post: Post) => {
      const user = (await UserController.getUserInfos(
        post.userId
      )) as UserPostInfos;

      return {
        ...post,
        userId: post.userId,
        user: user,
      };
    })
  );

  return {
    data: postsWithDetails as Post[],
    lastVisible,
  };
};

export const PostController = {
  getPosts,
};
