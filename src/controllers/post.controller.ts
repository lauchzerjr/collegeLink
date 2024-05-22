import { postApi } from "../services/post.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../models/user.model";
import { LikeController } from "./like.controller";
import { DislikeController } from "./dislike.controller";
import { CreatePost, Post } from "../models/post.model";
import { userProfileController } from "./user.controller";
import { postCommentController } from "./comment.controller";

async function getPosts(
  nameCollection: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
) {
  try {
    const { data, lastVisible } = await postApi.getPosts(
      nameCollection,
      startAfter
    );

    const postsWithDetails: Post[] = await Promise.all(
      data.map(async (post: Post) => {
        const user = (await userProfileController.getUserPostInfo(
          post.userId
        )) as UserPostInfos;

        const postLikes = await LikeController.getTotalCountPostLikes(post.id);
        const postDislikes = await DislikeController.getTotalCountDislikesPost(
          post.id
        );
        const postComments =
          await postCommentController.getTotalCountPostComments(post.id);

        return {
          ...post,
          userId: post.userId,
          user,
          postLikes,
          postDislikes,
          postComments,
        };
      })
    );

    return {
      data: postsWithDetails,
      lastVisible,
    };
  } catch (error) {
    console.log("Erro ao buscar posts. Tente novamente mais tarde");
  }
}

async function createPost({
  nameCollection,
  userId,
  disciplinePost,
  subjectPost,
  textPost,
  photoPost,
}: CreatePost) {
  try {
    return postApi.createPost({
      nameCollection,
      userId,
      disciplinePost,
      subjectPost,
      textPost,
      photoPost,
    });
  } catch (error) {
    console.log("Erro ao criar post. Tente novamente mais tarde");
  }
}

export const postController = {
  createPost,
  getPosts,
};
