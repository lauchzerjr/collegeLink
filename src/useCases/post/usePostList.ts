import { PostController } from "../../controllers/post.controller";
import { useNameCollectionFirebase } from "../../hooks/useNameCollectionFirebase";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const usePostList = () => {
  const { nameCollection } = useNameCollectionFirebase();

  const fetchPosts = async (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => {
    return await PostController.getPosts(nameCollection, startAfter);
  };

  return usePaginatedList(fetchPosts);
};
