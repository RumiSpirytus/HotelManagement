import { useState, useEffect, useContext } from "react";
import ManagerContext from "../../contexts/ManagerContext";
import { BASE_URL } from "../../utils";

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";

import {
    Divider,
} from "native-base";


import { AntDesign } from "@expo/vector-icons";

export default function ManagerRoom({navigation, route}) {

    const { count } = useContext(ManagerContext);

    room_id = route.params.room_id;

    console.log(room_id);

    const [room, setRoom] = useState({});

    useEffect(() => {
        const getRoom = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/room/${room_id}`);
                const data = await response.json();
                setRoom(data);
            } catch (error) {
                console.error(error);
            }
        }
        getRoom();
    }, [count]);

    return (
        <ScrollView style={styles.card}>
            <Image source={{ uri: room.logo }} style={styles.image} alt="logo" />
            <View style={styles.infoContainer}>
                <View style={{ display: "flex", gap: 10 }}>
                    <Text style={styles.title}>{room.name}</Text>
                    <Text style={styles.location}>{room.address}</Text>
                    <View style={styles.ratingContainer}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.rating}>{room.rating}</Text>
                            <AntDesign name="star" size={16} color="#fe8813" />
                        </View>
                        <Text style={styles.price}>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(room.price)}
                        </Text>
                    </View>
                </View>

                <Divider
                    my="2"
                    _light={{
                        bg: "muted.800",
                    }}
                    _dark={{
                        bg: "muted.50",
                    }}
                />

                <Text style={styles.description}>{room.room_detail}</Text>

                {/* Tiện ích  */}
                <View style={{ display: "flex", gap: 8 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Tiện ích
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            gap: 12,
                        }}
                    >
                        {room.room_convenient &&
                            room.room_convenient.map((convenient, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 6,
                                            alignItems: "center",
                                        }}
                                        key={index}
                                    >
                                        <AntDesign
                                            name="checkcircleo"
                                            size={20}
                                            color="green"
                                        />
                                        <Text style={{ fontSize: 16 }}>
                                            {convenient}
                                        </Text>
                                    </View>
                                );
                            })}
                    </View>
                </View>

                {/* Đồ dùng  */}
                <View style={{ display: "flex", gap: 8 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Đồ dùng
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            gap: 12,
                        }}
                    >
                        {room.room_supplies &&
                            room.room_supplies.map((supplies, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 6,
                                            alignItems: "center",
                                        }}
                                        key={index}
                                    >
                                        <AntDesign
                                            name="checkcircleo"
                                            size={20}
                                            color="green"
                                        />
                                        <Text style={{ fontSize: 16 }}>
                                            {supplies}
                                        </Text>
                                    </View>
                                );
                            })}
                    </View>
                </View>

                <View style={{ display: "flex", gap: 12 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Hình ảnh phòng
                    </Text>
                    <View style={{ display: "flex", gap: 20 }}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 0,
                                justifyContent: "space-between",
                            }}
                        >
                            {room.images &&
                                room.images.map((image, index) => {
                                    return index < room.images.length / 2 ? (
                                        <Image
                                            key={index}
                                            source={{
                                                uri: `${image}`,
                                            }}
                                            style={{
                                                width: 170,
                                                height: 170,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: "#000",
                                            }}
                                            alt="room image"
                                        />
                                    ) : null;
                                })}
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 0,
                                justifyContent: "space-between",
                            }}
                        >
                            {room.images &&
                                room.images.map((image, index) => {
                                    return index >= room.images.length / 2 ? (
                                        <Image
                                            key={index}
                                            source={{
                                                uri: `${image}`,
                                            }}
                                            style={{
                                                width: 170,
                                                height: 170,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: "#000",
                                            }}
                                            alt="room image"
                                        />
                                    ) : null;
                                })}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
    },
    infoContainer: {
        padding: 20,
        display: "flex",
        gap: 30,
        paddingBottom: 80,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    location: {
        fontSize: 16,
        color: "gray",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rating: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    price: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        color: "gray",
    },
    readMore: {
        color: "blue",
    },
    amenity: {
        flexDirection: "row",
        alignItems: "center",
    },
    hostContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    hostImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    hostName: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    hostRating: {
        fontSize: 16,
        color: "green",
        marginLeft: 10,
    },
    messageButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        marginLeft: "auto",
    },
    bookingButton: {
        backgroundColor: "#1ba7ff",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    bookingButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});