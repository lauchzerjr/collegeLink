import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

async function getUserInfos(
  userId: string
): Promise<FirebaseFirestoreTypes.DocumentData> {
  const userDoc = await firestore()
    .collection("usersProfiles")
    .doc(userId)
    .get();

  return userDoc.data();
}

async function changeUserProfileForm(
  user: FirebaseAuthTypes.User,
  name: string,
  city: string,
  linkedin: string,
  bio: string
): Promise<void> {
  await firestore().collection("usersProfiles").doc(user.uid).set(
    {
      userID: user.uid,
      name,
      city,
      linkedin,
      bio,
    },
    { merge: true }
  );
}

export const userInfosApi = {
  getUserInfos,
  changeUserProfileForm,
};
