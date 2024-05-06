import { View, Text, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import RoomBooked from "../../components/customer/RoomBooked";

import React from "react";

const Booking = ({ navigation, route }) => {
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        const fetchBookingByCustomerId = async () => {
            try {
                const response = await fetch("http://10.0.2.2:8000/api/booking");
                if (!response.ok) {
                    throw new Error("Something went wrong!");
                } else {
                    const data = await response.json();
                    setRooms(data);
                    console.log(data);
                }
            } catch(error) {
                console.log(error);
            }
        }
        fetchBookingByCustomerId();
    }, []);


    return (
        <View style={{paddingTop: 20}}>
            {/* Phòng còn trống */}
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    padding: 16,
                }}
            >
                <View>
                    <Text className=" text-lg font-semibold">
                        Phòng đã đặt
                    </Text>
                </View>

                <ScrollView horizontal>
                    <View className="flex flex-row">
                        {rooms.map((room) => (
                            <RoomBooked
                                key={room.id}
                                image={room.logo}
                                name={room.room_name}
                                address={room.hotel_address}
                                booking_id={room.booking_id}
                                navigation={navigation}
                                id={room.id}
                                room_id={room.room_id}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Booking;