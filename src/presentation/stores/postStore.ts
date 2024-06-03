import { create } from "zustand";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Comment } from "../../models/comment.model";
import { Post } from "../../models/post.model";

type PostState = {
  // startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
  // posts: Post[];
  postComments: Comment[];
};

type PostActions = {
  // setStartAfter: (
  //   startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  // ) => void;
  addPostComments: (posts: Comment[]) => void;
  addNewPostComment: (postComments: Comment) => void;
};

export const usePostStore = create<PostState & PostActions>((set) => ({
  // startAfter: null,
  // setStartAfter: (
  //   startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  // ) => set((state) => ({ ...state, startAfter })),
  // posts: [],
  addPostComments: (postComments: Comment[]) =>
    set((state) => ({
      postComments: [...state.postComments, ...postComments],
    })),
  postComments: [],
  addNewPostComment: (newPostComment: Comment) =>
    set((state) => ({ postComments: [...state.postComments, newPostComment] })),
}));

// addPosts: (newPosts: Post[]) => set((state) => ({ posts: [...state.posts, ...newPosts] })),
//   addPost: (post: Post) => set((state) => ({ posts: [...state.posts, post] })),
