import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn, fetchData } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const input = {
        email,
        password,
      };

      const { data } = await axios({
        method: "post",
        url: "https://foodie-finder.naufalsoerya.online/login",
        data: input,
      });

      await SecureStore.setItemAsync("token", data?.token);
      await SecureStore.setItemAsync("userId", data?.user._id);

      setIsSignedIn(true);
      await fetchData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? -250 : 0}>
        <View style={styles.container}>
          <Image
            source={require("../assets/FF-Background-Removed.png")}
            style={styles.backgroundImage}
          />
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                marginBottom: 15,
                fontFamily: "Helvetica",
                fontSize: 20,
              }}>
              Welcome!
            </Text>
          </View>
          <View style={{ alignItems: "flex-start", width: "70%" }}>
            <Text
              style={{
                alignSelf: "flex-start",
                color: "black",
                fontFamily: "Helvetica",
                fontSize: 15,
              }}>
              Email
            </Text>
          </View>
          <TextInput
            placeholder="JohnDoe@mail.com"
            style={{
              height: "5%",
              width: "70%",
              textAlign: "center",
              borderWidth: 0.5,
              borderRadius: 5,
              margin: 5,
              marginBottom: 15,
            }}
            name="email"
            onChangeText={setEmail}
          />
          <View style={{ alignItems: "flex-start", width: "70%" }}>
            <Text
              style={{
                alignSelf: "flex-start",
                color: "black",
                fontFamily: "Helvetica",
                fontSize: 15,
              }}>
              Password
            </Text>
          </View>
          <TextInput
            placeholder="******"
            secureTextEntry={true}
            style={{
              height: "5%",
              width: "70%",
              borderWidth: 0.5,
              textAlign: "center",
              borderRadius: 5,
              margin: 5,
              alignItems: "center",
            }}
            name="password"
            onChangeText={setPassword}
          />

          <View>
            <TouchableOpacity
              title="Login"
              onPress={handleSubmit}
              style={{
                backgroundColor: "#F24822",
                padding: 10,
                borderRadius: 5,
                margin: 5,
                marginTop: 15,
                marginBottom: 30,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 50,
              }}>
              Don't have an account?
            </Text>
          </View>
          <View>
            <Button
              onPress={() => {
                navigation.navigate("Register");
              }}
              title="Sign up here!"
              color="#F24822"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 150,
    backgroundColor: "#FFECEC",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    marginRight: 30,
    marginTop: 70,
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
