import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import Preference from "../screens/Preference";
import Register from "../screens/Register";
import Login from "../screens/Login";
import AuthContext from "../context/auth";
import { useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
import axios from "axios";

export default function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://foodie-finder.naufalsoerya.online/user",
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });

      const hasPref = data[0].preference;
      if (hasPref) {
        navigation.navigate("Home");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  (async () => {
    const token = await SecureStore.getItemAsync("token");
    const userId = await SecureStore.getItemAsync("userId");

    if (token && userId) {
      setIsSignedIn(true);
      setUserId(userId);
    }
  })();
  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, userId, fetchData }}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                tabBarStyle: { display: "none" },
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
                tabBarStyle: { display: "none" },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Preference"
              component={Preference}
              options={{
                headerShown: false,
                tabBarStyle: { display: "none" },
              }}
            />
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            {/* {hasPreference ? (
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Preference"
                component={Preference}
                options={{
                  headerShown: false,
                  tabBarStyle: { display: "none" },
                }}
              />
            )} */}
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
