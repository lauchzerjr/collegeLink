import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { UserProfileInfo } from "../models/user.model";

async function getUserInfos(
  userId: string
): Promise<UserProfileInfo | undefined> {
  const userDoc = await firestore()
    .collection("usersProfiles")
    .doc(userId)
    .get();

  if (userDoc.exists) {
    const userData = userDoc.data() as UserProfileInfo;
    return userData;
  }
}

async function updateFormProfile(
  user: FirebaseAuthTypes.User,
  name: string,
  city: string,
  linkedin: string,
  bio: string,
  email: string
): Promise<void> {
  await firestore().collection("usersProfiles").doc(user.uid).set(
    {
      userID: user.uid,
      name,
      city,
      linkedin,
      bio,
      email,
    },
    { merge: true }
  );
}

async function changeUserProfileCityToggle(
  user: FirebaseAuthTypes.User,
  isEnabledCity: boolean
): Promise<void> {
  await firestore().collection("usersProfiles").doc(user.uid).set(
    {
      userID: user.uid,
      isEnabledCity,
    },
    { merge: true }
  );
}

async function saveUserProfilePhoto(
  userId: string,
  url: string
): Promise<void> {
  firestore().collection("usersProfiles").doc(userId).update({
    userPhoto: url,
  });
}

async function uploadUserProfilePhoto(
  uri: string,
  userId: string
): Promise<{
  task: FirebaseStorageTypes.Task;
  ref: FirebaseStorageTypes.Reference;
}> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const imageName = `profile_images/user_id_${userId}/profile.jpg`;
  const ref = storage().ref().child(imageName);
  const task = ref.put(blob);

  return { task, ref };
}

export const userInfosApi = {
  getUserInfos,
  updateFormProfile,
  saveUserProfilePhoto,
  uploadUserProfilePhoto,
  changeUserProfileCityToggle,
};
