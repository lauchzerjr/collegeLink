import React from "react";
import { CBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { Comment } from "../../../models/comment.model";
import { CUserProfilePhoto } from "../CUserProfilePhoto/CUserProfilePhoto";
import { dateUtils } from "../../utils/dateIsoFormater";

interface CPostCommentItemProps {
  item: Comment;
}

export function CPostCommentItem({ item }: CPostCommentItemProps) {
  return (
    <CBox p="s8">
      <CBox alignItems="center" flexDirection="row">
        <CUserProfilePhoto photoURL={item?.user?.userPhoto} isPostPhoto />
        <CBox ml="s10">
          <CBox flexDirection="row" alignItems="center">
            <CText fontWeight="bold" color="bluePrimary">
              {item?.user?.name}
            </CText>
            <CText fontSize={12} fontWeight="bold" ml="s4" color="gray2">
              - {dateUtils.formatRelative(item?.createdAt)}
            </CText>
          </CBox>
          <CText>{item?.text}</CText>
        </CBox>
      </CBox>
    </CBox>
  );
}
