import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Like } from "../models/likeModels";

async function getTotalCountLikesPost(postId: string): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function setLikePost({ postId, userId }: Like): Promise<void> {
  const querySnapshot = await firestore().collection("postLikes").add({
    userId,
    postId,
  });
}

export const likesApi = {
  getTotalCountLikesPost,
  setLikePost,
};
