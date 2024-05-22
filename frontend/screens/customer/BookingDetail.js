import { View, Image, Box, Text, Button, AlertDialog } from "native-base";
import BookingContext from "../../contexts/BookingContext";
import { useEffect, useState, useContext } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import UserContext from "../../contexts/UserContext";
import { BASE_URL } from "../../utils";

const BookingDetail = ({ navigation, route }) => {
    const booking_id = route.params.id;
    const room_image = route.params.image;
    const room_name = route.params.name;
    const room_address = route.params.address;
    const { getBookingDetail } = useContext(BookingContext);
    const {increaseCount} = useContext(UserContext);

    const [bookingDetail, setBookingDetail] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/${booking_id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                increaseCount();
                alert("Hủy đặt phòng thành công");
                navigation.navigate("Booking");
            }
        } catch (err) {
            console.log(err);
        }

        setIsOpen(false);

    };

    useEffect(() => {
        getBookingDetail(booking_id).then((data) => {
            setBookingDetail(data);
            console.log(data);
        });
    }, []);

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
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <FontAwesome5 name="hotel" size={24} color="#29b6ca" />
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
                            {room_name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <Entypo name="location" size={24} color="#f6abb6" />
                        <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 10 }}>
                            {room_address}
                        </Text>
                    </View>

                    {bookingDetail && (
                        <>
                            <DetailItem label="Tên khách hàng" value={bookingDetail.customer_name} />
                            <DetailItem label="Email khách hàng" value={bookingDetail.customer_email} />
                            <DetailItem label="SĐT khách hàng" value={bookingDetail.customer_phone} />
                            <DetailItem label="Số khách" value={bookingDetail.guest_quantity} />
                            <DetailItem label="Ngày nhận phòng" value={formattedDate} />
                            <DetailItem label="Mã phòng" value={bookingDetail.room_id} />
                            <DetailItem label="Mã đặt" value={bookingDetail.id} />
                        </>
                    )}
                </View>

                <Button
                    style={{ marginHorizontal: 20, backgroundColor: "#f44336", marginTop: 20 }}
                    onPress={() => setIsOpen(true)}
                >
                    Hủy đặt phòng
                </Button>
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
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
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
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "red", width: 150 }}>{label}:</Text>
        <Text style={{ fontSize: 16 }}>{value}</Text>
    </View>
);

export default BookingDetail;
