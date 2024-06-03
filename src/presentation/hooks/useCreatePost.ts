import { useCallback, useEffect, useState } from "react";
import {
  CreatePostSchemaSchema,
  createPostSchema,
} from "../screens/CreatePostScreen/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postApi } from "../../services/post.service";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthStore } from "../stores/authStore";
import { useNameCollectionStore } from "../stores/useNameCollectionStore";
import { useToastStore } from "../stores/useToastStore";
import { useController } from "./useController";
import { PostController } from "../../controllers/post.controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Keyboard } from "react-native";

export function useCreatePost() {
  const route = useRoute();
  const postController = useController<PostController>("PostController");
  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);
  const { postContent, postId } = route?.params || {};

  const { goBack } = useNavigation();
  const queryClient = useQueryClient();

  const { nameCollection, courseName } = useNameCollectionStore();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (postContent) {
      setSelectedImage(postContent?.photoPost);
    }
  }, []);

  const { control, formState, handleSubmit, getValues } =
    useForm<CreatePostSchemaSchema>({
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        subjectPost: postContent?.subjectPost || "",
        disciplinePost: postContent?.disciplinePost || "",
        textPost: postContent?.textPost || "",
      },
      mode: "onChange",
    });

  const createPost = () => {
    return postController.createPost({
      nameCollection,
      userId: user.uid,
      disciplinePost: getValues("disciplinePost"),
      subjectPost: getValues("subjectPost"),
      textPost: getValues("textPost"),
      photoPost: selectedImage,
    });
  };

  const { isPending: isLoadingCreatePost, mutate: mutateCeatePost } =
    useMutation({
      mutationFn: createPost,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post-list", nameCollection],
          exact: true,
        });

        Keyboard.dismiss();
        goBack();
      },
      onError: () =>
        showToast({
          message: "Erro ao criar post. Tente novamente mais tarde",
          type: "error",
        }),
    });

  const updatePost = () => {
    return postApi.updatePost(nameCollection, postId, {
      disciplinePost: getValues("disciplinePost"),
      subjectPost: getValues("subjectPost"),
      textPost: getValues("textPost"),
      photoPost: selectedImage,
    });
  };

  const { isPending: isLoadingUpdatePost, mutate: mutateUpdatePost } =
    useMutation({
      mutationFn: updatePost,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post-list", nameCollection],
          exact: true,
        });

        Keyboard.dismiss();
        goBack();
      },
      onError: () =>
        showToast({
          message: "Erro ao atualizar post. Tente novamente mais tarde",
          type: "error",
        }),
    });

  const uploadPostPhoto = useCallback(async (uri: string) => {
    try {
      const { task, ref } = await postApi.uploadPostPhoto(
        uri,
        user.uid,
        nameCollection
      );

      task.then(async () => {
        const url = await ref.getDownloadURL();
        setSelectedImage(url);
      });
    } catch (error) {
      console.log("Erro ao fazer upload da imagem do post => ", error);
    }
  }, []);

  const pickImageGallery = async () => {
    try {
      Keyboard.dismiss();
      if (ImagePicker.PermissionStatus.UNDETERMINED) {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }

      const galleryStatus = await (
        await ImagePicker.getMediaLibraryPermissionsAsync()
      ).granted;

      if (!galleryStatus) {
        showToast({
          message: "Você não autorizou o uso da galeria",
          type: "error",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 10,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erro ao abrir a galeria => ", error);
    }
  };

  const handleSubmitPost = async () => {
    try {
      if (postContent) {
        mutateUpdatePost();
        return;
      }
      if (selectedImage) {
        await uploadPostPhoto(selectedImage);
      }

      mutateCeatePost();
    } catch (error) {
      showToast({
        message: "Falha ao publicar post",
        type: "error",
      });
      console.log("Erro ao criar post => ", error);
    }
  };

  return {
    postContent,
    formState,
    courseName,
    control,
    selectedImage,
    getValues,
    setSelectedImage,
    handleSubmit,
    handleSubmitPost,
    pickImageGallery,
    isLoadingCreatePost,
    isLoadingUpdatePost,
  };
}
