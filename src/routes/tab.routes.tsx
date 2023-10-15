import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 

import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
// import { Favorites } from "../screens/Wishlist/wishlist";
// import { Profile } from "../screens/Profile/profile";
import { useApptheme } from "../hooks/useAppTheme";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";

const { Screen, Navigator } = createBottomTabNavigator();

export const TabRoutes = () => {
  const { colors } = useApptheme()

  return (
    <Navigator screenOptions={{ 
      tabBarStyle: {
        backgroundColor: colors.gray3,
        borderTopColor: colors.primary,
        borderTopWidth: 1
      },
      tabBarHideOnKeyboard: true,
      tabBarInactiveTintColor: colors.bluePrimaryLight,
      tabBarActiveTintColor: colors.bluePrimary,
    }}>
      <Screen 
        name="home"
        component={HomeScreen}
        options={{
          title: "Início",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <FontAwesome name="home" size={size} color={color} />
        }}
      />

      {/* <Screen 
        name="favorites"
        component={Favorites}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ size, color }) => <FontAwesome name="heart" size={size} color={color} />
        }}
      /> */}

      {/* <Screen 
        name="profile"
        component={Profile}
        options={{
          title: "Perfil",
          tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />
        }}
      /> */}
    </Navigator>
  )
}