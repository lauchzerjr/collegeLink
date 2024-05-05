import { useContext } from "react";

import {
  ControllerContext,
  ControllerContextProps,
} from "../contexts/Provider";

export function useController(): ControllerContextProps {
  const context = useContext(ControllerContext);

  return context;
}
