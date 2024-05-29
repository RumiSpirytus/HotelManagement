import { View, Text } from "react-native";

import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../utils";

export default function EmployeeReport() {
    const { user, count } = useContext(UserContext);

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

    //get all payment by hotel_id
    const getAllPayment = async (hotel_id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/payment/hotel/${hotel_id}`
            );
            if (!response.ok) {
                alert("Lỗi lấy payment");
                return []; // return an empty array when the request fails
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Get all payment error: ", error);
            alert("Lỗi lấy payment");
            return []; // return an empty array when an error occurs
        }
    };

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getHotelId().then((hotel_id) => {
            getAllPayment(hotel_id).then((data) => {
                setPayments(data);
            });
        });
    }, [count]);

    // get total revenue
    const totalRevenue = payments.reduce((total, payment) => {
        return total + payment.amount;
    }, 0);

    // get total booking
    const totalBooking = payments.length;

    // get total guest
    const totalGuest = payments.reduce((total, payment) => {
        return total + payment.guest_quantity;
    }, 0);

    return (
        <View
            style={{
                paddingHorizontal: 20,
                paddingVertical: 60,
                display: "flex",
                gap: 15,
            }}
        >
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Thống kê khách sạn
                </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "green" }}
                >
                    Doanh thu:
                </Text>
                <Text style={{ fontSize: 18 }}>{totalRevenue}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "green" }}
                >
                    Tổng số đơn đặt phòng:
                </Text>
                <Text style={{ fontSize: 18 }}>{totalBooking}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "green" }}
                >
                    Tổng số khách:
                </Text>
                <Text style={{ fontSize: 18 }}>{totalGuest}</Text>
            </View>
        </View>
    );
}
