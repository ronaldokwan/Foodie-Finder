import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import AuthContext from "../context/auth";

export default function UserProfile() {
  const [datas, setDatas] = useState("");
  const [userName, setUserName] = useState("");
  const route = useRoute();
  const { id } = route.params;
  const { userId } = useContext(AuthContext);
  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const toggleLike = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `https://foodie-finder.naufalsoerya.online/like/${id}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      await handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };
  const toggleUnLike = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `https://foodie-finder.naufalsoerya.online/unlike/${id}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      await handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };
  const toggleDislike = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `https://foodie-finder.naufalsoerya.online/dislike/${id}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      await handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };
  const toggleUnDisLike = async (id) => {
    try {
      await axios({
        method: "patch",
        url: `https://foodie-finder.naufalsoerya.online/undislike/${id}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      await handleGetData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGetData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://foodie-finder.naufalsoerya.online/post/${id}`,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      setUserName(data[0].username);
      setDatas(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetData();
    }, [id]),
  );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {datas &&
        datas.map((item, index) => (
          <View
            style={styles.container}
            key={index}>
            <View style={styles.profileHeader}>
              <Image
                source={{
                  uri: `https://images.unsplash.com/photo-1474447976065-67d23accb1e3?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                }}
                style={styles.avatarHeader}
              />
              <View>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.Pref}>
                  Food Preference: {item.preference ? item.preference : "-"}
                </Text>
              </View>
            </View>
            {item.posts &&
              item.posts.map((item, index) => (
                <View
                  style={styles.containerCard}
                  key={index}>
                  <View>
                    <Image
                      source={{
                        uri: `https://images.unsplash.com/photo-1474447976065-67d23accb1e3?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                      }}
                      style={styles.avatar}
                    />
                    <View style={styles.daleman}>
                      <Text style={styles.author}>{userName}</Text>
                      <Text
                        style={styles.time}
                        key={index}>
                        {getTimeAgo(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.content}>{item.description}</Text>
                  <Image
                    source={{
                      uri: `${item.imageUrl}`,
                    }}
                    style={styles.image}
                  />
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <AntDesign
                        onPress={() => {
                          if (item.dislike.includes(userId)) {
                            alert("You need to undislike this post");
                          } else if (item.like.includes(userId)) {
                            toggleUnLike(item._id);
                            alert("Post unliked");
                          } else {
                            toggleLike(item._id);
                            alert("Post liked");
                          }
                        }}
                        name={item.like.includes(userId) ? "like1" : "like2"}
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
                        onPress={() => {
                          if (item.like.includes(userId)) {
                            alert("You need to unlike this post");
                          } else if (item.dislike.includes(userId)) {
                            toggleUnDisLike(item._id);
                            alert("Post undisliked");
                          } else {
                            toggleDislike(item._id);
                            alert("Post disliked");
                          }
                        }}
                        name={
                          item.dislike.includes(userId)
                            ? "dislike1"
                            : "dislike2"
                        }
                        size={25}
                        style={{
                          display: "flex",
                          padding: 5,
                        }}
                      />
                      <Text>{item.dislike.length}</Text>
                    </View>
                  </TouchableOpacity>
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
    flex: 1,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    position: "relative",
    opacity: 1,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
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
    padding: 16,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderStyle: "solid",
  },
  avatarHeader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  settingsButton: {
    marginTop: 25,
    marginLeft: 120,
  },
  settingsButtonPost: {
    position: "absolute",
    right: 20,
    bottom: 10,
  },
  Pref: {
    fontSize: 12,
    color: "#555",
    marginLeft: 8,
    marginTop: 5,
  },
  daleman: {
    position: "absolute",
    left: 50,
    top: 2,
  },
});
