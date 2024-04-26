import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View, useColorScheme } from 'react-native';
import AddPost from '../screens/AddPost';
import Home from '../screens/Home';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MainProfile from '../screens/MainProfile';
import UserProfile from '../screens/UserProfile';
import PreferenceProfile from '../screens/PreferenceProfile';
import Favourite from '../screens/Favorite';
import AskUs from '../screens/AskUs';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    const colorScheme = useColorScheme();
    const tabBarColor = colorScheme === 'dark' ? 'white' : 'white';
    const outlineColor = colorScheme === 'dark' ? '#F24822' : '#F24822';
    const circleColor = colorScheme === 'dark' ? 'white' : 'white';


    const navigation = useNavigation();

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <AntDesign
                            onPress={() => navigation.navigate('MainProfile')}
                            color={'#F24822'}
                            name="user"
                            size={35}
                            style={{
                                display: 'flex',
                                marginBottom: 10,
                                padding: 3,
                                marginRight: 10
                            }}
                        />
                    ),
                    headerLeft: () => (
                        <View>
                            <Image
                                source={require('../assets/FF-2.png')}
                                style={{
                                    height: 35,
                                    aspectRatio: 0.9,
                                    marginTop: 10,
                                    marginLeft: 25,
                                    marginBottom: 20
                                }}
                            />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: tabBarColor
                    },
                }}
            >
                <Tab.Screen
                    name='HomeScreen'
                    component={Home}
                    options={{
                        headerTitle: ' ',
                        tabBarIcon: ({ color, size }) => (
                            <TabBarIcon
                                onPress={() => navigation.navigate('AddPost')}
                                color={color}
                                size={size}
                                iconColor='white'
                                circleColor={circleColor}
                                outlineColor={outlineColor}
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen
                    name='AddPost'
                    component={AddPost}
                    options={{
                        headerTitle: '',
                        tabBarStyle: { display: 'none' },
                        tabBarButton: () => null,

                    }}
                />
                <Tab.Screen
                    name='MainProfile'
                    component={MainProfile}
                    options={{
                        headerTitle: '',
                        tabBarButton: () => null,
                        tabBarIcon: ({ color, size }) => (
                            <TabBarIcon
                                onPress={() => navigation.navigate('AddPost')}
                                color={color}
                                size={size}
                                iconColor='white'
                                circleColor={circleColor}
                                outlineColor={outlineColor}
                            />
                        ),
                        tabBarShowLabel: false,
                        headerRight: () => (
                            <View>
                                <Image
                                    source={require('../assets/FF-2.png')}
                                    style={{
                                        height: 35,
                                        aspectRatio: 0.9,
                                        marginTop: 10,
                                        marginRight: 25,
                                        marginBottom: 20
                                    }}
                                />
                            </View>
                        ),
                        headerLeft: () => (
                            <AntDesign
                                onPress={() => navigation.navigate('HomeScreen')}
                                color={"#F24822"}
                                name="back"
                                size={35}
                                style={{
                                    display: 'flex',
                                    marginBottom: 10,
                                    padding: 3,
                                    marginLeft: 10
                                }}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='UserProfile'
                    component={UserProfile}
                    options={{
                        headerTitle: '',
                        tabBarButton: () => null,
                        tabBarIcon: ({ color, size }) => (
                            <TabBarIcon
                                onPress={() => navigation.navigate('AddPost')}
                                color={color}
                                size={size}
                                iconColor='white'
                                circleColor={circleColor}
                                outlineColor={outlineColor}
                            />
                        ),
                        tabBarShowLabel: false,
                        headerRight: () => (
                            <View>
                                <Image
                                    source={require('../assets/FF-2.png')}
                                    style={{
                                        height: 35,
                                        aspectRatio: 0.9,
                                        marginTop: 10,
                                        marginRight: 25,
                                        marginBottom: 20
                                    }}
                                />
                            </View>
                        ),
                        headerLeft: () => (
                            <AntDesign
                                onPress={() => navigation.navigate('HomeScreen')}
                                color={"#F24822"}
                                name="back"
                                size={35}
                                style={{
                                    display: 'flex',
                                    marginBottom: 10,
                                    padding: 3,
                                    marginLeft: 10
                                }}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='PreferenceProfile'
                    component={PreferenceProfile}
                    options={{
                        headerTitle: '',
                        tabBarStyle: { display: 'none' },
                        tabBarButton: () => null,
                        tabBarShowLabel: false,
                        headerRight: () => (
                            <View>
                                <Image
                                    source={require('../assets/FF-2.png')}
                                    style={{
                                        height: 35,
                                        aspectRatio: 0.9,
                                        marginTop: 10,
                                        marginRight: 25,
                                        marginBottom: 20
                                    }}
                                />
                            </View>
                        ),
                        headerLeft: () => (
                            <AntDesign
                                onPress={() => navigation.navigate('MainProfile')}
                                color={"#F24822"}
                                name="back"
                                size={35}
                                style={{
                                    display: 'flex',
                                    marginBottom: 10,
                                    padding: 3,
                                    marginLeft: 10
                                }}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='MyFavorites'
                    component={Favourite}
                    options={{
                        headerTitle: '',
                        tabBarStyle: { display: 'none' },
                        tabBarButton: () => null,
                        tabBarShowLabel: false,
                        headerRight: () => (
                            <View>
                                <Image
                                    source={require('../assets/FF-2.png')}
                                    style={{
                                        height: 35,
                                        aspectRatio: 0.9,
                                        marginTop: 10,
                                        marginRight: 25,
                                        marginBottom: 20
                                    }}
                                />
                            </View>
                        ),
                        headerLeft: () => (
                            <AntDesign
                                onPress={() => navigation.navigate('MainProfile')}
                                color={"#F24822"}
                                name="back"
                                size={35}
                                style={{
                                    display: 'flex',
                                    marginBottom: 10,
                                    padding: 3,
                                    marginLeft: 10
                                }}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='AskUs'
                    component={AskUs}
                    options={{
                        headerTitle: '',
                        tabBarStyle: { display: 'none' },
                        tabBarButton: () => null,
                        tabBarShowLabel: false,
                        headerRight: () => (
                            <View>
                                <Image
                                    source={require('../assets/FF-2.png')}
                                    style={{
                                        height: 35,
                                        aspectRatio: 0.9,
                                        marginTop: 10,
                                        marginRight: 25,
                                        marginBottom: 20
                                    }}
                                />
                            </View>
                        ),
                        headerLeft: () => (
                            <AntDesign
                                onPress={() => navigation.navigate('HomeScreen')}
                                color={"#F24822"}
                                name="back"
                                size={35}
                                style={{
                                    display: 'flex',
                                    marginBottom: 10,
                                    padding: 3,
                                    marginLeft: 10
                                }}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

const TabBarIcon = ({ size, circleColor, outlineColor, onPress }) => (
    <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.outlineCircle, { borderColor: outlineColor }]}>
                <View style={[styles.icon, { backgroundColor: circleColor }]}>
                    <AntDesign name="plus" color={'#F24822'} size={size * 2} />
                </View>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        bottom: 2.5,
        alignSelf: 'center',
    },
    outlineCircle: {
        borderWidth: 2,
        borderRadius: 55,
        borderColor: '#F24822'
    },
    icon: {
        borderRadius: 50,
        padding: 8,
    },
});
