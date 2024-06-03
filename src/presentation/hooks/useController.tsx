import { useMemo } from "react";
import {
  UserProfileController,
  UserProfileControllerImpl,
} from "../../controllers/user.controller";
import {
  AuthController,
  AuthControllerImpl,
} from "../../controllers/auth.controller";
import {
  PostController,
  PostControllerImpl,
} from "../../controllers/post.controller";
import {
  PostCommentController,
  PostCommentControllerImpl,
} from "../../controllers/comment.controller";

type Controller =
  | "UserProfileController"
  | "AuthController"
  | "PostController"
  | "PostCommentController";

type Values = Record<Controller, any>;

const userProfileControllerImpl = new UserProfileControllerImpl();
const authControllerImpl = new AuthControllerImpl();
const postCommentControllerImpl = new PostCommentControllerImpl(
  userProfileControllerImpl
);
const postControllerImpl = new PostControllerImpl(
  userProfileControllerImpl,
  postCommentControllerImpl
);

export function useController<T>(key: keyof Values): T {
  const values: Values = {
    AuthController: authControllerImpl as AuthController,
    UserProfileController: userProfileControllerImpl as UserProfileController,
    PostController: postControllerImpl as PostController,
    PostCommentController: postCommentControllerImpl as PostCommentController,
  };

  const value = useMemo(() => values[key] as T, []);
  return value;
}
