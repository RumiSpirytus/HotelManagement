import { Text, ScrollView, View, FlatList, Image } from "native-base";

import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MyHotel from "../../components/manager/MyHotel";
import { useEffect, useContext, useState } from "react";

import UserContext from "../../contexts/UserContext";
import ManagerContext from "../../contexts/ManagerContext";

import { BASE_URL } from "../../utils";

export default function MangerHome({ navigation }) {
    const { user } = useContext(UserContext);
    const { count } = useContext(ManagerContext);

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const getHotels = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/hotel/manager/${user?.role_id}`
                );
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Failed to get hotels:", error);
            }
        };

        getHotels();
    }, [count]);

    const [payments, setPayments] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getHotelId = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/hotel/manager/${user?.role_id}`
                );
                if (!response.ok) {
                    alert("Lỗi lấy hotel_id");
                }
                const data = await response.json();
                return data.id;
            } catch (error) {
                console.error("Get hotel_id error: ", error);
                alert("Lỗi lấy hotel_id");
            }
        };

        const getAllPayment = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/payment/manager/${user?.role_id}`
                );
                if (!response.ok) {
                    alert("Lỗi lấy payment");
                    return []; // return an empty array when the request fails
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Get all payment error: ", error);
                alert("Lỗi lấy payment");
                return []; // return an empty array when an error occurs
            }
        };

        //get employees length
        const getEmployees = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/employee/count/manager/${user?.role_id}`
                );
                if (!response.ok) {
                    alert("Lỗi lấy employees");
                    return 0;
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Get employees error: ", error);
                alert("Lỗi lấy employees");
                return 0;
            }
        };

        getHotelId().then(() => {
            getAllPayment().then((data) => {
                setPayments(data);
            });
            getEmployees().then((data) => {
                setEmployees(data);
            });
        }
        );
    }, [count]);

    const totalRevenue = payments.reduce(
        (total, payment) => {
            return total + payment.amount;
        },

        0
    );

    const totalGuest = payments.reduce(
        (total, payment) => {
            return total + payment.guest_quantity;
        },

        0
    );

    

    return (
        <ScrollView
            style={{
                paddingHorizontal: 20,
                paddingVertical: 60,
                display: "flex",
                gap: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    paddingVertical: 10,
                    fontWeight: "bold",
                }}
            >
                Khách sạn của bạn
            </Text>

            {/* Danh sách khách sạn của bạn */}
            <View>
                <FlatList
                    gap={10}
                    horizontal
                    data={hotels}
                    renderItem={(item) => {
                        return (
                            <MyHotel
                                id={item.item.id}
                                name={item.item.name}
                                address={item.item.address}
                                description={item.item.description}
                                logo={item.item.logo}
                                rating={item.item.rating}
                                navigation={navigation}
                            />
                        );
                    }}
                />
            </View>

            {/* Thống kê  */}
            <View
                style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 16,
                    paddingBottom: 80,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        paddingVertical: 10,
                        fontWeight: "bold",
                    }}
                >
                    Thống kê
                </Text>
                {/* Tổng doanh thu  */}
                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fdf1f8",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                    }}
                >
                    <FontAwesome5 name="money-bill" size={24} color="green" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Tổng doanh thu
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {totalRevenue}
                    </Text>
                </View>

                {/* Số lượng khách hàng  */}
                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f6f5ff",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                        marginTop: 12,
                    }}
                >
                    <Entypo name="users" size={24} color="blue" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Số lượng khách hàng
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {totalGuest}
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ebf5ff",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                        marginTop: 12,
                    }}
                >
                    <MaterialCommunityIcons
                        name="human"
                        size={40}
                        color="pink"
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Số lượng nhân viên
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{employees}</Text>
                </View>
            </View>
        </ScrollView>
    );
}
