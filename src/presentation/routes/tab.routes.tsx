import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen/FavoriteScreen";
import { useAppTheme } from "../../presentation/hooks/useAppTheme";
import { ProfileScreen } from "../screens/ProfileScreen/ProfileScreen";
import { useAuthStore } from "../stores/authStore";
import { useController } from "../../presentation/hooks/useController";
import { AuthController } from "../../../controllers/auth.controller";

const { Screen, Navigator } = createBottomTabNavigator();

export const TabRoutes = () => {
  const { colors } = useAppTheme();
  const setUser = useAuthStore((state) => state.setUser);

  const authController = useController<AuthController>("AuthController");

  const handleSignOut = async () => {
    await authController.signOut();
    setUser(null);
  };

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopColor: colors.primary,
          borderTopWidth: 1,
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: colors.bluePrimaryLight,
        tabBarActiveTintColor: colors.bluePrimary,
      }}
    >
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Início",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="favorites"
        component={FavoriteScreen}
        options={{
          title: "Favoritos",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: colors.bluePrimary,
          headerStyle: {
            borderBottomWidth: 2,
            borderColor: colors.bluePrimary,
          },
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          headerTintColor: colors.bluePrimary,
          headerStyle: {
            borderBottomWidth: 2,
            borderColor: colors.bluePrimary,
          },
          headerRight: ({ tintColor }) => (
            <MaterialIcons
              name="logout"
              size={24}
              color={tintColor}
              style={{ marginRight: 20 }}
              onPress={handleSignOut}
              selectionColor={colors.bluePrimaryLight}
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
