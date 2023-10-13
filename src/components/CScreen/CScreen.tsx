import React from "react";
import { CBox } from "../CBox/CBox";

interface CScreenProps {
  children: React.ReactNode;
}

export function CScreen({ children }: CScreenProps) {
  return <CBox paddingHorizontal="s24">{children}</CBox>;
}
