import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

async function getComments(postId: string): Promise<Comment[]> {
  const querySnapshot = await firestore()
    .collection("postComments")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export const commentApi = {
  getComments,
};
