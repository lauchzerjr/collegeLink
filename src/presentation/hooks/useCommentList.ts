import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useController } from "./useController";
import { PostCommentController } from "../../controllers/comment.controller";
import { useInfiniteQuery } from "@tanstack/react-query";

type PageParamType = {
  pageParam: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
};

export const usePostCommentList = (postId: string) => {
  const postCommentController = useController<PostCommentController>(
    "PostCommentController"
  );

  const fetchPostCommentList = async ({ pageParam = null }: PageParamType) => {
    const { data, lastVisible } = await postCommentController.getPostComments(
      postId,
      pageParam
    );

    return { data, lastVisible };
  };

  const {
    data: postCommentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["post-comment-list"],
    queryFn: fetchPostCommentList,
    initialPageParam: null,
    getNextPageParam: ({ lastVisible }) => lastVisible ?? null,
  });

  const postComments =
    postCommentsPages?.pages.flatMap((page) => page.data) || [];

  return {
    postComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
