import { NavigationContainer } from "@react-navigation/native";

import { StackRoutes } from "./stack.routes";
import { useAuth } from "../hooks/useAuth";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.emailVerified ? <StackRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
};
