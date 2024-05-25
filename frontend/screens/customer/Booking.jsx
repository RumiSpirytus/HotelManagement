import { View, Text, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import RoomBooked from "../../components/customer/RoomBooked";
import UserContext from "../../contexts/UserContext";
import BookingContext from "../../contexts/BookingContext";

import React from "react";

const Booking = ({ navigation, route }) => {
    const { user, count } = React.useContext(UserContext);
    const {booking, getBooking} = React.useContext(BookingContext);

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getBooking().then((data) => {
            setRooms(data);
        });
    }, [count]);

    return (
        <View style={{ paddingTop: 40, paddingBottom: 120 }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    padding: 16,
                }}
            >
                <View>
                    <Text className=" text-lg font-semibold">Phòng đã đặt</Text>
                </View>

                {rooms && rooms.length > 0 ? (
                    <ScrollView style={{display: 'flex', width: '100%'}}>
                        <View style={{display: 'flex', flexDirection: 'column', gap: 16, width: '100%'}}>
                            {rooms.map((room, index) => (
                                <RoomBooked
                                    key={index}
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
                ) : (
                    <Text style={{color: 'red'}}>Bạn chưa đặt phòng nào</Text>
                )}
            </View>
        </View>
    );
};

export default Booking;
