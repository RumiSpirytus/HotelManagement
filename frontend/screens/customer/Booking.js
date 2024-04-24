import { View, Text, ScrollView } from "native-base";

export default function Booking() {
    return (
        <View>
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
                        Phòng còn trống
                    </Text>
                </View>

                <ScrollView horizontal>
                    {/* <View className="flex flex-row">
                        {availableRooms.map((room) => (
                            <AvailableRoom
                                key={room.id}
                                image={room.logo}
                                name={room.name}
                                address={room.address}
                                price={room.price}
                                navigation={navigation}
                                id={room.id}
                            />
                        ))}
                    </View> */}
                </ScrollView>
            </View>
        </View>
    );
}
