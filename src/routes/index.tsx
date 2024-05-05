import { NavigationContainer } from "@react-navigation/native";

import { StackRoutes } from "./stack.routes";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { useAuthStore } from "../stores/authStore";

export const Routes = () => {
  const { user } = useAuthStore();

  return (
    <NavigationContainer>
      {user?.emailVerified ? <StackRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
};
