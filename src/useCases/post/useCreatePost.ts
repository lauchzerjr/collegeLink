import { useAuth } from "../../hooks/useAuth";
import { useNameCollectionFirebase } from "../../hooks/useNameCollectionFirebase";
import {
  CreatePostSchemaSchema,
  createPostSchema,
} from "../../screens/CreatePostScreen/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PostController } from "../../controllers/post.controller";

export function useCreatePost() {
  const { user } = useAuth();
  const { nameCollection, courseName } = useNameCollectionFirebase();

  const { control, formState, handleSubmit, getValues, setValue } =
    useForm<CreatePostSchemaSchema>({
      resolver: zodResolver(createPostSchema),
      defaultValues: {
        subjectPost: "",
        disciplinePost: "",
        textPost: "",
      },
      mode: "onChange",
    });

  const handleCreatePost = () => {
    PostController.createPost({
      nameCollection,
      userId: user.uid,
      disciplinePost: getValues("disciplinePost"),
      subjectPost: getValues("subjectPost"),
      textPost: getValues("textPost"),
    });
  };

  return {
    courseName,
    control,
    handleSubmit,
    handleCreatePost,
  };
}
