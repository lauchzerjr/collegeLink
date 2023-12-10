import React from "react";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

interface CPostItemFooterProps {
  userId: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
}

export function CPostItemFooter({
  userId,
  likes,
  dislikes,
  commentsCount,
}: CPostItemFooterProps) {
  const { colors } = useAppTheme();
  const { user } = useAuth();

  return (
    <CBox
      flexDirection="row"
      mt="s10"
      justifyContent="space-around"
      alignItems="center"
    >
      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox mr="s4" activeOpacity={0.7}>
          <AntDesign name="like2" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
        {likes !== 0 && (
          <CText fontWeight="bold" color="bluePrimary">
            {likes}
          </CText>
        )}
      </CBox>

      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox mr="s4" activeOpacity={0.7}>
          <AntDesign name="dislike2" size={24} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
        {dislikes !== 0 && (
          <CText fontWeight="bold" color="bluePrimary">
            {dislikes}
          </CText>
        )}
      </CBox>

      <CBox flexDirection="row" alignItems="center">
        <CTouchableOpacityBox mr="s4" activeOpacity={0.7}>
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
