import React from "react";
import { FlatList } from "react-native";
import { CBox } from "../../components/CBox/CBox";
import { useInfiniteQuery } from "@tanstack/react-query";
import { favoriteApi } from "../../../services/favorite.service";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useAuthStore } from "../../stores/authStore";
import { CPostItem } from "../../components/CPostItem/CPostItem";
import { useAppSafeArea } from "../../hooks/useAppSafeArea";
import { CActivityIndicator } from "../../components/CActivityIndicator/CActivityIndicator";
import { CEmptyList } from "../../components/CEmptyList/CEmptyList";
import { CScreen } from "../../components/CScreen/CScreen";

type PageParamType = {
  pageParam: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;
};

export function FavoriteScreen() {
  const user = useAuthStore((state) => state.user);

  const fetchPostList = async ({ pageParam = null }: PageParamType) => {
    const { data, lastVisible } = await favoriteApi.getFavoriteList(
      user.uid,
      pageParam
    );

    return { data, lastVisible };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["favorite-list"],
      queryFn: fetchPostList,
      initialPageParam: null,
      getNextPageParam: ({ lastVisible }) => lastVisible ?? null,
    });

  const favoriteList = data?.pages.flatMap((page) => page.data) || [];

  const { bottom } = useAppSafeArea();

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
    return <CEmptyList title="Não encontramos nenhuma postagem favoritada" />;
  };

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && favoriteList?.length === 0) {
    return (
      <CBox height={"90%"} alignItems="center" justifyContent="center">
        <CActivityIndicator size="small" color="bluePrimary" />
      </CBox>
    );
  }

  return (
    <CScreen>
      <FlatList
        data={favoriteList}
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
    </CScreen>
  );
}
