import React from "react";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { usePostCommentCreate } from "../../../hooks/usePostCommentCreate";
import { CTouchableOpacityBox } from "../../../components/CBox/CBox";
import { CTextInput } from "../../../components/CTextInput/CTextInput";
import { useAuthStore } from "../../../stores/authStore";

interface PostCommentTextMessageProps {
  postId: string;
}

export function PostCommentTextMessage({
  postId,
}: PostCommentTextMessageProps) {
  const user = useAuthStore((state) => state.user);

  const { handleCreatePostComment, isLoadingCreatePostComment } =
    usePostCommentCreate(postId, user.uid);
  const [postCommentText, setPostCommentText] = React.useState("");

  const clearSearch = () => {
    if (postCommentText.length > 0) {
      return (
        <CTouchableOpacityBox onPress={() => setPostCommentText("")}>
          <AntDesign name="closecircleo" size={24} color="#005999" />
        </CTouchableOpacityBox>
      );
    }
  };

  const onSubmit = async () => {
    await handleCreatePostComment(postCommentText);
    setPostCommentText("");
  };

  return (
    <CTextInput
      iconLeft={<FontAwesome5 name="comment" size={24} color="#005999" />}
      placeholder="Adicione um comentário"
      boxProps={{ mb: "s16" }}
      value={postCommentText}
      onChangeText={setPostCommentText}
      iconRight={clearSearch()}
      onSubmitEditing={onSubmit}
      editable={!isLoadingCreatePostComment}
    />
  );
}
