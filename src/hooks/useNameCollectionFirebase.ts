import { useContext } from "react";

import {
  NameCollectionFirebaseContext,
  NameCollectionFirebaseProps,
} from "../contexts/NameCollectionFirebase";

export function useNameCollectionFirebase(): NameCollectionFirebaseProps {
  const context = useContext(NameCollectionFirebaseContext);

  return context;
}
