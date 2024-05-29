import { postApi } from "../services/post.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../models/user.model";
import { UserProfileController } from "./user.controller";
import { LikeController } from "./like.controller";
import { DislikeController } from "./dislike.controller";
import { PostCommentController } from "./comment.controller";
import { CreatePost, Post } from "../models/post.model";

type PostResponse = {
  data: Post[];
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
};

export interface PostController {
  getPosts: (
    nameCollection: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => Promise<PostResponse>;
  createPost: ({
    nameCollection,
    userId,
    disciplinePost,
    subjectPost,
    textPost,
    photoPost,
  }: CreatePost) => Promise<FirebaseFirestoreTypes.DocumentData>;
}

export class PostControllerImpl implements PostController {
  constructor(
    private readonly userProfileController: UserProfileController,
    private readonly postCommentController: PostCommentController
  ) {}

  async getPosts(
    nameCollection: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ): Promise<PostResponse> {
    try {
      const { data, lastVisible } = await postApi.getPosts(
        nameCollection,
        startAfter
      );

      const postsWithDetails: Post[] = await Promise.all(
        data.map(async (post: Post) => {
          const user = (await this.userProfileController.getUserPostInfo(
            post.userId
          )) as UserPostInfos;

          const postLikes = await LikeController.getTotalCountPostLikes(
            post.id
          );
          const postDislikes =
            await DislikeController.getTotalCountDislikesPost(post.id);
          const postComments =
            await this.postCommentController.getTotalCountPostComments(post.id);

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
    } catch (error) {
      console.log(
        "onError",
        "Erro ao buscar posts. Tente novamente mais tarde"
      );
    }
  }

  async createPost({
    nameCollection,
    userId,
    disciplinePost,
    subjectPost,
    textPost,
    photoPost,
  }: CreatePost): Promise<FirebaseFirestoreTypes.DocumentData> {
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
      console.log("onError", "Erro ao criar post. Tente novamente mais tarde");
    }
  }
}
