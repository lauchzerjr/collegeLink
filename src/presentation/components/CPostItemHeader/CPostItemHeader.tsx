import React from "react";
import { useAppTheme } from "../../hooks/useAppTheme";
import { CBox, CTouchableOpacityBox } from "../CBox/CBox";
import { CUserProfilePhoto } from "../CUserProfilePhoto/CUserProfilePhoto";
import { CText } from "../CText/CText";
import { FontAwesome } from "@expo/vector-icons";
import { dateUtils } from "../../utils/dateIsoFormater";

interface CPostItemHeaderProps {
  name: string;
  email: string;
  userPhoto: string;
  disciplinePost: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export function CPostItemHeader({
  disciplinePost,
  email,
  name,
  userPhoto,
  userId,
  createdAt,
  updatedAt,
}: CPostItemHeaderProps) {
  const { colors } = useAppTheme();

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
        <CTouchableOpacityBox>
          <FontAwesome name="bookmark-o" size={36} color={colors.bluePrimary} />
        </CTouchableOpacityBox>
      </CBox>

      <CBox height={1} width={"100%"} bg="grayBlack" />
    </>
  );
}
