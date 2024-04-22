import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import {
    Divider,
    Button,
    Modal,
    FormControl,
    Input,
    Center,
} from "native-base";
import { useState } from "react";

import {
    AntDesign,
    FontAwesome5,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

const RoomDetail = ({ navigation, route }) => {
    const room_id = route.params.id;
    const [room, setRoom] = useState({});
    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const res = await fetch(
                    `http://10.0.2.2:8000/api/room/${room_id}`
                );
                const data = await res.json();
                setRoom(data);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoomDetail();
    }, []);

    const [showModal, setShowModal] = useState(false);

    return (
        <ScrollView style={styles.card}>
            <Image source={{ uri: room.logo }} style={styles.image} />
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
                        <Text style={styles.price}>{room.price}</Text>
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
                                        />
                                    ) : null;
                                })}
                        </View>
                    </View>
                </View>

                <Center style={{ marginTop: 10 }}>
                    <Button
                        onPress={() => setShowModal(true)}
                        style={{ width: 250 }}
                    >
                        Đặt phòng ngay
                    </Button>
                    <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Đặt phòng</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>
                                        Họ tên
                                    </FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>
                                        Số điện thoại
                                    </FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>
                                        Số người
                                    </FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>
                                        Số ngày
                                    </FormControl.Label>
                                    <Input />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        Xác nhận
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
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

export default RoomDetail;
