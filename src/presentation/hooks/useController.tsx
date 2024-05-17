import { useMemo } from "react";
import {
  UserProfileController,
  UserProfileControllerImpl,
} from "../../controllers/user.controller";
import {
  AuthController,
  AuthControllerImpl,
} from "../../controllers/auth.controller";

type Controller = "UserProfileController" | "AuthController";

type Values = Record<Controller, any>;

const userProfileControllerImpl = new UserProfileControllerImpl();
const authControllerImpl = new AuthControllerImpl();

export function useController<T>(key: keyof Values): T {
  const values: Values = {
    AuthController: authControllerImpl as AuthController,
    UserProfileController: userProfileControllerImpl as UserProfileController,
  };

  const value = useMemo(() => values[key] as T, []);
  return value;
}
