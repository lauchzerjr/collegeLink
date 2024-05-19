import React, { useEffect, useState } from "react";
import { CBox } from "../../components/CBox/CBox";
import { CScreen } from "../../components/CScreen/CScreen";
import { CText } from "../../components/CText/CText";
import { FlatList } from "react-native";
import { CActivityIndicator } from "../../components/CActivityIndicator/CActivityIndicator";
import { CEmptyList } from "../../components/CEmptyList/CEmptyList";
import { usePostCommentList } from "../../hooks/useCommentList";
import { useRoute } from "@react-navigation/native";
import { CPostCommentItem } from "../../components/CPostItem/CPostCommentItem";
import { PostCommentTextMessage } from "./components/PostCommentTextMessage";
import { usePostStore } from "../../stores/postStore";

type RouteParams = {
  postId: string;
};

export function PostCommentsScreen() {
  const route = useRoute();
  const { postId } = route.params as RouteParams;
  const { fetchMoreData, lastItem, startAfter, loading, data } =
    usePostCommentList(postId);
  // const postComments = usePostStore((state) => state.postComments);

  const renderItem = ({ item }) => {
    return <CPostCommentItem item={item} />;
  };

  const renderListFooterComponent = () => {
    if (!lastItem && startAfter !== null) {
      return (
        <CBox p="s10">
          <CActivityIndicator size="small" color="bluePrimary" />
        </CBox>
      );
    }
  };

  const renderListEmptyComponent = () => {
    return (
      <CEmptyList title="Não encontramos nenhum comentário para este post!" />
    );
  };

  const renderListHeaderComponent = () => {
    return (
      <CText fontSize={18} color="bluePrimary" mb="s10" textAlign="center">
        Comentários
      </CText>
    );
  };

  if (loading && data.length === 0) {
    return (
      <CBox flex={1} alignItems="center" justifyContent="center">
        <CActivityIndicator size="small" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <CScreen flex={1}>
      <CBox
        height={8}
        width={40}
        bg="grayBlack"
        alignSelf="center"
        borderRadius="s12"
        mb="s10"
      />
      <CBox flex={1} justifyContent="space-between">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 210 }}
          ItemSeparatorComponent={() => (
            <CBox
              height={1}
              width={"100%"}
              bg="bluePrimary"
              marginVertical="s10"
              alignSelf="center"
            />
          )}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={renderListFooterComponent}
          ListEmptyComponent={renderListEmptyComponent}
          ListHeaderComponent={renderListHeaderComponent}
        />

        <PostCommentTextMessage postId={postId} />
      </CBox>
    </CScreen>
  );
}
