import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import { Image } from "native-base";
import { StyleSheet } from "react-native";
import { Badge } from "native-base";

import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";

import { BASE_URL } from "../../utils";

import { Center, Box, Select, CheckIcon, VStack, Input } from "native-base";

import { AntDesign } from "@expo/vector-icons";

export default function EmployeeHome() {
    const { count, user } = useContext(UserContext);

    const [bookings, setBookings] = useState([]);
    let [service, setService] = useState("");

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
    const getBookings = async (hotel_id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/hotel/${hotel_id}`
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
                await getBookings(hotel_id);
            } catch (error) {
                console.error("Fetch bookings error: ", error);
                alert("Lỗi lấy danh sách đơn đặt phòng");
            }
        };
        fetchBookings();
    }, [count]);

    const [filter, setFilter] = useState({
        booking_status: "",
        customer_name: "",
        customer_email: "",
        booking_id: "",
    });

    const handleFilterChange = (key, value) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value,
        }));
    };

    const filteredBookings = bookings.filter((booking) => {
        return (
            (filter.booking_status === "" ||
                booking.status.includes(filter.booking_status)) &&
            (filter.customer_name === "" ||
                booking.customer_name.includes(filter.customer_name)) &&
            (filter.customer_email === "" ||
                booking.customer_email.includes(filter.customer_email)) &&
            (filter.booking_id === "" ||
                booking.booking_id.includes(filter.booking_id))
        );
    });

    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 60 }}>
            <Text style={{marginBottom: 10, fontSize: 20, fontWeight: 'bold'}}>Tìm kiếm</Text>
            <Select
                selectedValue={filter.booking_status}
                onValueChange={(itemValue) =>
                    handleFilterChange("booking_status", itemValue)
                }
                placeholder="Select booking status"
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={4} />,
                }}
            >
                <Select.Item label="Tất cả" value="" />
                <Select.Item label="Chờ xác nhận" value="PENDING" />
                <Select.Item label="Đã hủy" value="CANCELLED" />
                <Select.Item label="Đã nhận phòng" value="CHECKED_IN" />
                <Select.Item label="Đã trả phòng" value="CHECKED_OUT" />
            </Select>
            <TextInput
                placeholder="Lọc theo tên khách hàng"
                value={filter.customer_name}
                onChangeText={(text) =>
                    handleFilterChange("customer_name", text)
                }
                style={{ marginTop: 20,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 5,
                    borderRadius: 5,
                    width: "100%"

                 }}
            />
            <TextInput
                placeholder="Lọc theo email khách hàng"
                value={filter.customer_email}
                onChangeText={(text) =>
                    handleFilterChange("customer_email", text)
                }
                style={{ marginTop: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 5,
                    borderRadius: 5,
                    width: "100%"

                 }}
            />
            <TextInput
                placeholder="Lọc theo mã đặt phòng"
                value={filter.booking_id}
                onChangeText={(text) => handleFilterChange("booking_id", text)}
                style={{ marginTop: 10,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 5,
                    borderRadius: 5,
                    width: "100%"

                 }}
            />
            <FlatList
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 200 }}
                data={filteredBookings}
                keyExtractor={(item) => item.booking_id}
                ListHeaderComponent={
                    <View style={{ marginBottom: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Danh sách đơn đặt phòng
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={{ color: "red" }}>
                        Không có đơn đặt phòng nào
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
                    />
                )}
            />
        </View>
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
    booking_status,
    customer_name,
    customer_email,
    booking_id,
}) => {
    const { count, increaseCount } = useContext(UserContext);
    // convert booking_status
    if (booking_status === "PENDING") {
        booking_status = "Chờ xác nhận";
    } else if (booking_status === "CONFIRMED") {
        booking_status = "Đã xác nhận";
    } else if (booking_status === "CANCELLED") {
        booking_status = "Đã hủy";
    } else if (booking_status === "CHECKED_IN") {
        booking_status = "Đã nhận phòng";
    } else if (booking_status === "CHECKED_OUT") {
        booking_status = "Đã trả phòng";
    }

    let first_section_id = booking_id.split("-")[0];

    const [isEditStatus, setIsEditStatus] = useState(false);
    const [status, setStatus] = useState(booking_status);

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
                    {!isEditStatus ? (
                        <TouchableOpacity
                            onPress={() => {
                                if (booking_status !== "Đã trả phòng") {
                                    setIsEditStatus(true);
                                }
                            }}
                        >
                            <Badge
                                colorScheme={
                                    booking_status === "Chờ xác nhận"
                                        ? "info"
                                        : booking_status === "Đã xác nhận"
                                        ? "success"
                                        : booking_status === "Đã hủy"
                                        ? "danger"
                                        : booking_status === "Đã nhận phòng"
                                        ? "warning"
                                        : "gray"
                                }
                            >
                                {booking_status}
                            </Badge>
                        </TouchableOpacity>
                    ) : (
                        <Center>
                            <Box maxW="100">
                                <Select
                                    placeholder={booking_status}
                                    minWidth="110"
                                    accessibilityLabel="Thao tác"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: (
                                            <AntDesign
                                                name="checkcircle"
                                                size={24}
                                                color="black"
                                            />
                                        ),
                                    }}
                                    mt={1}
                                    onValueChange={async (itemValue) => {
                                        if (itemValue === "cancel-action") {
                                            setIsEditStatus(false);
                                            return;
                                        }
                                        try {
                                            const response = await fetch(
                                                `${BASE_URL}/api/booking/${booking_id}`,
                                                {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        status: itemValue,
                                                    }),
                                                }
                                            );
                                            if (!response.ok) {
                                                alert(
                                                    "Lỗi cập nhật trạng thái"
                                                );
                                            }
                                            increaseCount();
                                        } catch {
                                            console.error(
                                                "Update status error"
                                            );
                                            alert("Lỗi cập nhật trạng thái");
                                        }

                                        setIsEditStatus(false);
                                    }}
                                >
                                    <Select.Item
                                        label={
                                            <Text style={{ color: "green" }}>
                                                Xác nhận
                                            </Text>
                                        }
                                        value="CONFIRMED"
                                    />
                                    <Select.Item
                                        label={
                                            <Text style={{ color: "blue" }}>
                                                Chờ xác nhận
                                            </Text>
                                        }
                                        value="PENDING"
                                    />
                                    <Select.Item
                                        label={
                                            <Text style={{ color: "red" }}>
                                                Hủy đơn
                                            </Text>
                                        }
                                        value="CANCELLED"
                                    />

                                    <Select.Item
                                        label={
                                            <Text style={{ color: "#fdba74" }}>
                                                Nhận phòng
                                            </Text>
                                        }
                                        value="CHECKED_IN"
                                    />

                                    <Select.Item
                                        label={
                                            <Text style={{ color: "black" }}>
                                                Hủy thao tác
                                            </Text>
                                        }
                                        value="cancel-action"
                                        color={"red"}
                                    />
                                </Select>
                            </Box>
                        </Center>
                    )}
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
