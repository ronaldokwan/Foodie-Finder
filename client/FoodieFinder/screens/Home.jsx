import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import AuthContext from "../context/auth";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const navigator = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [textInputKey, setTextInputKey] = useState(0);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState([]);
  const [datas, setDatas] = useState("");
  const [posts, setPosts] = useState("");
  const [textQuery, setTextQuery] = useState("");
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

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
      await handleGetPosts();
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
      await handleGetPosts();
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
      await handleGetPosts();
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
      await handleGetPosts();
    } catch (error) {
      alert(error.message);
    }
  };
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const input = {
        textQuery,
      };

      const { data } = await axios({
        method: "post",
        url: "https://foodie-finder.naufalsoerya.online/maps",
        data: input,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      setDatas(data);
      openModal();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTextInput = () => {
    setTextInputKey((prevKey) => prevKey + 1);
    setTextQuery("");
  };

  const handleAddToFavorites = async (index) => {
    try {
      const input = {
        textQuery,
      };
      const { data } = await axios({
        method: "post",
        url: `https://foodie-finder.naufalsoerya.online/favorite/${index}`,
        data: input,
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      alert("Restaurant has been successfully added to favorites");
      setIsAddedToFavorites([...isAddedToFavorites, data.newFavorite.name]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleGetPosts = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://foodie-finder.naufalsoerya.online/post",
        headers: {
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      });
      setPosts(data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    const unsubscribe = navigator.addListener("focus", () => {
      resetTextInput();
    });

    return unsubscribe;
  }, [navigator]);

  useFocusEffect(
    useCallback(() => {
      handleGetPosts();
    }, []),
  );

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View
            style={[
              styles.inputContainer,
              { marginBottom: isInputFocused ? 1 : 1 },
            ]}>
            <TextInput
              key={textInputKey}
              placeholder="What are u craving for?"
              style={[styles.input, { flex: isInputFocused ? 1 : 1 }]}
              onChangeText={setTextQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              name="textQuery"
            />
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#F24822"
                style={styles.ActivityIndicator}
              />
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>→</Text>
              </TouchableOpacity>
            )}
          </View>
          <Modal
            visible={isModalVisible && !isLoading}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {datas &&
                    datas?.data?.places?.map((item, index) => (
                      <View
                        style={styles.containerCardModal}
                        key={index}>
                        <View style={styles.headerModal}>
                          {item &&
                            item.photos &&
                            item.photos.length > 0 &&
                            item.photos[0].name && (
                              <Image
                                source={{
                                  uri: `https://places.googleapis.com/v1/${item?.photos[0]?.name}/media?key=AIzaSyD8hdZF3fs3AJ35R9Dc3gBk7IJ0ZeoGH9Q&maxWidthPx=360`,
                                }}
                                style={styles.avatarModal}
                              />
                            )}
                        </View>
                        <View style={styles.headerText}>
                          <Text style={styles.authorModal}>
                            {item?.displayName?.text}
                          </Text>
                          <Text style={styles.addressModal}>
                            {item?.formattedAddress}
                          </Text>
                          <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>
                              {item?.rating
                                ? `⭐ ${item?.rating}`
                                : "No rating"}
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <MaterialCommunityIcons
                              name="google-maps"
                              size={25}
                              style={styles.gmaps}
                              onPress={() => {
                                Linking.openURL(item.googleMapsUri);
                              }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleAddToFavorites(index)}
                            disabled={isAddedToFavorites.includes(
                              item?.displayName?.text,
                            )}>
                            <AntDesign
                              style={styles.favoriteButton}
                              size={25}
                              name={
                                isAddedToFavorites.includes(
                                  item?.displayName?.text,
                                )
                                  ? "heart"
                                  : "hearto"
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButtonContainer}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Having a problem with your craving for something?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigator.navigate("AskUs")}>
            <Text style={styles.askUsLink}>Ask us!</Text>
          </TouchableOpacity>
        </View>
        {posts &&
          posts.map((item, index) => (
            <View key={index}>
              <View style={styles.containerCard}>
                <TouchableOpacity
                  style={styles.header}
                  onPress={() =>
                    navigator.navigate("UserProfile", { id: item.authorId })
                  }>
                  <Image
                    source={{
                      uri: `https://source.unsplash.com/random/300x200?sig=${item.authorId}`,
                    }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.author}>{item.author.username}</Text>
                    <Text style={styles.time}>
                      {getTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.content}>{item.description}</Text>
                <Image
                  source={{
                    uri: `${item.imageUrl}`,
                  }}
                  style={styles.image}
                />
                <TouchableOpacity>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    <Text style={{ marginRight: 10 }}>{item.like.length}</Text>
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
                        item.dislike.includes(userId) ? "dislike1" : "dislike2"
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
            </View>
          ))}
      </View>
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
    flex: 1,
    left: 20,
    right: 40,
    width: 370,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F24822",
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 5,
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
    left: 15,
    fontSize: 16,
    fontSize: 13,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  closeButtonContainer: {
    bottom: 10,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#F24822",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    width: 60,
  },
  submitButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  askUsLink: {
    color: "#F24822",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 20,
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    width: "100%",
    maxHeight: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  closeButtonContainer: {
    marginTop: 20,
  },
  closeButton: {
    marginTop: 50,
    marginBottom: 100,
    fontSize: 25,
    color: "red",
  },
  modalContent: {
    flex: 1,
    width: "90%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    padding: 10,
  },
  containerCardModal: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: 1,
    elevation: 2,
    position: "relative",
    opacity: 1,
    zIndex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 50,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarModal: {
    width: "100%",
    height: 120,
    marginRight: 8,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  addressModal: {
    fontSize: 14,
    color: "#555",
  },
  authorModal: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  ratingContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
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
    flex: 1,
    left: 15,
    right: 40,
    width: 370,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F24822",
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 5,
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
    left: 15,
    fontSize: 16,
    fontSize: 13,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  closeButtonContainer: {
    bottom: 10,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#F24822",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    width: 60,
  },
  submitButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  askUsLink: {
    color: "#F24822",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 20,
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    width: "100%",
    maxHeight: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  closeButtonContainer: {
    marginTop: 20,
  },
  closeButton: {
    marginTop: 50,
    marginBottom: 100,
    fontSize: 25,
    color: "red",
  },
  modalContent: {
    flex: 1,
    width: "90%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    padding: 10,
  },
  containerCardModal: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: 1,
    elevation: 2,
    position: "relative",
    opacity: 1,
    zIndex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 50,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarModal: {
    width: "100%",
    height: 120,
    marginRight: 8,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  addressModal: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  authorModal: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  ratingContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 5,
    right: 10,
    color: "red",
  },
  gmaps: {
    color: "#F24822",
    bottom: 5,
    right: 50,
    color: "red",
    position: "absolute",
  },
});
