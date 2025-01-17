import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ImageListScreen from "../screen/ImageListScreen";
import FavoriteImageListScreen from "../screen/FavoriteImageListScreen";
import TabIcon from "../components/TabIcon";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          function getIconName() {
            if (route.name === "ImageList") {
              return "home";
            }

            if (route.name === "FavoriteImageList") {
              return "star";
            }
          }
          const iconName = getIconName();
          return (
            <TabIcon
              iconName={iconName}
              iconSize={32}
              iconColor={focused ? "tomato" : "gray"}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ImageList" component={ImageListScreen}></Tabs.Screen>
      <Tabs.Screen
        name="FavoriteImageList"
        component={FavoriteImageListScreen}
      ></Tabs.Screen>
    </Tabs.Navigator>
  );
};
