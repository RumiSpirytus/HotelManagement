import { View, Image, Box, Text, Button, AlertDialog } from "native-base";
import BookingContext from "../../contexts/BookingContext";
import { useEffect, useState, useContext } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import UserContext from "../../contexts/UserContext";
import { BASE_URL } from "../../utils";

const BookingDetail = ({ navigation, route }) => {
    const {count, increaseCount} = useContext(UserContext);

    const booking_id = route.params.id;
    const room_image = route.params.image;
    const room_name = route.params.name;
    const room_address = route.params.address;
    const { getBookingDetail } = useContext(BookingContext);

    const [bookingDetail, setBookingDetail] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/${booking_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "CANCELLED",
                    }),
                }
            );

            if (response.ok) {
                increaseCount();
                alert("Hủy đặt phòng thành công");
            } else {
                const data = await response.json();
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Hủy đặt phòng thất bại");
                }
            }
        } catch (err) {
            console.log(err);
        }

        setIsOpen(false);
    };

    useEffect(() => {
        getBookingDetail(booking_id).then((data) => {
            let first_room_id_section = data.room_id.split("-")[0];
            let first_booking_id_section = data.id.split("-")[0];
            
            setBookingDetail({
                ...data,
                first_room_id_section,
                first_booking_id_section
            })
        });
    }, [count]);

    const date = new Date(bookingDetail?.check_in);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{ uri: room_image }}
                        alt="hotel room"
                        style={{ width: "100%", height: 200, borderRadius: 10 }}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                            paddingRight: 10,
                        }}
                    >
                        <FontAwesome5 name="hotel" size={24} color="#29b6ca" />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginLeft: 10,
                            }}
                        >
                            {room_name}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 20,
                            paddingRight: 10,
                        }}
                    >
                        <Entypo name="location" size={24} color="#f6abb6" />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                marginLeft: 10,
                            }}
                        >
                            {room_address}
                        </Text>
                    </View>

                    {bookingDetail && (
                        <>
                            <DetailItem
                                label="Tên khách hàng"
                                value={bookingDetail.customer_name}
                            />
                            <DetailItem
                                label="Email khách hàng"
                                value={bookingDetail.customer_email}
                            />
                            <DetailItem
                                label="SĐT khách hàng"
                                value={bookingDetail.customer_phone}
                            />
                            <DetailItem
                                label="Số khách"
                                value={bookingDetail.guest_quantity}
                            />
                            <DetailItem
                                label="Ngày nhận phòng"
                                value={formattedDate}
                            />
                            <DetailItem
                                label="Mã phòng"
                                value={bookingDetail.first_room_id_section}
                            />
                            <DetailItem
                                label="Mã đặt"
                                value={bookingDetail.first_booking_id_section}
                            />
                            <StatusItem
                                label="Trạng thái"
                                value={bookingDetail.status}
                            ></StatusItem>
                        </>
                    )}
                </View>

                { bookingDetail && bookingDetail.status && bookingDetail.status == 'PENDING' ? <Button
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: "#f44336",
                        marginTop: 20,
                    }}
                    onPress={() => setIsOpen(true)}
                >
                    Hủy đặt phòng
                </Button> : null}
            </View>

            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Hủy đặt phòng</AlertDialog.Header>
                    <AlertDialog.Body>
                        Bạn có chắc chắn muốn hủy đặt phòng này không?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={() => setIsOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button colorScheme="danger" onPress={onClose}>
                                Xác nhận
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </View>
    );
};

const DetailItem = ({ label, value }) => (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", width: 150 }}>
            {label}:
        </Text>
        <Text style={{ fontSize: 16 }}>{value}</Text>
    </View>
);

const statusText = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    CHECKED_IN: "Đã nhận phòng",
    CHECKED_OUT: "Đã trả phòng",
};

const StatusItem = ({ label, value }) => (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", width: 150 }}>
            {label}:
        </Text>
        <Text
            style={{
                fontSize: 16,
                color:
                    value === "PENDING"
                        ? "blue"
                        : value === "CONFIRMED"
                        ? "green"
                        : value === "CANCELLED"
                        ? "red"
                        : "orange",
                fontWeight: "bold",
            }}
        >
            {statusText[value]}
        </Text>
    </View>
);

export default BookingDetail;
