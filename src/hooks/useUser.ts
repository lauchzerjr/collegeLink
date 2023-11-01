import { useContext } from "react";

import { UserContext, UserContextProps } from '../contexts/UserContext'

export function useUser(): UserContextProps {
  const context = useContext(UserContext)

  return context;
}