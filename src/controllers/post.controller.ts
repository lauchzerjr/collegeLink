import { postApi } from "../services/post.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostInfos } from "../models/user.model";
import { UserProfileController } from "./user.controller";
import { LikeController } from "./like.controller";
import { DislikeController } from "./dislike.controller";
import { PostCommentController } from "./comment.controller";
import { PaginatedData } from "../models/paginatedData.model";
import { CreatePost, Post } from "../models/post.model";
import {
  AbstractSubscribableController,
  SubscribableController,
} from "./AbstractSubscribableController";

type PostResponse = {
  data: Post[];
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
};

export type PostReducer = {
  onSuccessGetPosts(response: PostResponse): void;
  onError(msg: string): void;
  onLoading(): void;
};

export interface PostController extends SubscribableController<PostReducer> {
  getPosts: (
    nameCollection: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
  ) => Promise<void>;
  createPost: ({
    nameCollection,
    userId,
    disciplinePost,
    subjectPost,
    textPost,
    photoPost,
  }: CreatePost) => Promise<void>;
}

export class PostControllerImpl
  extends AbstractSubscribableController<PostReducer>
  implements PostController
{
  constructor(
    private readonly userProfileController: UserProfileController,
    private readonly postCommentController: PostCommentController
  ) {
    super();
  }

  async getPosts(
    nameCollection: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
  ): Promise<void> {
    try {
      this.dispatch("onLoading");

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

      this.dispatch("onSuccessGetPosts", {
        data: postsWithDetails as Post[],
        lastVisible,
      });
    } catch (error) {
      this.dispatch(
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
  }: CreatePost): Promise<void> {
    try {
      this.dispatch("onLoading");

      await postApi.createPost({
        nameCollection,
        userId,
        disciplinePost,
        subjectPost,
        textPost,
        photoPost,
      });
    } catch (error) {
      this.dispatch(
        "onError",
        "Erro ao criar post. Tente novamente mais tarde"
      );
    }
  }
}
