import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { PaginatedData } from "../models/postModels";

async function getPosts(
  nameCollection: string,
  startAfter?: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData | null>
): Promise<PaginatedData<FirebaseFirestoreTypes.DocumentData>> {
  let query = await firestore()
    .collection(nameCollection)
    // .orderBy("createdAt")
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

export const postApi = {
  getPosts,
};
