import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
import axios from "axios";

export default function PreferenceProfile() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [dataUser, setDataUser] = useState("");
  const [preference, setPreference] = useState("");
  const { setIsSignedIn } = useContext(AuthContext);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const getUserById = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://foodie-finder.naufalsoerya.online/user",
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      setPreference(data[0].preference);
      setDataUser(data);
    } catch (error) {
      alert(error.message);
    }
  };

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
      getUserById();
    } catch (error) {
      alert(error.message);
    }
    navigation.navigate("PreferenceProfile");
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      {dataUser &&
        dataUser.map((item, index) => (
          <View
            style={styles.container}
            key={index}>
            <View style={styles.profileHeader}>
              <Image
                source={{
                  uri: `https://source.unsplash.com/random/300x200?sig=${index}`,
                }}
                style={styles.avatarHeader}
              />
              <View>
                <Text style={styles.username}>{item.username}</Text>
              </View>
            </View>
            <View>
              <View style={styles.row}>
                <Text style={styles.label}> Full Name </Text>
                <Text style={styles.value}>{item.fullname}</Text>
              </View>
            </View>
            <View>
              <View style={styles.row}>
                <Text style={styles.labelEmail}> Email </Text>
                <Text style={styles.value}>{item.email}</Text>
              </View>
            </View>
            <View>
              <View style={styles.row}>
                <Text style={styles.labelPref}> Preference </Text>
                <TextInput
                  placeholder="your preference"
                  value={preference ? preference : selectedLabel}
                  style={{
                    flexDirection: "row",
                    flex: 0.8,
                    height: 40,
                    textAlign: "center",
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
                      label="Select your preference"
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
            </View>
            <View>
              <TouchableOpacity
                title="save"
                // onPress={() => navigation.navigate("MainProfile")}
                onPress={handleSubmit}
                style={{
                  backgroundColor: "#F24822",
                  padding: 10,
                  borderRadius: 5,
                  margin: 5,
                  marginTop: 15,
                  marginBottom: 30,
                  width: 200,
                  alignSelf: "center",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}>
                  Save My Change
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                title="logout"
                onPress={async () => {
                  await SecureStore.deleteItemAsync("token");
                  await SecureStore.deleteItemAsync("userId");
                  setIsSignedIn(false);
                }}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  margin: 5,
                  marginTop: 15,
                  marginBottom: 30,
                  width: 200,
                  alignSelf: "center",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    padding: 10,
  },
  avatarHeader: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginTop: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    marginLeft: 20,
    fontSize: 18,
    marginRight: 50,
  },
  labelEmail: {
    marginLeft: 20,
    fontSize: 18,
    marginRight: 85,
  },
  labelPref: {
    marginLeft: 20,
    fontSize: 18,
    marginRight: 90,
    marginBottom: 15,
  },
  value: {
    flex: 1,
    marginLeft: 50,
    marginRight: 10,
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
