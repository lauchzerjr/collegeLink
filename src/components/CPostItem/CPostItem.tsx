import React from "react";
import { CBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { Post } from "../../services/Post/models/postModels";
import { CPostItemHeader } from "../CPostItemHeader/CPostItemHeader";
import { CPostItemFooter } from "../CPostItemFooter/CPostItemFooter";

interface CPostItemProps {
  item: Post;
}

export function CPostItem({ item }: CPostItemProps) {
  return (
    <CBox
      bg="gray4"
      borderRadius="s8"
      p="s8"
      position="relative"
      borderWidth={1}
      borderColor="bluePrimary"
    >
      <CPostItemHeader
        disciplinePost={item?.disciplinePost}
        email={item?.user?.email}
        name={item?.user?.name}
        userPhoto={item?.user?.userPhoto}
      />

      <CBox paddingVertical="s10">
        <CText>Titulo: {item?.subjectPost}</CText>
        <CText>{item?.textPost}</CText>

        <CBox width={"100%"} height={250} bg="grayWhite" />
      </CBox>
      <CBox height={1} width={"100%"} bg="grayBlack" />

      <CPostItemFooter
        initialLikes={item?.postLikes}
        commentsCount={item?.postComments}
        initialDislikes={item?.postDislikes}
        userId={item?.userId}
        postId={item?.id}
      />
    </CBox>
  );
}
