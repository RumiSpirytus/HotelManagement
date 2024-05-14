import { View, Image, Box, Text } from "native-base";

import BookingContext from "../../contexts/BookingContext";

import { useEffect, useState, useContext } from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const BookingDetail = ({ navigation, route }) => {
    const booking_id = route.params.id;
    const room_image = route.params.image;
    const room_name = route.params.name;
    const room_address = route.params.address;

    const { getBookingDetail } = useContext(BookingContext);

    const [bookingDetail, setBookingDetail] = useState(null);

    useEffect(() => {
        getBookingDetail(booking_id).then((data) => {
            setBookingDetail(data);
            console.log(data);
        });
    }, []);

    const date = new Date(bookingDetail?.check_in);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, gap: 8 }}>
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Image
                        source={{
                            uri: `${room_image}`,
                        }}
                        alt="hotel logo"
                        style={{
                            width: "100%",
                            height: 200,
                        }}
                    />
                </View>

                <View style={{ display: "flex", gap: 20, padding: 10 }}>
                    <View style={{ display: "flex", gap: 8, paddingRight: 20 }}>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 12,
                            }}
                        >
                            <FontAwesome5
                                name="hotel"
                                size={24}
                                color="#29b6ca"
                            />
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                {room_name}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 12,
                            }}
                        >
                            <Entypo name="location" size={24} color="#f6abb6" />
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                {room_address}
                            </Text>
                        </View>
                    </View>

                    <View style={{ display: "flex", gap: 12, paddingRight: 60 }}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Tên khách hàng:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.customer_name}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Email khách hàng:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.customer_email}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                SĐT khách hàng:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.customer_phone}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Số khách:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.guest_quantity}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Ngày nhận phòng:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {formattedDate}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Mã phòng:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.room_id}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                            >
                                Mã đặt:{" "}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                                {bookingDetail?.id}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BookingDetail;
