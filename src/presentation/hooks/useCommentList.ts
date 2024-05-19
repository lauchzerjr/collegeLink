import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useController } from "./useController";
import { PostCommentController } from "../../controllers/comment.controller";
import { useEffect, useState } from "react";
import { useToastStore } from "../stores/useToastStore";
import { Comment } from "../../models/comment.model";
import { usePaginatedList } from "./usePaginatedList";
import { useShallow } from "zustand/react/shallow";
import { usePostStore } from "../stores/postStore";

export const usePostCommentList = (postId: string) => {
  const postCommentController = useController<PostCommentController>(
    "PostCommentController"
  );

  // const { addPostComments, postComments } = usePostStore(
  //   useShallow((state) => ({
  //     addPostComments: state.addPostComments,
  //     postComments: state.postComments,
  //   }))
  // );

  // const fetchPostComments = async (
  //   startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
  // ) => {
  //   return await postCommentController.getPostComments(postId, startAfter);
  // };

  // return usePaginatedList(fetchPostComments, addPostComments);

  const showToast = useToastStore((state) => state.showToast);
  // const { postComments, addPostComments } = usePostStore(
  //   useShallow((state) => ({
  //     postComments: state.postComments,
  //     addPostComments: state.addPostComments,
  //   }))
  // );

  const [data, setData] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [startAfter, setStartAfter] =
    useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null>(
      null
    );
  const [lastItem, setLastItem] = useState(false);

  useEffect(() => {
    const unsubscribe = postCommentController.subscribe({
      onSuccessGetPostComments: (result) => {
        console.log("🚀 ~ useEffect ~ result:", result);
        const { data, lastVisible } = result;

        setData((prevData) => {
          if (lastItem) {
            return data;
          }
          return [...prevData, ...data];
        });

        setStartAfter(lastVisible);
        setLoading(false);
      },
      onError: (error) => {
        showToast({
          message: error,
          type: "error",
        });
        setLoading(false);
      },
      onLoading: () => {
        console.log("loadinggggg");
        setLoading(true);
      },
    });

    postCommentController.getPostComments(postId, startAfter);

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      if (!lastItem && startAfter !== null) {
        await postCommentController.getPostComments(postId, startAfter);
        if (data.length < 10) {
          setLastItem(true);
        }
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    fetchMoreData,
    loading,
    lastItem,
    startAfter,
  };
};
