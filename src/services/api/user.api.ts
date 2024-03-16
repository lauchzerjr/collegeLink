import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

async function getUsersInfos(
  userId: string
): Promise<FirebaseFirestoreTypes.DocumentData> {
  const userDoc = await firestore()
    .collection("usersProfiles")
    .doc(userId)
    .get();

  return userDoc.data();
}

export const userInfosApi = {
  getUsersInfos,
};
