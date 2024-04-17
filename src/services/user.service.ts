import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";

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
  changeUserProfileForm,
  saveUserProfilePhoto,
  uploadUserProfilePhoto,
  changeUserProfileCityToggle,
};
