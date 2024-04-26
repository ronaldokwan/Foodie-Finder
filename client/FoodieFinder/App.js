import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from "./navigators/StackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
