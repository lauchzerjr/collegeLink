import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNameCollectionStore } from "../stores/useNameCollectionStore";
import { PostController } from "../../controllers/post.controller";
import { useController } from "./useController";
import { useEffect, useState } from "react";
import { useToastStore } from "../stores/useToastStore";
import { Post } from "../../models/post.model";
// import { useShallow } from "zustand/react/shallow";
// import { usePostStore } from "../stores/postStore";

export const usePostList = () => {
  const postController = useController<PostController>("PostController");
  const showToast = useToastStore((state) => state.showToast);
  const nameCollection = useNameCollectionStore(
    (state) => state.nameCollection
  );

  // const { startAfter, setStartAfter } = usePostStore(
  //   useShallow((state) => ({
  //     startAfter: state.startAfter,
  //     setStartAfter: state.setStartAfter,
  //   }))
  // );

  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [startAfter, setStartAfter] =
    useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null>(
      null
    );
  const [lastItem, setLastItem] = useState(false);

  useEffect(() => {
    const unsubscribe = postController.subscribe({
      onSuccessGetPosts: (result) => {
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

    postController.getPosts(nameCollection, startAfter);

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      if (!lastItem && startAfter !== null) {
        await postController.getPosts(nameCollection, startAfter);
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
