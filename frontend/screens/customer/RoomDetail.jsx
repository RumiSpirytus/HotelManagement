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
    Stack,
    WarningOutlineIcon,
    Box,
} from "native-base";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import UserContext from "../../contexts/UserContext";
import BookingContext from "../../contexts/BookingContext";

import { BASE_URL } from "../../utils";

const RoomDetail = ({ navigation, route }) => {
    const { user, count, increaseCount } = React.useContext(UserContext);
    const { getBooking } = React.useContext(BookingContext);
    const room_id = route.params.id;

    const [isBooked, setIsBooked] = useState(false);

    useEffect(() => {
        getBooking().then((data) => {
            if (data) {
                data.forEach((booking) => {
                    if (booking.room_id == route.params.id) {
                        setIsBooked(true);
                    }
                });
            }
        });
    }, [count]);

    let customer_id;
    if (user) {
        customer_id = user.role_id;
    }

    const [room, setRoom] = useState({});
    useEffect(() => {
        const fetchRoomDetail = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/room/${room_id}`);
                const data = await res.json();
                setRoom(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoomDetail();
    }, []);

    const [showModal, setShowModal] = useState(false);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(!show);
        setDate(currentDate);
    };

    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formPhone, setFormPhone] = useState("");
    const [formPeople, setFormPeople] = useState("");

    const [validName, setValidName] = useState({
        valid: true,
        error: "",
    });
    const [validEmail, setValidEmail] = useState({
        valid: true,
        error: "",
    });
    const [validPhone, setValidPhone] = useState({
        valid: true,
        error: "",
    });
    const [validPeople, setValidPeople] = useState({
        valid: true,
        error: "",
    });

    function validForm() {
        let valid = true;
        if (formName === "") {
            setValidName({
                valid: false,
                error: "Họ tên không được để trống",
            });
            valid = false;
        } else {
            setValidName({
                valid: true,
                error: "",
            });
        }

        if (formEmail === "") {
            setValidEmail({
                valid: false,
                error: "Email không được để trống",
            });
            valid = false;
        } else {
            setValidEmail({
                valid: true,
                error: "",
            });
        }

        if (formPhone === "") {
            setValidPhone({
                valid: false,
                error: "Số điện thoại không được để trống",
            });
            valid = false;
        } else {
            setValidPhone({
                valid: true,
                error: "",
            });
        }

        if (formPeople === "") {
            setValidPeople({
                valid: false,
                error: "Số người không được để trống",
            });
            valid = false;
        } else {
            setValidPeople({
                valid: true,
                error: "",
            });
        }

        return valid;
    }

    async function handleSubmit() {
        if (validForm()) {
            formData = {
                customer_id: customer_id,
                room_id: room_id,
                check_in: date,
                guest_quantity: formPeople,
                customer_name: formName,
                customer_email: formEmail,
                customer_phone: formPhone,
                created_at: new Date(),
                updated_at: new Date(),
            };

            console.log(formData);

            try {
                const response = await fetch(`${BASE_URL}/api/booking`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert("Đặt phòng thành công");
                    increaseCount();
                } else {
                    alert("Đặt phòng thất bại");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    function resetForm() {
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormPeople("");
        setDate(new Date());
        setShow(false);

        setValidName({
            valid: true,
            error: "",
        });
        setValidEmail({
            valid: true,
            error: "",
        });
        setValidPhone({
            valid: true,
            error: "",
        });
        setValidPeople({
            valid: true,
            error: "",
        });
    }

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
                    {!isBooked ? (
                        <Button
                            onPress={() => {
                                if (user) {
                                    setShowModal(true);
                                } else {
                                    navigation.navigate("Login");
                                }
                            }}
                            style={{ width: 250, marginBottom: 40 }}
                        >
                            Đặt phòng ngay
                        </Button>
                    ) : (
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "red",
                                marginBottom: 40,
                            }}
                        >
                            Bạn đã đặt phòng này
                        </Text>
                    )}
                    <Modal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Đặt phòng</Modal.Header>
                            <Modal.Body>
                                <Box>
                                    <FormControl isInvalid={!validName.valid}>
                                        <FormControl.Label>
                                            Họ tên
                                        </FormControl.Label>
                                        <Input
                                            value={formName}
                                            onChangeText={(text) => {
                                                setFormName(text);
                                            }}
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            {validName.error}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        mt="3"
                                        isInvalid={!validEmail.valid}
                                    >
                                        <FormControl.Label>
                                            Email
                                        </FormControl.Label>
                                        <Input
                                            value={formEmail}
                                            onChangeText={(text) =>
                                                setFormEmail(text)
                                            }
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            {validEmail.error}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        mt="3"
                                        isInvalid={!validPhone.valid}
                                    >
                                        <FormControl.Label>
                                            Số điện thoại
                                        </FormControl.Label>
                                        <Input
                                            value={formPhone}
                                            onChangeText={(text) =>
                                                setFormPhone(text)
                                            }
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            {validPhone.error}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        mt="3"
                                        isInvalid={!validPeople.valid}
                                    >
                                        <FormControl.Label>
                                            Số người
                                        </FormControl.Label>
                                        <Input
                                            value={formPeople}
                                            onChangeText={(text) =>
                                                setFormPeople(text)
                                            }
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            {validPeople.error}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <FormControl mt="3">
                                        <FormControl.Label>
                                            Ngày nhận phòng
                                        </FormControl.Label>
                                        <Input
                                            type="date"
                                            placeholder="Nhập ngày nhận phòng"
                                            value={date
                                                .toISOString()
                                                .substring(0, 10)}
                                            onTouchStart={() => setShow(true)}
                                        />
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </FormControl>
                                </Box>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            resetForm();
                                            setShowModal(false);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            if (validForm()) {
                                                handleSubmit();
                                                //reset form
                                                resetForm();
                                                setShowModal(false);
                                            }
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
