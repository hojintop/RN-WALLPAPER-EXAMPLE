import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import BottomTabNavigation from "./src/navigations/BottomTabNavigation"
import RootStackNavigation from "./src/navigations/RootStackNavigation"
import { Provider } from "react-redux"
import store from "./src/stores/store"


export default function App() {
  return (
    <NavigationContainer>
      {/* TODO   */}

    <Provider store={store}>

      <RootStackNavigation />
    </Provider>
    
    
    </NavigationContainer>
  )
};
