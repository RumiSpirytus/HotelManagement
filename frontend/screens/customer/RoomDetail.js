import React from "react";
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
    const hotelId = route.params.id;

    const [showModal, setShowModal] = useState(false);

    const { imageUrl, title, location, rating, price, host, amenities } = {
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiciambWqCFfWeg1Uz0Dfir_7_K0_Nz6BeGrbPvt9UTQ&s",
        title: "Bali Motel Vung Tau",
        location: "Vung Tau, Vietnam",
        rating: "4.5",
        price: "400.000 VNĐ",
        host: {
            image: "https://via.placeholder.com/50",
            name: "John Doe",
            rating: "4.5",
        },
        amenities: [
            { icon: "🚗", label: "Parking" },
            { icon: "🍳", label: "Breakfast" },
            { icon: "🏊", label: "Pool" },
        ],
    };

    return (
        <ScrollView style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={{ display: "flex", gap: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.location}>{location}</Text>
                    <View style={styles.ratingContainer}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.rating}>{rating}</Text>
                            <AntDesign name="star" size={16} color="#fe8813" />
                        </View>
                        <Text style={styles.price}>{price}/ngày</Text>
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

                <Text style={styles.description}>
                    Set in Vung Tau, 100 metres from Front Beach, Bali Motel
                    Vung Tau offers accommodation with a garden, private parking
                    and a shared...
                </Text>

                <View style={{ display: "flex", gap: 12 }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                        }}
                    >
                        Dịch vụ cung cấp
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                padding: 10,
                                borderColor: "#000",
                                borderWidth: 1,
                                borderRadius: 5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                                height: 100,
                                width: 100,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="bed"
                                size={30}
                                color="black"
                            />
                            <Text>2 Giường</Text>
                        </View>

                        <View
                            style={{
                                padding: 10,
                                borderColor: "#000",
                                borderWidth: 1,
                                borderRadius: 5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                                height: 100,
                                width: 100,
                            }}
                        >
                            <MaterialIcons
                                name="dinner-dining"
                                size={30}
                                color="black"
                            />
                            <Text>3 bữa/ngày</Text>
                        </View>

                        <View
                            style={{
                                padding: 10,
                                borderColor: "#000",
                                borderWidth: 1,
                                borderRadius: 5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                                height: 100,
                                width: 100,
                            }}
                        >
                            <MaterialIcons
                                name="local-parking"
                                size={30}
                                color="black"
                            />
                            <Text>Bãi đỗ xe</Text>
                        </View>
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
                            <Image
                                source={{
                                    uri: "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
                                }}
                                style={{
                                    width: 170,
                                    height: 170,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "#000",
                                }}
                            />
                            <Image
                                source={{
                                    uri: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                                }}
                                style={{
                                    width: 170,
                                    height: 170,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "#000",
                                }}
                            />
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 0,
                                justifyContent: "space-between",
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp",
                                }}
                                style={{
                                    width: 170,
                                    height: 170,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "#000",
                                }}
                            />
                            <Image
                                source={{
                                    uri: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                                }}
                                style={{
                                    width: 170,
                                    height: 170,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "#000",
                                }}
                            />
                        </View>
                    </View>
                </View>

                <Center style={{marginTop: 10}}>
                    <Button onPress={() => setShowModal(true)} style={{width: 250}}>Đặt phòng ngay</Button>
                    <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Đặt phòng</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>Họ tên</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Số điện thoại</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Số người</FormControl.Label>
                                    <Input />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Số ngày</FormControl.Label>
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
        gap: 10,
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
