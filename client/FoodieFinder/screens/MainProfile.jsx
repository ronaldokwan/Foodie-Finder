import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../context/auth";
import { useContext, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { useCallback } from "react";

export default function MainProfile() {
  const { userId } = useContext(AuthContext);
  const [dataPostById, setDataPostById] = useState("");
  const navigation = useNavigation();

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const getPostById = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://foodie-finder.naufalsoerya.online/post/${userId}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });

      setDataPostById(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPostById();
    }, []),
  );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {dataPostById &&
        dataPostById.map((item, index) => (
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyFavorites")}>
                  <Text style={styles.fav}>My Favorites →</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate("PreferenceProfile")}>
                <AntDesign
                  name="setting"
                  size={30}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginBottom: 20,
                  marginTop: 10,
                }}>
                My Posts
              </Text>
            </View>
            {item.posts.map((item, index) => (
              <View key={index}>
                <View style={styles.containerCard}>
                  <View style={styles.header}>
                    <Image
                      source={{
                        uri: `${item.imageUrl}`,
                      }}
                      style={styles.avatar}
                    />
                    <View style={styles.headerText}>
                      <Text style={styles.author}>
                        {" "}
                        {item.description.length > 15
                          ? `${item.description.slice(0, 15)}...`
                          : item.description}
                      </Text>
                      <Text style={styles.time}>
                        {getTimeAgo(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <AntDesign
                        name="like2"
                        size={25}
                        style={{
                          display: "flex",
                          padding: 5,
                        }}
                      />
                      <Text style={{ marginRight: 10 }}>
                        {item.like.length}
                      </Text>
                      <AntDesign
                        name="dislike2"
                        size={25}
                        style={{
                          display: "flex",
                          padding: 5,
                        }}
                      />
                      <Text>{item.dislike.length}</Text>
                      <TouchableOpacity
                        style={styles.settingsButtonPost}
                        onPress={async () => {
                          await axios({
                            method: "delete",
                            url: `https://foodie-finder.naufalsoerya.online/post/${item._id}`,
                            headers: {
                              Authorization:
                                "Bearer " +
                                (await SecureStore.getItemAsync("token")),
                            },
                          });
                          alert("Post has been succesfully deleted");
                          getPostById();
                        }}>
                        <AntDesign
                          name="delete"
                          size={25}
                          color="#333"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
    marginTop: 250,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: "rgba(228, 51, 51, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  formContainer: {
    left: "10%",
    right: "10%",
    marginTop: 10,
    width: 350,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F24822",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#F24822",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: 12,
    marginLeft: 6,
  },
  containerCard: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    elevation: 2,
    position: "relative",
    opacity: 1,
    zIndex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 10,
  },
  avatar: {
    width: 150,
    height: 80,
    borderRadius: 5,
    marginRight: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#555",
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    borderStyle: "solid",
  },
  avatarHeader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginRight: 25,
  },
  settingsButtonPost: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 220,
  },
  insight: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  settingsButton: {
    flex: 1,
    marginTop: 25,
    alignItems: "flex-end",
  },
  fav: {
    color: "#555",
    marginLeft: 5,
    marginTop: 2,
  },
});
