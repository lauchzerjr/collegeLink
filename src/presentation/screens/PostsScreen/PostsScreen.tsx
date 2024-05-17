import React from "react";
import { CScreen } from "../../components/CScreen/CScreen";
import { CTextInput } from "../../components/CTextInput/CTextInput";
import { CTouchableOpacityBox } from "../../components/CBox/CBox";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { CPostList } from "./components/CPostList";

export function PostsScreen() {
  const [searchText, setSearchText] = React.useState("");

  const clearSearch = () => {
    if (searchText.length > 0) {
      return (
        <CTouchableOpacityBox onPress={() => setSearchText("")}>
          <AntDesign name="closecircleo" size={24} color="#005999" />
        </CTouchableOpacityBox>
      );
    }
  };

  return (
    <CScreen isStackHeader>
      <CTextInput
        iconLeft={<FontAwesome5 name="search" size={24} color="#005999" />}
        placeholder="Pesquise por disciplina"
        boxProps={{ mb: "s16" }}
        value={searchText}
        onChangeText={setSearchText}
        iconRight={clearSearch()}
      />

      <CPostList />
    </CScreen>
  );
}
