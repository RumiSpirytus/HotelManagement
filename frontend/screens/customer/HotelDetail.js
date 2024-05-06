import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { Divider } from "native-base";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";

import AvailableRoom from "../../components/customer/AvailableRoom";

const HotelDetail = ({ navigation, route }) => {
    const hotel_id = route.params.id;
    const [hotel, setHotel] = useState({});
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchHotelDetail = async () => {
            try {
                const res = await fetch(
                    `http://10.0.2.2:8000/api/hotel/${hotel_id}`
                );
                const data = await res.json();
                setHotel(data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchRooms = async () => {
            try {
                const res = await fetch(
                    `http://10.0.2.2:8000/api/room/hotel/${hotel_id}`
                );
                const data = await res.json();
                setRooms(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRooms();
        fetchHotelDetail();
    }, []);

    return (
        <ScrollView style={styles.card}>
            <Image source={{ uri: hotel.logo }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={{ display: "flex", gap: 10 }}>
                    <Text style={styles.title}>{hotel.name}</Text>
                    <Text style={styles.location}>{hotel.address}</Text>
                    <View style={styles.ratingContainer}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.rating}>{hotel.rating}</Text>
                            <AntDesign name="star" size={16} color="#fe8813" />
                        </View>
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

                <Text style={styles.description}>{hotel.description}</Text>

                {/* hình ảnh khách sạn  */}
                <View style={{ display: "flex", gap: 12 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Hình ảnh khách sạn
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
                            {hotel.images &&
                                hotel.images.map((image, index) => {
                                    return index < hotel.images.length / 2 ? (
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
                            {hotel.images &&
                                hotel.images.map((image, index) => {
                                    return index >= hotel.images.length / 2 ? (
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
                                        />
                                    ) : null;
                                })}
                        </View>
                    </View>
                </View>

                {/* phòng hiện tại  */}
                <View style={{ display: "flex", gap: 12 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Phòng hiện tại
                    </Text>

                    {rooms && rooms.length > 0 ? (
                        <ScrollView horizontal>
                            <View className="flex flex-row">
                                {rooms.map((room) => (
                                    <AvailableRoom
                                        key={room.id}
                                        image={room.logo}
                                        name={room.name}
                                        address={room.address}
                                        price={room.price}
                                        navigation={navigation}
                                        id={room.id}
                                        size={room.room_size}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <Text style={{ fontSize: 16 }}>
                            Khách sạn hiện không còn phòng khả dụng
                        </Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: 200,
    },
    infoContainer: {
        padding: 20,
        display: "flex",
        gap: 30,
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

export default HotelDetail;
