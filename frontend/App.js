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

import { NativeBaseProvider } from "native-base";

import { View } from "native-base";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MyTabs">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false}}
                    />
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
    );
}

function MyTabs() {
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

            <Tab.Screen
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
            />
        </Tab.Navigator>
    );
}
