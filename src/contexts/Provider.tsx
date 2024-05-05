import { ReactNode, createContext, useMemo } from "react";
import { AuthControllerImpl } from "../controllers/auth.controller";

export interface ControllerContextProps {
  authController: AuthControllerImpl;
}

export const ControllerContext = createContext<ControllerContextProps>(
  {} as ControllerContextProps
);

type ProviderProps = {
  children: ReactNode;
};

export const ControllerProvider = ({ children }: ProviderProps) => {
  const controllers = useMemo(
    () => ({
      authController: new AuthControllerImpl(),
      // Inicialize outros controladores aqui, se necessário
    }),
    []
  );

  return (
    <ControllerContext.Provider value={controllers}>
      {children}
    </ControllerContext.Provider>
  );
};
