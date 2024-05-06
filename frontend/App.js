import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "./screens/customer/Home";
import RoomDetail from "./screens/customer/RoomDetail";
import HotelDetail from "./screens/customer/HotelDetail";
import Login from "./screens/admin/Login";
import Signup from "./screens/admin/Signup";
import Booking from "./screens/customer/Booking";
import Profile from "./screens/customer/Profile";
import UserContext from "./contexts/UserContext";

import { NativeBaseProvider, View } from "native-base";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

import { UserProvider } from "./contexts/UserContext";

export default function App() {
    return (
        <UserProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="MyTabs">
                        {/* <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false}}
                    /> */}
                        <Stack.Screen
                            name="Signup"
                            component={Signup}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="MyTabs"
                            component={MyTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RoomDetail"
                            component={RoomDetail}
                            options={{ title: "Xem phòng" }}
                        />
                        <Stack.Screen
                            name="HotelDetail"
                            component={HotelDetail}
                            options={{ title: "Xem khách sạn" }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </UserProvider>
    );
}

function MyTabs() {
    const { user } = React.useContext(UserContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { backgroundColor: "#fff", height: 50 },
                tabBarVisible: route.name !== "Login", // Hide tab bar on Login screen
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Trang chủ",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="home"
                            color="#000"
                            size={20}
                        />
                    ),
                }}
            />

            {user ? <Tab.Screen
                name="Booking"
                component={Booking}
                options={{
                    tabBarLabel: "Đặt phòng",
                    tabBarIcon: () => (
                        <MaterialCommunityIcons
                            name="calendar"
                            color="#000"
                            size={20}
                        />
                    ),
                }}
            />: null}
            {user ? (
                <Tab.Screen
                    name="Hồ sơ"
                    component={Profile} // replace with your Profile component
                    options={{
                        tabBarLabel: "Hồ sơ",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="account"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        tabBarLabel: "Đăng nhập",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="login"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
}
