import firestore from "@react-native-firebase/firestore";
import { Like } from "../models/like.model";

async function getTotalCountLikes(postId: string): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function hasLiked({ postId, userId }: Like): Promise<boolean> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return querySnapshot.docs.length > 0;
}

async function addLike({ postId, userId }: Like): Promise<void> {
  await firestore().collection("postLikes").add({
    postId,
    userId,
  });

  console.log("Like adicionado com sucesso para o post", postId);
}

async function removeLike({ postId, userId }: Like): Promise<void> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  const likeDocId = querySnapshot.docs[0].id;
  await firestore().collection("postLikes").doc(likeDocId).delete();

  console.log("Like removido com sucesso para o post", postId);
}

export const likeApi = {
  getTotalCountLikes,
  hasLiked,
  addLike,
  removeLike,
};
