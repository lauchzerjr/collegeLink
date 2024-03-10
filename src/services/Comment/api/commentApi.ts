import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Comment } from "../models/commentModels";
import { PaginatedData } from "../../Post/models/postModels";

async function getTotalCountPostComments({
  postId,
}: Pick<Comment, "postId">): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function getPostComments(
  postId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
): Promise<PaginatedData<FirebaseFirestoreTypes.DocumentData>> {
  let query = await firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .orderBy("createdAt", "desc")
    .limit(2);

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  const querySnapchot = await query.get();

  const data = await querySnapchot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("data", data);

  return {
    data,
    lastVisible: querySnapchot.docs[querySnapchot.docs.length - 1] || null,
  };
}

async function setPostComment({
  postId,
  userId,
  text,
}: Omit<Comment, "id">): Promise<void> {
  await firestore().collection("postComments").add({
    postId,
    userId,
    text,
  });

  console.log("Dislike adicionado com sucesso para o post", postId);
}

async function removePostComment({ id }: Pick<Comment, "id">): Promise<void> {
  await firestore().collection("postComments").doc(id).delete();

  console.log("comentario removido com sucesso para o id", id);
}

export const commentApi = {
  getTotalCountPostComments,
  getPostComments,
  setPostComment,
  removePostComment,
};
