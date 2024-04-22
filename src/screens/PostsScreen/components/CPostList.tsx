import React from "react";
import { FlatList } from "react-native";
import { usePostList } from "../../../useCases/post/usePostList";
import { CPostItem } from "../../../components/CPostItem/CPostItem";
import { CBox } from "../../../components/CBox/CBox";
import { useAppSafeArea } from "../../../hooks/useAppSafeArea";
import { CActivityIndicator } from "../../../components/CActivityIndicator/CActivityIndicator";
import { CEmptyList } from "../../../components/CEmptyList/CEmptyList";

export const CPostList = () => {
  const { data, fetchMoreData, lastItem, startAfter, loading } = usePostList();

  const { bottom } = useAppSafeArea();

  const renderItem = ({ item }) => {
    return <CPostItem item={item} />;
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
    return <CEmptyList title="Não encontramos nenhuma postagem" />;
  };

  if (loading && data.length === 0) {
    return (
      <CBox flex={1} alignItems="center" justifyContent="center">
        <CActivityIndicator size="small" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.1}
      ItemSeparatorComponent={() => <CBox height={10} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 50 }}
      ListFooterComponent={renderListFooterComponent}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};
