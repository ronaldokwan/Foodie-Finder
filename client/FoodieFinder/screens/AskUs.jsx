import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function AskUs() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textInputKey, setTextInputKey] = useState(0);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const inputData = {
        input,
      };
      const { data } = await axios({
        method: "post",
        url: "https://foodie-finder.naufalsoerya.online/ai",
        data: inputData,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      const newChats = [
        ...chats,
        { message: input, isSelf: true },
        { message: data.result, isSelf: false },
      ];
      setChats(newChats);
      resetTextInput();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTextInput = () => {
    setTextInputKey((prevKey) => prevKey + 1);
    setInput("");
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 80}>
        <View style={styles.container}>
          <View style={styles.chatContainer}>
            {isLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.loading}
              />
            )}
            <ScrollView>
              {chats.map((chat, index) => (
                <View
                  key={index}
                  style={[
                    styles.chatBubble,
                    chat.isSelf
                      ? styles.selfChatBubble
                      : styles.otherChatBubble,
                  ]}>
                  <Text style={styles.chatText}>{chat.message}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                key={textInputKey}
                style={styles.input}
                onChangeText={setInput}
                placeholder="Type a message..."
                name="input"
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
  chatTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 5,
  },
  onlineUsers: {
    marginTop: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    bottom: 35,
    marginTop: 30,
  },
  sendButton: {
    backgroundColor: "#F24822",
    paddingHorizontal: 15,
    borderRadius: 5,
    height: "150%",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    height: "150%",
    borderWidth: 1,
  },
  selfChatBubble: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherChatBubble: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#EAEAEA",
  },
  chatText: {
    fontSize: 18,
  },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flexWrap: "wrap",
    overflow: "hidden",
  },
  loading: {
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "75%",
  },
});
