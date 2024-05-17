import { usePaginatedList } from "../../presentation/hooks/usePaginatedList";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { CommentController } from "../../presentation/controllers/comment.controller";

export const usePostCommentList = (postId: string) => {
  const fetchPostComments = async (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => {
    return await CommentController.getPostComments(postId, startAfter);
  };

  return usePaginatedList(fetchPostComments);
};
