import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../stores/useNameCollectionStore";
import { PostController } from "../../controllers/post.controller";
import { useController } from "./useController";
import { useInfiniteQuery } from "@tanstack/react-query";

type PageParamType = {
  pageParam: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
};

export const usePostList = () => {
  const postController = useController<PostController>("PostController");
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["post-list", nameCollection],
      queryFn: fetchPostList,
      initialPageParam: null,
      getNextPageParam: ({ lastVisible }) => lastVisible ?? null,
    });

  const posts = data?.pages.flatMap((page) => page.data) || [];

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
