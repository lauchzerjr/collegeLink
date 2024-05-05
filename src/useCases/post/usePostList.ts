import { PostController } from "../../controllers/post.controller";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../../stores/useNameCollectionStore";

export const usePostList = () => {
  const { nameCollection } = useNameCollectionStore();

  const fetchPosts = async (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => {
    return await PostController.getPosts(nameCollection, startAfter);
  };

  return usePaginatedList(fetchPosts);
};
