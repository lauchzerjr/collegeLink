import firestore from "@react-native-firebase/firestore";
import { Dislikes } from "../models/DislikesModels";

async function getTotalCountDislikesPost(postId: string): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function hasDislikedPost({ postId, userId }: Dislikes): Promise<boolean> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return querySnapshot.docs.length > 0;
}

async function setDislikePost({ postId, userId }: Dislikes): Promise<void> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  if (querySnapshot.docs.length > 0) {
    const likeDocId = querySnapshot.docs[0].id;
    await firestore().collection("postDislikes").doc(likeDocId).delete();
    console.log("Dislike removido com sucesso para o post", postId);
    return;
  }

  await firestore().collection("postDislikes").add({
    postId: postId,
    userId: userId,
  });

  console.log("Dislike adicionado com sucesso para o post", postId);
}

export const dislikesApi = {
  getTotalCountDislikesPost,
  hasDislikedPost,
  setDislikePost,
};
