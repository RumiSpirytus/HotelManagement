import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Home from "./screens/customer/Home";
import RoomDetail from "./screens/customer/RoomDetail";
import HotelDetail from "./screens/customer/HotelDetail";
import BookingDetail from "./screens/customer/BookingDetail";
import Login from "./screens/admin/Login";
import Signup from "./screens/admin/Signup";
import Booking from "./screens/customer/Booking";
import Profile from "./screens/customer/Profile";
import UserContext from "./contexts/UserContext";

//manager
import MangerHome from "./screens/manager/ManagerHome";
import RegisterHotel from "./screens/manager/RegisterHotel";
import ManagerProfile from "./screens/manager/ManagerProfile";
import ManagerHotel from "./screens/manager/ManagerHotel";
import ManagerRoom from "./screens/manager/ManagerRoom";

//employee
import EmployeeHome from "./screens/employee/EmployeeHome";
import EmployeeCheckin from "./screens/employee/EmployeeCheckin";
import EmployeeReport from "./screens/employee/EmployeeReport";
import Logout from "./screens/employee/Logout";

import { NativeBaseProvider, View } from "native-base";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

import { UserProvider } from "./contexts/UserContext";
import { BookingProvider } from "./contexts/BookingContext";
import { ManagerProvider } from "./contexts/ManagerContext";

import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
    return (
        <UserProvider>
            <ManagerProvider>
                <BookingProvider>
                    <NativeBaseProvider>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="Trang chủ">
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
                                    name="Trang chủ"
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
                                <Stack.Screen
                                    name="BookingDetail"
                                    component={BookingDetail}
                                    options={{ title: "Xem đơn đặt phòng" }}
                                />
                                <Stack.Screen
                                    name="ManagerHotel"
                                    component={ManagerHotel}
                                    options={{ title: "Quản lý khách sạn" }}
                                />
                                <Stack.Screen
                                    name="ManagerRoom"
                                    component={ManagerRoom}
                                    options={{ title: "Quản lý phòng" }}
                                />
                                <Stack.Screen
                                    name="EmployeeHome"
                                    component={EmployeeHome}
                                    options={{ title: "Nhân viên" }}
                                />

                                <Stack.Screen
                                    name="EmployeeCheckin"
                                    component={EmployeeCheckin}
                                    options={{ title: "Thanh toán" }}
                                />
                                <Stack.Screen
                                    name="EmployeeReport"
                                    component={EmployeeReport}
                                    options={{ title: "Thống kê" }}
                                />
                                <Stack.Screen
                                    name="Logout"
                                    component={Logout}
                                    options={{ title: "Đăng xuất" }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </NativeBaseProvider>
                </BookingProvider>
            </ManagerProvider>
        </UserProvider>
    );
}

function MyTabs() {
    const { user, logoutUser } = React.useContext(UserContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { backgroundColor: "#fff", height: 50 },
                tabBarVisible: route.name !== "Login", // Hide tab bar on Login screen
            })}
        >
            {!user || user.role === "customer" ? (
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
            ) : null}

            {user && user.role === "customer" ? (
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
            ) : null}

            {user && user.role === "customer" ? (
                <Tab.Screen
                    name="Hồ sơ"
                    component={Profile}
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
            ) : null}

            {/* manager menu  */}
            {user && user.role === "manager" ? (
                <Tab.Screen
                    name="Manager"
                    component={MangerHome}
                    options={{
                        tabBarLabel: "Quản lý",
                        tabBarIcon: () => (
                            <MaterialIcons
                                name="manage-accounts"
                                size={24}
                                color="black"
                            />
                        ),
                    }}
                />
            ) : null}

            {user && user.role === "manager" ? (
                <Tab.Screen
                    name="Hồ sơ"
                    component={ManagerProfile}
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
            ) : null}

            {user && user.role === "manager" ? (
                <Tab.Screen
                    name="RegisterHotel"
                    component={RegisterHotel}
                    options={{
                        tabBarLabel: "Đăng ký khách sạn",
                        tabBarIcon: () => (
                            <AntDesign
                                name="pluscircle"
                                size={20}
                                color="black"
                            />
                        ),
                    }}
                />
            ) : null}

            {/* employee menu  */}
            {user && user.role === "employee" ? (
                <Tab.Screen
                    name="EmployeeHome"
                    component={EmployeeHome}
                    options={{
                        tabBarLabel: "Đơn đặt phòng",
                        tabBarIcon: () => (
                            <MaterialIcons
                                name="manage-accounts"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            ) : null}

            {user && user.role === "employee" ? (
                <Tab.Screen
                    name="EmployeeReport"
                    component={EmployeeReport}
                    options={{
                        tabBarLabel: "Thống kê",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="chart-bar"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            ) : null}

            {user && user.role === "employee" ? (
                <Tab.Screen
                    name="EmployeeCheckin"
                    component={EmployeeCheckin}
                    options={{
                        tabBarLabel: "Thanh toán",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="cash"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            ) : null}

            {user && user.role === "employee" ? (
                <Tab.Screen
                    name="Logout"
                    component={Logout}
                    options={{
                        tabBarLabel: "Đăng xuất",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="logout"
                                color="#000"
                                size={20}
                            />
                        ),
                    }}
                />
            ) : null}

            {/* general menu  */}
            {!user ? (
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
            ) : null}
        </Tab.Navigator>
    );
}
