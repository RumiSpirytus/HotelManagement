import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "./screens/Home";
import Login from "./screens/Login";

import { NativeBaseProvider } from "native-base";

import { View } from "native-base";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                {/* <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: "Trang chủ",
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            title: "Đăng nhập",
                        }}
                    />
                </Stack.Navigator> */}
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: "white",
                        tabBarInactiveTintColor: "gray",
                        tabBarStyle: {
                            backgroundColor: "#fff",
                            height: 50, // Adjust this value to change the height of the tab bar
                        },
                    }}
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
                        name="Login"
                        component={Login}
                        options={{
                            tabBarLabel: "Đăng nhập",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="login"
                                    color="#000"
                                    size={20}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
