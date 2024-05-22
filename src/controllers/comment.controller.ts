import { Comment } from "../models/comment.model";
import { commentApi } from "../services/comment.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { UserPostCommentInfos } from "../models/user.model";
import {
  AbstractSubscribableController,
  SubscribableController,
} from "./AbstractSubscribableController";
import { UserProfileController } from "./user.controller";

export type PostCommentResult = {
  data: Comment[];
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
};

export type PostCommentReducer = {
  onSuccessGetPostComments(response: {
    data: Comment[];
    lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
  }): void;
  onError(msg: string): void;
  onLoading(): void;
};

export interface PostCommentController
  extends SubscribableController<PostCommentReducer> {
  getTotalCountPostComments: (postId: string) => Promise<number>;
  getPostComments: (
    postId: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => Promise<void>;
  addPostComment: (
    postId: string,
    userId: string,
    text: string
  ) => Promise<void>;
  removePostComment: (id: string) => Promise<void>;
}

export class PostCommentControllerImpl
  extends AbstractSubscribableController<PostCommentReducer>
  implements PostCommentController
{
  constructor(private readonly userProfileController: UserProfileController) {
    super();
  }

  async getTotalCountPostComments(postId: string): Promise<number> {
    try {
      const result = await commentApi.getTotalCountComments({ postId });

      return result;
    } catch (error) {
      console.log("🚀 ~ getTotalCountPostComments ~ error:", error);
    }
  }

  async getPostComments(
    postId: string,
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ): Promise<void> {
    // ): Promise<PostCommentResult> {
    try {
      this.dispatch("onLoading");

      const { data, lastVisible } = await commentApi.getComments(
        postId,
        startAfter
      );

      const postCommentsWithDetails: Comment[] = await Promise.all(
        data.map(async (postComments: Comment) => {
          const user = (await this.userProfileController.getUserPostCommentInfo(
            postComments.userId
          )) as UserPostCommentInfos;

          return {
            ...postComments,
            userId: postComments.userId,
            user,
          };
        })
      );
      console.log("🚀 ~ postCommentsWithDetails:", postCommentsWithDetails);

      this.dispatch("onSuccessGetPostComments", {
        data: postCommentsWithDetails as Comment[],
        lastVisible,
      });
    } catch (error) {
      this.dispatch(
        "onError",
        "Erro ao buscar comentários. Tente novamente mais tarde"
      );
    }
  }

  async addPostComment(
    postId: string,
    userId: string,
    text: string
  ): Promise<void> {
    try {
      this.dispatch("onLoading");
      await commentApi.addComment(postId, userId, text);
    } catch (error) {
      this.dispatch(
        "onError",
        "Erro ao adicionar comentário. Tente novamente mais tarde"
      );
    }
  }

  async removePostComment(id: string): Promise<void> {
    try {
      this.dispatch("onLoading");
      await commentApi.removeComment({ id });
    } catch (error) {
      this.dispatch(
        "onError",
        "Erro ao remover comentário. Tente novamente mais tarde"
      );
    }
  }
}
