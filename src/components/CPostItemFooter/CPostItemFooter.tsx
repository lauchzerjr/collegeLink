import React from "react";
import { useAppTheme } from "../../presentation/hooks/useAppTheme";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LikeController } from "../../controllers/like.controller";
import { DislikeController } from "../../controllers/dislike.controller";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../presentation/stores/authStore";

interface CPostItemFooterProps {
  userId: string;
  postId: string;
  initialLikes: number;
  initialDislikes: number;
  commentsCount: number;
}

export function CPostItemFooter({
  userId,
  postId,
  initialLikes,
  initialDislikes,
  commentsCount,
}: CPostItemFooterProps) {
  const { navigate } = useNavigation();
  const { colors } = useAppTheme();
  const user = useAuthStore((state) => state.user);

  const [likes, setLikes] = React.useState(initialLikes);
  const [hasLiked, setHasLiked] = React.useState(false);
  const [dislikes, setDislikes] = React.useState(initialDislikes);
  const [hasDisliked, setHasDisliked] = React.useState(false);

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
        <CTouchableOpacityBox activeOpacity={0.7}>
          <FontAwesome name="edit" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
      )}

      {user.uid === userId && (
        <CTouchableOpacityBox activeOpacity={0.7}>
          <FontAwesome name="trash-o" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
      )}
    </CBox>
  );
}
