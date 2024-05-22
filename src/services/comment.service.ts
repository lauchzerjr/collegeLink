import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Comment } from "../models/comment.model";
import { PaginatedData } from "../models/paginatedData.model";

async function getTotalCountComments({
  postId,
}: Pick<Comment, "postId">): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function getComments(
  postId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
): Promise<PaginatedData<FirebaseFirestoreTypes.DocumentData>> {
  let query = firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .orderBy("createdAt", "desc")
    .limit(10);

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  const querySnapchot = await query.get();

  const data = querySnapchot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    data,
    lastVisible:
      querySnapchot.docs.length > 0
        ? querySnapchot.docs[querySnapchot.docs.length - 1]
        : null,
  };
}

async function addComment(
  postId: string,
  userId: string,
  text: string
): Promise<FirebaseFirestoreTypes.DocumentData> {
  const commentRef = await firestore().collection("postComments").add({
    postId,
    userId,
    text,
    createdAt: new Date().toISOString(),
  });

  const commentDoc = await commentRef.get();
  return { id: commentRef.id, ...commentDoc.data() };
}

async function removeComment({ id }: Pick<Comment, "id">): Promise<void> {
  await firestore().collection("postComments").doc(id).delete();

  console.log("comentario removido com sucesso para o id", id);
}

export const commentApi = {
  getTotalCountComments,
  getComments,
  addComment,
  removeComment,
};
