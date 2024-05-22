import { postController } from "../../controllers/post.controller";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../stores/useNameCollectionStore";
import { usePaginatedList } from "./usePaginatedList";

export const usePostList = () => {
  const { nameCollection } = useNameCollectionStore();

  const fetchPosts = async (
    startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  ) => {
    return await postController.getPosts(nameCollection, startAfter);
  };

  return usePaginatedList(fetchPosts);
};
