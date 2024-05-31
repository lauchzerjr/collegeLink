import React, { useState } from "react";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LikeController } from "../../../controllers/like.controller";
import { DislikeController } from "../../../controllers/dislike.controller";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../../services/post.service";
import { useNameCollectionStore } from "../../stores/useNameCollectionStore";
import { useToastStore } from "../../stores/useToastStore";
import { CModal } from "../CModal/CModal";
import { CButton } from "../CButton/CButton";

interface CPostItemFooterProps {
  userId: string;
  postId: string;
  initialLikes: number;
  initialDislikes: number;
  commentsCount: number;
  postContent: {
    disciplinePost: string;
    subjectPost: string;
    textPost: string;
    photoPost: string;
  };
}

export function CPostItemFooter({
  userId,
  postId,
  initialLikes,
  initialDislikes,
  commentsCount,
  postContent,
}: CPostItemFooterProps) {
  const { navigate } = useNavigation();
  const { colors } = useAppTheme();
  const user = useAuthStore((state) => state.user);

  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isModalDeletePost, setIsModalDeletePost] = useState(false);
  const nameCollection = useNameCollectionStore(
    (state) => state.nameCollection
  );
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postApi.deletePost(nameCollection, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-list", nameCollection],
        exact: true,
      });

      toggleModalDeletePost();

      showToast({
        message: "Postagem deletada com sucesso",
        type: "success",
      });
    },
    onError: () =>
      showToast({
        message: "Erro ao deletar postagem. Tente novamente mais tarde",
        type: "error",
      }),
  });

  const navigateToPostCommentScreen = () => {
    navigate("PostCommentsScreen", { postId });
  };

  const checkIfLiked = React.useCallback(async () => {
    const liked = await LikeController.hasLikedPost(postId, user.uid);
    setHasLiked(liked);
  }, []);

  const checkIfDisliked = React.useCallback(async () => {
    const disliked = await DislikeController.hasDislikedPost(postId, user.uid);
    setHasDisliked(disliked);
  }, []);

  React.useEffect(() => {
    checkIfLiked();
    checkIfDisliked();
  }, [postId, userId]);

  const handleLike = React.useCallback(async () => {
    try {
      if (hasLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setHasLiked((hasLiked) => !hasLiked);
      await LikeController.handlePostLikePress({ postId, userId: user.uid });
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  }, [hasLiked, likes, postId, userId, user.uid]);

  const handleDislike = React.useCallback(async () => {
    try {
      if (hasDisliked) {
        setDislikes(dislikes - 1);
      } else {
        setDislikes(dislikes + 1);
      }
      setHasDisliked((hasDisliked) => !hasDisliked);
      await DislikeController.handlePostDislikePress({
        postId,
        userId: user.uid,
      });
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  }, [hasDisliked, dislikes, postId, userId, user.uid]);

  function handleDeletePost() {
    mutate();
  }

  function toggleModalDeletePost() {
    setIsModalDeletePost((modal) => !modal);
  }

  const navigateToEditPostScreen = () => {
    navigate("CreatePostScreen", {
      postId,
      postContent,
    });
  };

  return (
    <CBox
      flexDirection="row"
      mt="s10"
      justifyContent="space-around"
      alignItems="center"
    >
      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox mr="s4" activeOpacity={0.7} onPress={handleLike}>
          <AntDesign
            name={hasLiked ? "like1" : "like2"}
            size={24}
            color={colors.bluePrimary}
          />
        </CTouchableOpacityBox>
        {likes !== 0 && (
          <CText fontWeight="bold" color="bluePrimary">
            {likes}
          </CText>
        )}
      </CBox>

      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox
          mr="s4"
          activeOpacity={0.7}
          onPress={handleDislike}
        >
          <AntDesign
            name={hasDisliked ? "dislike1" : "dislike2"}
            size={24}
            color={colors.bluePrimary}
          />
        </CTouchableOpacityBox>
        {dislikes !== 0 && (
          <CText fontWeight="bold" color="bluePrimary">
            {dislikes}
          </CText>
        )}
      </CBox>

      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox
          mr="s4"
          activeOpacity={0.7}
          onPress={navigateToPostCommentScreen}
        >
          <FontAwesome name="comment-o" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
        {commentsCount !== 0 && (
          <CText fontWeight="bold" color="bluePrimary">
            {commentsCount}
          </CText>
        )}
      </CBox>

      {user.uid === userId && (
        <CTouchableOpacityBox
          activeOpacity={0.7}
          onPress={navigateToEditPostScreen}
        >
          <FontAwesome name="edit" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
      )}

      {user.uid === userId && (
        <CTouchableOpacityBox
          activeOpacity={0.7}
          onPress={toggleModalDeletePost}
        >
          <FontAwesome name="trash-o" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
      )}

      <CModal
        title={"Deseja excluir a postagem?"}
        visible={isModalDeletePost}
        onClose={toggleModalDeletePost}
        children={
          <>
            <CButton
              title={"Sim"}
              onPress={handleDeletePost}
              mb="s10"
              mt="s10"
            />
            <CButton title={"Não"} onPress={toggleModalDeletePost} mb="s10" />
          </>
        }
      />
    </CBox>
  );
}
