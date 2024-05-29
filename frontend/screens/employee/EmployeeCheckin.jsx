import { View, Text, FlatList } from "react-native";
import { Image, Button, AlertDialog } from "native-base";
import { StyleSheet } from "react-native";

import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";

import { BASE_URL } from "../../utils";

export default function EmployeeCheckout() {
    const { count, user } = useContext(UserContext);

    const [bookings, setBookings] = useState([]);

    // get hotel_id by employee_id
    const getHotelId = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/employee/employee_id/${user?.role_id}`
            );
            if (!response.ok) {
                alert("Lỗi lấy hotel_id");
            }
            const data = await response.json();
            return data.hotel_id;
        } catch (error) {
            console.error("Get hotel_id error: ", error);
            alert("Lỗi lấy hotel_id");
        }
    };

    // get bookings by hotel_id
    const getBookingCheckedIn = async (hotel_id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/hotel/checked-in/${hotel_id}`
            );
            if (!response.ok) {
                alert("Lỗi lấy danh sách đơn đặt phòng");
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Get bookings error: ", error);
            alert("Lỗi lấy danh sách đơn đặt phòng");
        }
    };

    //fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                hotel_id = await getHotelId();
                await getBookingCheckedIn(hotel_id);
            } catch (error) {
                console.error("Fetch bookings error: ", error);
                alert("Lỗi lấy danh sách đơn đặt phòng");
            }
        };
        fetchBookings();
    }, [count]);

    return (
        <FlatList
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 60,
            }}
            data={bookings}
            keyExtractor={(item) => item.booking_id}
            ListHeaderComponent={
                <View style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Danh sách phòng đã check in
                    </Text>
                </View>
            }
            ListEmptyComponent={
                <Text style={{ color: "red" }}>
                    Không phòng nào đã check in
                </Text>
            }
            renderItem={({ item }) => (
                <BookingCard
                    key={item.booking_id}
                    logo={item.logo}
                    room_name={item.room_name}
                    booking_status={item.status}
                    customer_name={item.customer_name}
                    customer_email={item.customer_email}
                    booking_id={item.booking_id}
                    check_in={item.check_in}
                    guest_quantity={item.guest_quantity}
                    price={item.price}
                    customer_id={item.customer_id}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "col",
        padding: 10,
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: "100%",
        aspectRatio: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    infoContainer: {
        marginHorizontal: 5,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    roomName: { fontSize: 18, fontWeight: "bold" },
    status: { color: "green" },
    customerName: { marginTop: 5 },
    customerEmail: { marginTop: 5, color: "gray" },
});

const BookingCard = ({
    logo,
    room_name,
    customer_name,
    customer_email,
    booking_id,
    check_in,
    guest_quantity,
    price,
    customer_id
}) => {
    let first_section_id = booking_id.split("-")[0];

    // convert date to format dd/mm/yyyy
    let check_in_ui = new Date(check_in);
    check_in_ui = `${check_in_ui.getDate()}/${
        check_in_ui.getMonth() + 1
    }/${check_in_ui.getFullYear()}`;

    //convert price to currency format
    let ui_price = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);

    //calculate day numbers
    let check_in_date = new Date(check_in);
    let check_out_date = new Date();
    let dayDiff = Math.ceil(
        (check_out_date - check_in_date) / (1000 * 60 * 60 * 24)
    );

    //calculate total price
    let total = price * guest_quantity * dayDiff;
    //convert price to currency format
    let total_amount = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(total);

    const [isPayment, setIsPayment] = useState(false);

    const {user, count, increaseCount} = useContext(UserContext);

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: logo }}
                style={styles.image}
                alt="room logo"
            />
            <View style={styles.infoContainer}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                    }}
                >
                    <Text style={styles.roomName}>{room_name}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Tên khách hàng:</Text>
                    <Text style={{ color: "red" }}>{customer_name}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Email khách hàng:</Text>
                    <Text style={{ color: "red" }}>{customer_email}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Mã đặt phòng:</Text>
                    <Text style={{ color: "red" }}>{first_section_id}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Ngày nhận phòng:</Text>
                    <Text style={{ color: "red" }}>{check_in_ui}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Số người:</Text>
                    <Text style={{ color: "red" }}>{guest_quantity}</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Đơn giá:</Text>
                    <Text style={{ color: "red" }}>{ui_price}</Text>
                </View>
            </View>

            <Button
                style={{ marginTop: 15 }}
                onPress={() => {
                    setIsPayment(true);
                }}
            >
                Thanh toán
            </Button>

            <AlertDialog isOpen={isPayment} onClose={() => setIsPayment(false)}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Xác nhận thanh toán</AlertDialog.Header>
                    <AlertDialog.Body>
                        <View
                            style={{
                                display: "flex ",
                                flexDirection: "row",
                                gap: 5,
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontStyle: "italic",
                                }}
                            >
                                Tổng tiền:
                            </Text>
                            <Text>{total_amount}</Text>
                        </View>
                        <View
                            style={{
                                display: "flex ",
                                flexDirection: "row",
                                gap: 5,
                                maxWidth: "100%",
                                flexWrap: "wrap",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontStyle: "italic",
                                    color: "red",
                                    fontSize: 12,
                                }}
                            >
                                *Ghi chú:
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                Tổng tiền = Đơn giá * Số khách * Số ngày
                            </Text>
                        </View>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={() => setIsPayment(false)}
                            >
                                Hủy
                            </Button>
                            <Button colorScheme="danger" onPress={async () => {
                                let form_data = {
                                    "customer_id": customer_id,
                                    "booking_id": booking_id,
                                    "employee_id": user?.role_id,
                                    "amount": total,
                                    "payment_date": new Date(),
                                    "created_at": new Date(),
                                    "updated_at": new Date()
                                }
                                console.log(form_data);
                                try {
                                    const response = await fetch(
                                        `${BASE_URL}/api/payment`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(form_data),
                                        }
                                    );
                                    console.log(response);
                                    if (!response.ok) {
                                        alert("Lỗi thanh toán");
                                    }
                                    setIsPayment(false);
                                    alert("Thanh toán thành công");
                                    increaseCount();
                                } catch (error) {
                                    console.error("Payment error: ", error);
                                    alert("Lỗi thanh toán");
                                }
                            }}>Xác nhận</Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </View>
    );
};
