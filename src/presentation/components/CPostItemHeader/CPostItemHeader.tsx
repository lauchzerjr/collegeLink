import React, { useState } from "react";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CUserProfilePhoto } from "../CUserProfilePhoto/CUserProfilePhoto";
import { CText } from "../CText/CText";
import { FontAwesome } from "@expo/vector-icons";
import { dateUtils } from "../../utils/dateIsoFormater";
import { favoriteApi } from "../../../services/favorite.service";
import { useToastStore } from "../../stores/useToastStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNameCollectionStore } from "../../stores/useNameCollectionStore";

interface CPostItemHeaderProps {
  name: string;
  email: string;
  userPhoto: string;
  disciplinePost: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
}

export function CPostItemHeader({
  disciplinePost,
  email,
  name,
  userPhoto,
  userId,
  createdAt,
  updatedAt,
  postId,
}: CPostItemHeaderProps) {
  const { colors } = useAppTheme();
  const [favorite, setFavorite] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const nameCollection = useNameCollectionStore(
    (state) => state.nameCollection
  );
  const queryClient = useQueryClient();

  function toggleFavorite() {
    setFavorite((prev) => !prev);
  }

  async function handleFavorite() {
    try {
      const hasFavorite = await favoriteApi.hasFavorite(postId, userId);

      if (hasFavorite) {
        await favoriteApi.removeFavorite(postId, userId);
        showToast({ message: "Postagem desfavoritada", type: "error" });
      } else {
        await favoriteApi.addFavorite(postId, userId, nameCollection);
        showToast({
          message: "Postagem favoritada com sucesso",
          type: "success",
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleFavorite ~ error:", error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: handleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorite-list"],
        exact: true,
      });

      toggleFavorite();
    },
    onError: () =>
      showToast({
        message: "Erro ao favoritar postagem. Tente novamente mais tarde",
        type: "error",
      }),
  });

  const checkIfFavorite = React.useCallback(async () => {
    const favorite = await favoriteApi.hasFavorite(postId, userId);
    setFavorite(favorite);
  }, []);

  React.useEffect(() => {
    checkIfFavorite();
  }, [postId, userId]);

  return (
    <>
      <CBox flexDirection="row" width={"90%"} pb="s10">
        <CUserProfilePhoto photoURL={userPhoto} isPostPhoto userId={userId} />

        <CBox ml="s10">
          <CText fontWeight="bold">{name}</CText>
          <CText>{email}</CText>
          <CText>Disciplina: {disciplinePost}</CText>
          <CText>
            {updatedAt
              ? `atualizado há: ${dateUtils.formatRelative(updatedAt)}`
              : `postado há: ${dateUtils.formatRelative(createdAt)}`}
          </CText>
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
        <CTouchableOpacityBox onPress={() => mutate()}>
          {favorite ? (
            <FontAwesome name="bookmark" size={36} color={colors.bluePrimary} />
          ) : (
            <FontAwesome
              name="bookmark-o"
              size={36}
              color={colors.bluePrimary}
            />
          )}
        </CTouchableOpacityBox>
      </CBox>

      <CBox height={1} width={"100%"} bg="grayBlack" />
    </>
  );
}
