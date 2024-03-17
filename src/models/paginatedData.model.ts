import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface PaginatedData<Data> {
  data: Data[];
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
}
