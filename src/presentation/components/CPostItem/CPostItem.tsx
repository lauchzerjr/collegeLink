import React from "react";
import { CBox } from "../CBox/CBox";
import { CText } from "../CText/CText";
import { Post } from "../../../models/post.model";
import { CPostItemHeader } from "../CPostItemHeader/CPostItemHeader";
import { CPostItemFooter } from "../CPostItemFooter/CPostItemFooter";
import { Image } from "react-native";

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
        userId={item?.userId}
        createdAt={item.createdAt}
        updatedAt={item?.updatedAt}
        postId={item.id}
      />

      <CBox paddingVertical="s10">
        <CText>Titulo: {item?.subjectPost}</CText>
        <CText>{item?.textPost}</CText>

        {item.photoPost && (
          <Image
            source={{ uri: item.photoPost }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 12,
            }}
            resizeMode="stretch"
          />
        )}
      </CBox>
      <CBox height={1} width={"100%"} bg="grayBlack" />

      <CPostItemFooter
        initialLikes={item?.postLikes}
        commentsCount={item?.postComments}
        initialDislikes={item?.postDislikes}
        userId={item?.userId}
        postId={item?.id}
        postContent={{
          disciplinePost: item.disciplinePost,
          photoPost: item.photoPost,
          subjectPost: item.subjectPost,
          textPost: item.textPost,
        }}
      />
    </CBox>
  );
}
