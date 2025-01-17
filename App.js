import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigation from "./src/navigations/BottomTabNavigation"
import RootStackNavigation from "./src/navigations/RootStackNavigation"


export default function App() {
  return (
    <NavigationContainer>
      {/* TODO   */}

    <RootStackNavigation />
    
    
    </NavigationContainer>
  )
};
