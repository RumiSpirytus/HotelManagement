import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "./screens/customer/Home";
import RoomDetail from "./screens/customer/RoomDetail";

import { NativeBaseProvider } from "native-base";

import { View } from "native-base";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RoomDetail"
                        component={RoomDetail}
                        options={{  title: 'Xem phòng'}}
                    />
                </Stack.Navigator>
                {/* <MyTabs /> */}
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 50,
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
        </Tab.Navigator>
    );
}
