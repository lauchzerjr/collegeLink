import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../stores/useNameCollectionStore";
import { PostController } from "../../controllers/post.controller";
import { useController } from "./useController";
import { useToastStore } from "../stores/useToastStore";
import { useInfiniteQuery } from "@tanstack/react-query";

type PageParamType = {
  pageParam: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
};

export const usePostList = () => {
  const postController = useController<PostController>("PostController");
  const showToast = useToastStore((state) => state.showToast);
  const nameCollection = useNameCollectionStore(
    (state) => state.nameCollection
  );

  const fetchPostList = async ({ pageParam = null }: PageParamType) => {
    const { data, lastVisible } = await postController.getPosts(
      nameCollection,
      pageParam
    );

    return { data, lastVisible };
  };

  const {
    data: postsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["post-list", nameCollection],
    queryFn: fetchPostList,
    initialPageParam: null,
    getNextPageParam: ({ lastVisible }) => lastVisible ?? null,
  });

  const posts = postsPages?.pages.flatMap((page) => page.data) || [];

  return {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loading: isLoading,
  };
};
