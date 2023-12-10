import React from "react";
import { FlatList } from "react-native";
import { usePostList } from "../../../services/Post/useCases/usePostList";
import { CPostItem } from "../../../components/CPostItem/CPostItem";
import { CBox } from "../../../components/CBox/CBox";
import { useAppSafeArea } from "../../../hooks/useAppSafeArea";
import { CActivityIndicator } from "../../../components/CActivityIndicator/CActivityIndicator";
import { CEmptyList } from "../../../components/CEmptyList/CEmptyList";

export const CPostList = () => {
  const { posts, fetchMorePosts, lastPost, startAfter, loading } =
    usePostList();

  const { bottom } = useAppSafeArea();

  const renderItem = ({ item }) => {
    return <CPostItem item={item} />;
  };

  const renderListFooterComponent = () => {
    console.log("lastPost", lastPost);
    if (!lastPost && startAfter !== null) {
      return (
        <CBox p="s10">
          <CActivityIndicator size="small" color="bluePrimary" />
        </CBox>
      );
    }
  };

  const renderListEmptyComponent = () => {
    return <CEmptyList title="Não encontramos nenhuma postagem" />;
  };

  if (loading && posts.length === 0) {
    return (
      <CBox flex={1} alignItems="center" justifyContent="center">
        <CActivityIndicator size="small" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={renderItem}
      onEndReached={fetchMorePosts}
      onEndReachedThreshold={0.1}
      ItemSeparatorComponent={() => <CBox height={10} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 50 }}
      ListFooterComponent={renderListFooterComponent}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};
