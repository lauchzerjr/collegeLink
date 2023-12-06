import React from "react";
import { FlatList, View } from "react-native";
import { CScreen } from "../../components/CScreen/CScreen";
import { CTextInput } from "../../components/CTextInput/CTextInput";
import { CBox, CTouchableOpacityBox } from "../../components/CBox/CBox";
import {
  FontAwesome5,
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { CUserProfilePhoto } from "../../components/CUserProfilePhoto/CUserProfilePhoto";
import { CText } from "../../components/CText/CText";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAppSafeArea } from "../../hooks/useAppSafeArea";

export type PostProps = {
  userId: string;
  subjectName: string;
  userName: string;
  userEmail: string;
  discipline: string;
  textPost: string;
  createdIn: number;
};

export function PostsScreen() {
  const [searchText, setSearchText] = React.useState("");
  const { colors } = useAppTheme();
  const { bottom } = useAppSafeArea();

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

      <FlatList
        data={[
          {
            id: 1,
            userId: 1,
            userName: "Adalba",
            userPhoto: "",
            userEmail: "Adalba@gmail.com",
            comments: null,
            likes: null,
            dislikes: null,
            postText: "1",
            postSubject: "1",
            postdiscipline: "1",
            postImgs: "1",
            postTime: "há uma hora atras",
          },
          {
            id: 2,
            userId: 2,
            userName: "Nicole",
            userPhoto: "",
            userEmail: "Nic@gmail.com",
            comments: null,
            likes: null,
            dislikes: null,
            postSubject: "2",
            postdiscipline: "2",
            postText: "2",
            postImgs: "2",
            postTime: "há uma hora atras",
          },
          {
            id: 3,
            userId: 3,
            userName: "Verona",
            userPhoto: "",
            userEmail: "Verona@gmail.com",
            comments: null,
            likes: null,
            dislikes: null,
            postSubject: "3",
            postdiscipline: "3",
            postText: "3",
            postImgs: "3",
            postTime: "há uma hora atras",
          },
          {
            id: 4,
            userId: 4,
            userName: "Simon",
            userPhoto: "",
            userEmail: "Simon@gmail.com",
            comments: null,
            likes: null,
            dislikes: null,
            postSubject: "4",
            postdiscipline: "4",
            postText: "lorem",
            postImgs: "4",
            postTime: "há uma hora atras",
          },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <CBox
              bg="gray4"
              borderRadius="s8"
              p="s8"
              position="relative"
              borderWidth={1}
              borderColor="bluePrimary"
            >
              <CBox flexDirection="row" width={"90%"} pb="s10">
                <CUserProfilePhoto photoURL="" isPostPhoto />

                <CBox ml="s10">
                  <CText fontWeight="bold">{item.userName}</CText>
                  <CText>{item.userEmail}</CText>
                  <CText>Disciplina: {item.postdiscipline}</CText>
                </CBox>
              </CBox>
              <CBox
                paddingVertical="s8"
                paddingHorizontal="s12"
                bg="grayWhite"
                position="absolute"
                right={0}
                borderRadius="s8"
                borderWidth={1}
                borderColor="bluePrimary"
              >
                <CTouchableOpacityBox>
                  <FontAwesome
                    name="bookmark-o"
                    size={36}
                    color={colors.bluePrimary}
                  />
                </CTouchableOpacityBox>
              </CBox>

              <CBox height={1} width={"100%"} bg="grayBlack" />
              <CBox paddingVertical="s10">
                <CText>Titulo: {item.postSubject}</CText>
                <CText>{item.postText}</CText>

                <CBox width={"100%"} height={250} bg="grayWhite" />
              </CBox>
              <CBox height={1} width={"100%"} bg="grayBlack" />
              <CBox
                flexDirection="row"
                mt="s10"
                justifyContent="space-around"
                alignItems="center"
              >
                <AntDesign name="like2" size={24} color="black" />
                <AntDesign name="dislike2" size={24} color="black" />
                <Ionicons name="megaphone-sharp" size={24} color="black" />

                <FontAwesome name="edit" size={24} color="black" />
                <FontAwesome name="trash-o" size={24} color="black" />
              </CBox>
            </CBox>
          );
        }}
        ItemSeparatorComponent={() => <CBox height={10} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      />
    </CScreen>
  );
}
