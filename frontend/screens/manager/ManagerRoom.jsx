import { useState, useEffect, useContext } from "react";
import ManagerContext from "../../contexts/ManagerContext";
import { BASE_URL } from "../../utils";

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Modal, Input, FormControl, Button } from "native-base";

import { Divider } from "native-base";

import { AntDesign } from "@expo/vector-icons";

export default function ManagerRoom({ navigation, route }) {
    const { count, increaseCount } = useContext(ManagerContext);

    room_id = route.params.room_id;

    const [room, setRoom] = useState({});

    const [isEditDetail, setIsEditDetail] = useState(false);
    const [isEditLogo, setIsEditLogo] = useState(false);

    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editRating, setEditRating] = useState(0);
    const [editLogo, setEditLogo] = useState("");
    const [editImages, setEditImages] = useState("");
    const [editConvenient, setEditConvenient] = useState("");
    const [editSupplies, setEditSupplies] = useState("");

    useEffect(() => {
        const getRoom = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/room/${room_id}`);
                const data = await response.json();
                setRoom(data);
                setEditName(data.name);
                setEditDescription(data.room_detail);
                setEditRating(data.rating);
                setEditLogo(data.logo);
                setEditImages(data.images.join());
                setEditConvenient(data.room_convenient.join());
                setEditSupplies(data.room_supplies.join());
            } catch (error) {
                console.error(error);
            }
        };
        getRoom();
    }, [count]);

    return (
        <ScrollView style={styles.card}>
            <TouchableOpacity onPress={() => setIsEditLogo(true)}>
                <Image
                    source={{ uri: room.logo }}
                    style={styles.image}
                    alt="logo"
                />
            </TouchableOpacity>

            <Modal isOpen={isEditLogo} onClose={() => setIsEditLogo(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Chỉnh sửa logo</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>URL</FormControl.Label>
                            <Input
                                defaultValue={editLogo}
                                onChangeText={(text) => {
                                    setEditLogo(text);
                                }}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setIsEditLogo(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                onPress={async () => {
                                    try {
                                        const response = await fetch(
                                            `${BASE_URL}/api/room/${room_id}`,
                                            {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    logo: editLogo,
                                                }),
                                            }
                                        );
                                        if (response.ok) {
                                            alert("Chỉnh sửa logo thành công.");
                                            setIsEditLogo(false);
                                            increaseCount();
                                        } else {
                                            const data  = await response.json();
                                            if (data.message) {
                                                alert(data.message);
                                            } else {
                                                alert("Đã xảy ra lỗi khi chỉnh sửa logo.");
                                            }
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        alert(
                                            "Đã xảy ra lỗi khi chỉnh sửa logo."
                                        );
                                    }
                                    setIsEditLogo(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <View style={styles.infoContainer}>
                <View style={{ display: "flex", gap: 10 }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                        }}
                    >
                        <Text style={styles.title}>{room.name}</Text>
                        <AntDesign name="edit" size={24} color="green" onPress={() => setIsEditDetail(true)} />
                    </View>
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

                    <Modal
                        isOpen={isEditDetail}
                        onClose={() => setIsEditDetail(false)}
                    >
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>
                                Chỉnh sửa thông tin phòng
                            </Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <FormControl.Label>
                                        Tên phòng
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editName}
                                        onChangeText={(text) => {
                                            setEditName(text);
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Đánh giá
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editRating.toString()}
                                        onChangeText={(text) => {
                                            setEditRating(text);
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Mô tả phòng
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editDescription}
                                        onChangeText={(text) => {
                                            setEditDescription(text);
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Hình ảnh
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editImages}
                                        onChangeText={(text) => {
                                            setEditImages(text);
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Tiện ích
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editConvenient}
                                        onChangeText={(text) => {
                                            setEditConvenient(text);
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControl.Label>
                                        Đồ dùng
                                    </FormControl.Label>
                                    <Input
                                        defaultValue={editSupplies}
                                        onChangeText={(text) => {
                                            setEditSupplies(text);
                                        }}
                                    />
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setIsEditDetail(false);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onPress={async () => {
                                            try {
                                                const response = await fetch(
                                                    `${BASE_URL}/api/room/${room_id}`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            name: editName,
                                                            rating: editRating,
                                                            room_detail:
                                                                editDescription,
                                                            images: editImages
                                                                .split(",")
                                                                .map((image) =>
                                                                    image.trim()
                                                                ),
                                                            room_convenient:
                                                                editConvenient
                                                                    .split(",")
                                                                    .map(
                                                                        (
                                                                            convenient
                                                                        ) =>
                                                                            convenient.trim()
                                                                    ),
                                                            room_supplies:
                                                                editSupplies
                                                                    .split(",")
                                                                    .map(
                                                                        (
                                                                            supplies
                                                                        ) =>
                                                                            supplies.trim()
                                                                    ),
                                                        }),
                                                    }
                                                );
                                                if (response.ok) {
                                                    alert(
                                                        "Chỉnh sửa thông tin phòng thành công"
                                                    );
                                                    setIsEditDetail(false);
                                                    increaseCount();
                                                } else {
                                                    const data = await response.json();
                                                    if (data.message) {
                                                        alert(data.message);
                                                    } else {
                                                        alert(
                                                            "Đã xảy ra lỗi khi chỉnh sửa thông tin phòng"
                                                        );
                                                    }
                                                }
                                            } catch (error) {
                                                console.error(error);
                                                alert(
                                                    "Đã xảy ra lỗi khi chỉnh sửa thông tin phòng"
                                                );
                                            }
                                            setIsEditDetail(false);
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
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
