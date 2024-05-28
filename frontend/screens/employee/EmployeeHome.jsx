import { ScrollView, View, Text } from "react-native";
import { Image } from "native-base";
import { StyleSheet } from "react-native";
import { Badge } from "native-base";

import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";

import { BASE_URL } from "../../utils";

export default function EmployeeHome() {
    const { count, user } = useContext(UserContext);

    const [bookings, setBookings] = useState([]);

    // get hotel_id by employee_id
    const getHotelId = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/employee/employee_id/${user?.role_id}`);
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
    const getBookings = async (hotel_id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/hotel/${hotel_id}`
            );
            if(!response.ok) {
                alert("Lỗi lấy danh sách đơn đặt phòng");
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Get bookings error: ", error);
            alert("Lỗi lấy danh sách đơn đặt phòng");
        }
    }

    //fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                hotel_id = await getHotelId();
                await getBookings(hotel_id);
            } catch (error) {
                console.error("Fetch bookings error: ", error);
                alert("Lỗi lấy danh sách đơn đặt phòng");
            } 
        }
        fetchBookings();
        console.log("EmployeeHome: bookings", bookings);
    }, [count]);

    return (
        <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 60, display: 'flex', gap: 10, flexDirection: 'column' }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Danh sách đơn đặt phòng
                </Text>
            </View>

            <View style={{ display: "flex" }}>
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <BookingCard
                            key={booking.booking_id}
                            logo={booking.logo}
                            room_name={booking.room_name}
                            booking_status={booking.status}
                            customer_name={booking.customer_name}
                            customer_email={booking.customer_email}
                            booking_id={booking.booking_id}
                        />
                    ))
                ) : (
                    <Text style={{color: 'red'}}>Không có đơn đặt phòng nào</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "col",
        padding: 10,
        margin: 10,
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
    booking_status,
    customer_name,
    customer_email,
    booking_id,
}) => {
    // convert booking_status
    if (booking_status === "PENDING") {
        booking_status = "Chờ xác nhận";
    } else if (booking_status === "CONFIRMED") {
        booking_status = "Đã xác nhận";
    } else {
        booking_status = "Đã hủy";
    }

    let first_section_id = booking_id.split("-")[0];

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
                    <Badge colorScheme={booking_status === 'Chờ xác nhận' ? 'info' : booking_status === 'Đã xác nhận' ? 'success' : 'danger'}>{booking_status}</Badge>
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
            </View>
        </View>
    );
};
