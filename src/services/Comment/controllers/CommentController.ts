import { Comment } from "../models/commentModels";
import { commentApi } from "../api/commentApi";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const getComments = async (postId: string): Promise<Comment[]> => {
  return commentApi.getComments(postId);
};

export const CommentController = {
  getComments,
};
