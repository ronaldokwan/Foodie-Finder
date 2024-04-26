import { View, Text, TextInput, Button } from "react-native";
import { StyleSheet, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function Preference() {
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [preference, setPreference] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async (id) => {
    try {
      const input = {
        preference,
      };
      await axios({
        method: "patch",
        url: `https://foodie-finder.naufalsoerya.online/user/${id}`,
        data: input,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      alert("Your preference has been successfully updated");
    } catch (error) {
      alert(error.message);
    }
    navigation.navigate("Home");
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/FF-Background-Removed.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 20,
              }}>
              Choose Your Preference!
            </Text>
          </View>
          <TextInput
            placeholder="select your preference!"
            value={selectedLabel}
            style={{
              height: 50,
              textAlign: "center",
              width: 200,
              borderWidth: 0.5,
              borderRadius: 5,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}
            onPressIn={showModal}
            editable={false}
          />
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={hideModal}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setPreference(itemValue);
                setSelectedLabel(
                  itemIndex === 0
                    ? ""
                    : itemIndex === 1
                    ? "Western Food"
                    : itemIndex === 2
                    ? "Indian Food"
                    : itemIndex === 3
                    ? "Chinese Food"
                    : itemIndex === 4
                    ? "Indonesian Food"
                    : itemIndex === 5
                    ? "Japanese Food"
                    : "",
                );
                hideModal();
              }}
              name="preference"
              style={styles.picker}>
              <Picker.Item
                label="Select an option"
                value=""
              />
              <Picker.Item
                label="Western Food"
                value="Western Food"
              />
              <Picker.Item
                label="Indian Food"
                value="Indian Food"
              />
              <Picker.Item
                label="Chinese Food"
                value="Chinese Food"
              />
              <Picker.Item
                label="Indonesian Food"
                value="Indonesian Food"
              />
              <Picker.Item
                label="Japanese Food"
                value="Japanese Food"
              />
            </Picker>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            onPress={handleSubmit}
            title="Login"
            style={{
              backgroundColor: "#F24822",
              width: 100,
              padding: 10,
              borderRadius: 5,
              margin: 5,
              marginTop: 15,
              marginBottom: 300,
            }}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FFECEC",
          padding: 20,
        }}>
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          title="Skip for now"
          color="#F24822"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFECEC",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    marginRight: 30,
    width: "80%",
    marginTop: 80,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    fontFamily: "Cochin",
  },
});
