import React, { createContext, ReactNode, useState } from "react";

export interface NameCollectionFirebaseProps {
  nameCollection: string;
  handleChangeNameCollection: (nameCourse: string) => void;
  courseName: string;
  handleChangeCourseName: (courseName: string) => void;
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

  const handleChangeNameCollection = (nameCollection: string) => {
    setNameCollection(nameCollection);
  };

  const handleChangeCourseName = (courseName: string) => {
    setCourseName(courseName);
  };

  return (
    <NameCollectionFirebaseContext.Provider
      value={{
        nameCollection,
        handleChangeNameCollection,
        courseName,
        handleChangeCourseName,
      }}
    >
      {children}
    </NameCollectionFirebaseContext.Provider>
  );
}

export { NameCollectionFirebaseContextProvider };
