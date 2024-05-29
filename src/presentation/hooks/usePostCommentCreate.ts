import { PostCommentController } from "../../controllers/comment.controller";
import { useController } from "./useController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../stores/useToastStore";
import { Keyboard } from "react-native";

export const usePostCommentCreate = (postId: string, userId: string) => {
  const postCommentController = useController<PostCommentController>(
    "PostCommentController"
  );
  const showToast = useToastStore((state) => state.showToast);
  const queryClient = useQueryClient();

  const createPostComment = async (comment: string) => {
    try {
      return postCommentController.addPostComment(postId, userId, comment);
    } catch (error) {
      showToast({
        message: "Erro ao criar comentário. Tente novamente mais tarde",
        type: "error",
      });
    }
  };

  const { isPending: isLoadingCreatePostComment, mutate } = useMutation({
    mutationFn: createPostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-comment-list"],
        exact: true,
      });

      Keyboard.dismiss();
      showToast({
        message: "Comentário adicionado com sucesso",
        type: "success",
      });
    },
    onError: () =>
      showToast({
        message: "Erro ao criar comentário. Tente novamente mais tarde",
        type: "error",
      }),
  });

  const handleCreatePostComment = async (comment: string) => {
    try {
      mutate(comment);
    } catch (error) {
      showToast({
        message: "Falha ao publicar comentário",
        type: "error",
      });
      console.log("Erro ao criar post => ", error);
    }
  };

  return { handleCreatePostComment, isLoadingCreatePostComment };
};
