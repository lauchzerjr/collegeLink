import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { usePostList } from "../../../hooks/usePostList";
import { CPostItem } from "../../../components/CPostItem/CPostItem";
import { CBox } from "../../../components/CBox/CBox";
import { useAppSafeArea } from "../../../../presentation/hooks/useAppSafeArea";
import { CActivityIndicator } from "../../../components/CActivityIndicator/CActivityIndicator";
import { CEmptyList } from "../../../components/CEmptyList/CEmptyList";

type CPostListProps = {
  searchText: string;
};

export const CPostList = ({ searchText }: CPostListProps) => {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePostList();

  const { bottom } = useAppSafeArea();

  const filteredPosts = useMemo(() => {
    const lowerSearch = searchText.toLowerCase();

    return posts.filter((post) =>
      post.disciplinePost.toLowerCase().includes(lowerSearch)
    );
  }, [searchText]);

  const renderItem = ({ item }) => {
    return <CPostItem item={item} />;
  };

  const renderListFooterComponent = () => {
    if (isFetchingNextPage) {
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

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && posts?.length === 0) {
    return (
      <CBox height={"90%"} alignItems="center" justifyContent="center">
        <CActivityIndicator size="small" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <FlatList
      data={searchText ? filteredPosts : posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ItemSeparatorComponent={() => <CBox height={10} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 50 }}
      ListFooterComponent={renderListFooterComponent}
      ListEmptyComponent={renderListEmptyComponent}
    />
  );
};
