import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { TabRoutes } from "./tab.routes";
import { PostsScreen } from "../screens/PostsScreen/PostsScreen";
import { useAppTheme } from "../../presentation/hooks/useAppTheme";
import { CTouchableOpacityBox } from "../components/CBox/CBox";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CreatePostScreen } from "../screens/CreatePostScreen/CreatePostScreen";
import { PostCommentsScreen } from "../screens/PostCommentsScreen/PostCommentsScreen";
import { PostProfileScreen } from "../screens/PostProfileScreen/PostProfileScreen";

const { Screen, Navigator } = createStackNavigator();

export const StackRoutes = () => {
  const { colors } = useAppTheme();

  return (
    <Navigator>
      <Screen
        name="tabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />

      <Screen
        name="PostsScreen"
        component={PostsScreen}
        options={({ route, navigation }) => ({
          title: route.params?.nameCourse,
          headerTitleStyle: { fontSize: 12, color: colors.bluePrimary },
          headerLeft: () => (
            <CTouchableOpacityBox ml="s12" onPress={() => navigation.goBack()}>
              <AntDesign
                name="leftcircle"
                size={24}
                color={colors.bluePrimary}
              />
            </CTouchableOpacityBox>
          ),
          headerRight: () => (
            <CTouchableOpacityBox
              mr="s12"
              onPress={() => navigation.navigate("CreatePostScreen")}
            >
              <Ionicons
                name="add-circle"
                size={32}
                color={colors.bluePrimary}
              />
            </CTouchableOpacityBox>
          ),
        })}
      />

      <Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={({ route, navigation }) => ({
          title: route?.params?.postContent
            ? "Editar postagem"
            : "Criar postagem",
          headerTitleStyle: { color: colors.bluePrimary },
          headerLeft: () => (
            <CTouchableOpacityBox ml="s12" onPress={() => navigation.goBack()}>
              <AntDesign
                name="leftcircle"
                size={24}
                color={colors.bluePrimary}
              />
            </CTouchableOpacityBox>
          ),
        })}
      />

      <Screen
        name="PostCommentsScreen"
        component={PostCommentsScreen}
        options={{
          gestureEnabled: true,
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />

      <Screen
        name="PostProfileScreen"
        component={PostProfileScreen}
        options={{
          title: "Perfil do usuário",
          headerTitleAlign: "center",
          headerTintColor: colors.bluePrimary,
        }}
      />
    </Navigator>
  );
};
