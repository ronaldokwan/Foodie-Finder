import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const input = {
        fullname,
        email,
        password,
        username,
      };

      await axios({
        method: "post",
        url: "https://foodie-finder.naufalsoerya.online/register",
        data: input,
      });
      alert("Your account has been successfully created");
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? -180 : 0}>
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
                marginBottom: 20,
                fontFamily: "Helvetica",
                fontSize: 20,
              }}>
              Register your account!
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
              Full Name
            </Text>
          </View>
          <TextInput
            placeholder="John Doe"
            style={{
              height: "5%",
              width: "70%",
              textAlign: "center",
              borderWidth: 0.5,
              borderRadius: 5,
              margin: 5,
              marginBottom: 15,
            }}
            name="fullname"
            onChangeText={setFullname}
          />
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
              borderWidth: 0.5,
              textAlign: "center",
              borderRadius: 5,
              margin: 5,
              alignItems: "center",
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
              Username
            </Text>
          </View>
          <TextInput
            placeholder="johndoe"
            style={{
              height: "5%",
              width: "70%",
              borderWidth: 0.5,
              textAlign: "center",
              borderRadius: 5,
              margin: 5,
              alignItems: "center",
              marginBottom: 15,
            }}
            name="username"
            onChangeText={setUsername}
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
            placeholder="**********"
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
              onPress={handleSubmit}
              title="register"
              style={{
                backgroundColor: "#F24822",
                padding: 10,
                borderRadius: 5,
                margin: 5,
                marginTop: 15,
                marginBottom: 30,
                width: "100%",
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  width: "auto",
                }}>
                Sign me up!
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={() => {
                navigation.navigate("Login");
              }}
              title="Back to login"
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
    paddingBottom: 130,
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
