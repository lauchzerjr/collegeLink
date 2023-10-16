import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { Dimensions } from "react-native";
import { BoxProps, CBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { useToast } from "../../hooks/useToast";

const MAX_WIDTH = Dimensions.get("screen").width * 0.9;

export function CToast() {
  const { toast, addToast } = useToast();

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        addToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, addToast]);

  if (!toast) {
    return null;
  }

  return (
    <CBox bottom={50} {...$boxStyle}>
      <AntDesign
        name={toast.type === "error" ? "closecircle" : "checkcircle"}
        size={24}
        color={toast.type === "error" ? "#EA3838" : "#4ABC86"}
      />
      <CText style={{ flexShrink: 1 }} ml="s16">
        {toast.message}
      </CText>
    </CBox>
  );
}

const $boxStyle: BoxProps = {
  position: "absolute",
  backgroundColor: "background",
  alignSelf: "center",
  alignItems: "center",
  padding: "s16",
  borderRadius: "s16",
  flexDirection: "row",
  opacity: 0.95,
  maxWidth: MAX_WIDTH,
};
