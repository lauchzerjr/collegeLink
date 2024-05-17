import { postApi } from "../../services/post.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../../models/user.model";
import { UserController } from "./user.controller";
import { LikeController } from "./like.controller";
import { DislikeController } from "./dislike.controller";
import { CommentController } from "./comment.controller";
import { PaginatedData } from "../../models/paginatedData.model";
import { CreatePost, Post } from "../../models/post.model";

const getPosts = async (
  nameCollection: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
): Promise<PaginatedData<Post>> => {
  const { data, lastVisible } = await postApi.getPosts(
    nameCollection,
    startAfter
  );

  const postsWithDetails: Post[] = await Promise.all(
    data.map(async (post: Post) => {
      const user = (await UserController.getUserPostInfo(
        post.userId
      )) as UserPostInfos;

      const postLikes = await LikeController.getTotalCountPostLikes(post.id);
      const postDislikes = await DislikeController.getTotalCountDislikesPost(
        post.id
      );
      const postComments = await CommentController.getTotalCountPostComments(
        post.id
      );

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
    data: postsWithDetails as Post[],
    lastVisible,
  };
};

const createPost = async ({
  nameCollection,
  userId,
  disciplinePost,
  subjectPost,
  textPost,
  photoPost,
}: CreatePost): Promise<void> => {
  postApi.createPost({
    nameCollection,
    userId,
    disciplinePost,
    subjectPost,
    textPost,
    photoPost,
  });
};

export const PostController = {
  getPosts,
  createPost,
};
