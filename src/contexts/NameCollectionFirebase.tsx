import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface NameCollectionFirebaseProps {
  nameCollection: string;
  setNameCollection: Dispatch<SetStateAction<string>>;
  courseName: string;
  setCourseName: Dispatch<SetStateAction<string>>;
}

type NameCollectionFirebaseProviderProps = {
  children: ReactNode;
};

export const NameCollectionFirebaseContext = createContext(
  {} as NameCollectionFirebaseProps
);

function NameCollectionFirebaseContextProvider({
  children,
}: NameCollectionFirebaseProviderProps) {
  const [nameCollection, setNameCollection] = useState("");
  const [courseName, setCourseName] = useState("");

  return (
    <NameCollectionFirebaseContext.Provider
      value={{
        nameCollection,
        setNameCollection,
        courseName,
        setCourseName,
      }}
    >
      {children}
    </NameCollectionFirebaseContext.Provider>
  );
}

export { NameCollectionFirebaseContextProvider };
