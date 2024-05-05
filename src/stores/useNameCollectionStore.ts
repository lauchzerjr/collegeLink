import { create } from "zustand";

type NameCollectionState = {
  nameCollection: string;
  courseName: string;
};

type NameCollectionActions = {
  handleChangeNameCollection: (nameCollection: string) => void;
  handleChangeCourseName: (courseName: string) => void;
};

export const useNameCollectionStore = create<
  NameCollectionState & NameCollectionActions
>((set) => ({
  nameCollection: "",
  handleChangeNameCollection: (nameCollection) => set({ nameCollection }),
  courseName: "",
  handleChangeCourseName: (courseName) => set({ courseName }),
}));
