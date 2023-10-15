import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { CBox } from "../../components/CBox/CBox";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { CTextInput } from "../../components/CTextInput/CTextInput";

export function HomeScreen() {
  return (
    <CScreen>
      <CBox
        width="100%"
        height={125}
        alignItems="center"
        justifyContent="space-around"
        flexDirection="row"
      >
        <CText fontSize={32} fontWeight="bold" color="bluePrimary">
          CollegeLink
        </CText>
        <FontAwesome5 name="graduation-cap" size={100} color="#005999" />
      </CBox>

      <CBox width="100%" height={2} bg="gray3" mb="s16" />

      <CTextInput
        iconLeft={<FontAwesome5 name="search" size={24} color="#005999" />}
        placeholder="Pesquise por curso"
      />
    </CScreen>
  );
}
