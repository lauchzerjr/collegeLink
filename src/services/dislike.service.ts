import firestore from "@react-native-firebase/firestore";
import { Dislikes } from "../models/dislike.model";

async function getTotalCountDislikes(postId: string): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function hasDisliked({ postId, userId }: Dislikes): Promise<boolean> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return querySnapshot.docs.length > 0;
}

async function addDislike({ postId, userId }: Dislikes): Promise<void> {
  await firestore().collection("postDislikes").add({
    postId: postId,
    userId: userId,
  });

  console.log("Dislike adicionado com sucesso para o post", postId);
}

async function removeDislike({ postId, userId }: Dislikes): Promise<void> {
  const querySnapshot = await firestore()
    .collection("postDislikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  const likeDocId = querySnapshot.docs[0].id;
  await firestore().collection("postDislikes").doc(likeDocId).delete();

  console.log("Dislike removido com sucesso para o post", postId);
}

export const dislikeApi = {
  getTotalCountDislikes,
  hasDisliked,
  addDislike,
  removeDislike,
};
