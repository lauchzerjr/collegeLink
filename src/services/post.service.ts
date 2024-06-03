import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { PaginatedData } from "../models/paginatedData.model";
import { CreatePost, Post } from "../models/post.model";
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";

async function createPost({
  nameCollection,
  userId,
  disciplinePost,
  subjectPost,
  textPost,
  photoPost,
}: CreatePost): Promise<FirebaseFirestoreTypes.DocumentData> {
  const postRef = await firestore().collection(nameCollection).add({
    userId,
    disciplinePost,
    subjectPost,
    textPost,
    photoPost,
    createdAt: new Date().toISOString(),
  });

  const postDoc = await postRef.get();
  return { id: postRef.id, ...postDoc.data() };
}

async function uploadPostPhoto(
  uri: string,
  userId: string,
  nameCollection: string
): Promise<{
  task: FirebaseStorageTypes.Task;
  ref: FirebaseStorageTypes.Reference;
}> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const imageName = `post_images/nameCollection_{${nameCollection}}/user_id_${userId}.jpg`;
  const ref = storage().ref().child(imageName);
  const task = ref.put(blob);

  return { task, ref };
}

async function getPosts(
  nameCollection: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
): Promise<PaginatedData<FirebaseFirestoreTypes.DocumentData>> {
  let query = await firestore()
    .collection(nameCollection)
    .orderBy("createdAt", "desc")
    .limit(10);

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  const querySnapchot = await query.get();

  const data = await querySnapchot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    data: data as Post[],
    lastVisible: querySnapchot.docs[querySnapchot.docs.length - 1] || null,
  };
}

async function deletePost(
  nameCollection: string,
  postId: string
): Promise<void> {
  await firestore().collection(nameCollection).doc(postId).delete();
}

async function updatePost(
  nameCollection: string,
  postId: string,
  updatedData: Partial<CreatePost>
): Promise<void> {
  await firestore()
    .collection(nameCollection)
    .doc(postId)
    .update({
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
}

export const postApi = {
  createPost,
  uploadPostPhoto,
  getPosts,
  deletePost,
  updatePost,
};
