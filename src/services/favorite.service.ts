import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { PaginatedData } from "../models/paginatedData.model";
import { postApi } from "./post.service";
import { userInfosApi } from "./user.service";
import { LikeController } from "../controllers/like.controller";
import { DislikeController } from "../controllers/dislike.controller";
import { commentApi } from "./comment.service";

async function hasFavorite(postId: string, userId: string): Promise<boolean> {
  const querySnapshot = await firestore()
    .collection("favoritePosts")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return querySnapshot.docs.length > 0;
}

async function addFavorite(
  postId: string,
  userId: string,
  collectionName: string
): Promise<FirebaseFirestoreTypes.DocumentData> {
  const commentRef = await firestore().collection("favoritePosts").add({
    postId,
    userId,
    collectionName,
    createdAt: new Date().toISOString(),
  });

  const commentDoc = await commentRef.get();
  return { id: commentRef.id, ...commentDoc.data() };
}

async function removeFavorite(postId: string, userId: string): Promise<void> {
  const querySnapshot = await firestore()
    .collection("favoritePosts")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  const favoriteDocId = querySnapshot.docs[0].id;
  await firestore().collection("favoritePosts").doc(favoriteDocId).delete();
}

async function getFavoriteList(
  userId: string,
  startAfter: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null
): Promise<PaginatedData<FirebaseFirestoreTypes.DocumentData>> {
  let query = await firestore()
    .collection("favoritePosts")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(10);

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  const favoriteSnapshot = await query.get();

  const favoritePosts = favoriteSnapshot.docs.map((doc) => ({
    postId: doc.data().postId,
    collectionName: doc.data().collectionName,
  }));

  if (favoritePosts.length === 0) {
    return { data: [], lastVisible: null };
  }

  const postsWithDetailsPromises = favoritePosts.map(
    async ({ postId, collectionName }) => {
      const { data } = await postApi.getPosts(collectionName, null);
      const post = data.find((post) => post.id === postId);

      if (!post) return null;

      const user = await userInfosApi.getUserInfos(post.userId);
      const postLikes = await LikeController.getTotalCountPostLikes(post.id);
      const postDislikes = await DislikeController.getTotalCountDislikesPost(
        post.id
      );
      const postComments = await commentApi.getTotalCountComments({ postId });

      return {
        ...post,
        userId: post.userId,
        user,
        postLikes,
        postDislikes,
        postComments,
      };
    }
  );

  const postsWithDetails = await Promise.all(postsWithDetailsPromises);

  const filteredPostsWithDetails = postsWithDetails.filter(
    (post) => post !== null
  );

  return {
    data: filteredPostsWithDetails,
    lastVisible:
      favoriteSnapshot.docs[favoriteSnapshot.docs.length - 1] || null,
  };
}

export const favoriteApi = {
  hasFavorite,
  addFavorite,
  getFavoriteList,
  removeFavorite,
};
