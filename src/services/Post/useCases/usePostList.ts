import { useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { PostController } from "../controllers/PostController";
import { Post } from "../models/postModels";
import { useNameCollectionFirebase } from "../../../hooks/useNameCollectionFirebase";

export const usePostList = () => {
  const { nameCollection } = useNameCollectionFirebase();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [startAfter, setStartAfter] =
    useState<FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null>(
      null
    );
  const [lastPost, setLastPost] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const { data, lastVisible } = await PostController.getPosts(
        nameCollection
      );

      setPosts(data);
      setStartAfter(lastVisible);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    try {
      setLoading(true);
      if (!lastPost && startAfter !== null) {
        const { data, lastVisible } = await PostController.getPosts(
          nameCollection,
          startAfter
        );

        setPosts((prev) => [...prev, ...data]);
        setStartAfter(lastVisible);
        if (data.length < 2) {
          setLastPost(true);
        }
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [nameCollection]);

  return { posts, fetchPosts, fetchMorePosts, loading, lastPost, startAfter };
};
