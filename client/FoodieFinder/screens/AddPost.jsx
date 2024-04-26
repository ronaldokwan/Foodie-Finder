import { View, Text, Button, TextInput } from "react-native";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const CustomTextInput = ({ value, placeholder, onChangeText }) => {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <View style={styles.textInputContainer}>
      {!isTyping && <Text style={styles.placeholder}>{placeholder}</Text>}
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        textAlignVertical="top"
      />
    </View>
  );
};

export default function AddPost() {
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const input = {
        imageUrl,
        description,
      };

      await axios({
        method: "post",
        url: "https://foodie-finder.naufalsoerya.online/post",
        data: input,
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      });
      alert("Your post has been successfully created");
      navigation.navigate("HomeScreen");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
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
              marginBottom: 30,
              fontFamily: "Helvetica",
              fontSize: 20,
            }}>
            Share your journey!
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
            ImageUrl
          </Text>
        </View>
        <TextInput
          placeholder="https://example.com/image.jpg"
          style={{
            height: "5%",
            width: "70%",
            textAlign: "center",
            borderWidth: 0.5,
            borderRadius: 5,
            margin: 5,
            marginBottom: 15,
          }}
          name="imageUrl"
          onChangeText={setImageUrl}
          value={imageUrl}
        />
        <View style={{ alignItems: "flex-start", width: "70%" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              color: "black",
              fontFamily: "Helvetica",
              fontSize: 15,
            }}>
            Description
          </Text>
        </View>
        <CustomTextInput
          placeholder="it was a good day"
          value={description}
          onChangeText={setDescription}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
              setDescription("");
              setImageUrl("");
            }}
            style={{
              backgroundColor: "#F24822",
              padding: 10,
              borderRadius: 5,
              margin: 5,
              marginTop: 15,
              width: 150,
            }}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}>
              Share!
            </Text>
          </TouchableOpacity>
          <View>
            <Button
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
              title="Back to home"
              color="#F24822"
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 150,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Helvetica",
    color: "black",
  },
  inputContainer: {
    alignItems: "flex-start",
    width: "70%",
    marginBottom: 15,
  },
  label: {
    color: "black",
    fontFamily: "Helvetica",
    fontSize: 15,
  },
  input: {
    height: 40,
    width: "100%",
    textAlign: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 15,
  },
  textInputContainer: {
    width: "70%",
    height: 150,
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  textInput: {
    flex: 1,
    textAlignVertical: "top",
  },
  placeholder: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -8 }],
    color: "gray",
  },
  button: {
    backgroundColor: "#F24822",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
