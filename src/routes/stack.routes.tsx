import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { useAuth } from "../hooks/useAuth";
import { TabRoutes } from "./tab.routes";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";

const { Screen, Navigator } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator>
      <Screen
        name="tabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />

      {/* <Screen 
        name="postScreen"
        component={PostScreen}
      />

      <Screen 
        name="createPost"
        component={CreatePostScreen}
      /> */}
    </Navigator>
  );
};
