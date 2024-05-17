import { PostController } from "../../presentation/controllers/post.controller";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../../presentation/stores/useNameCollectionStore";
import { usePaginatedList } from "../../presentation/hooks/usePaginatedList";

export const usePostList = () => {
  const { nameCollection } = useNameCollectionStore();

  const fetchPosts = async (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => {
    return await PostController.getPosts(nameCollection, startAfter);
  };

  return usePaginatedList(fetchPosts);
};
