import { View, Image, Text, Badge } from "native-base";
import { TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function HotelCard({
    logo,
    name,
    rating,
    price,
    is_hired,
    id,
    room_size,
    navigation,
}) {
    const handlePress = () => {
        navigation.navigate("ManagerRoom", { room_id: id });
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View
                key={id}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    borderWidth: 1,
                    borderColor: "#a8a7a7",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: "white",
                }}
            >
                <Image
                    source={{ uri: logo }}
                    alt="room"
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        flexBasis: "30%",
                    }}
                />

                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        justifyContent: "space-between",
                        flexBasis: "70%",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 16,
                            marginLeft: 4,
                        }}
                    >
                        {name}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="size-xs"
                            size={24}
                            color="#5e7cfa"
                        />
                        <Text>{room_size}m2</Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 6,
                            alignItems: "center",
                        }}
                    >
                        <Entypo name="star" size={20} color="#ffd81c" />
                        <Text>{rating}</Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingLeft: 4,
                            paddingRight: 30,
                        }}
                    >
                        <Text>
                            {price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </Text>
                        {is_hired ? (
                            <Badge colorScheme="danger">Hết</Badge>
                        ) : (
                            <Badge colorScheme="success">Trống</Badge>
                        )}
                        {/* <Badge colorScheme="info">INFO</Badge>
                <Badge colorScheme="coolGray">DARK</Badge> */}
                    </View>
                </View>
            </View>
         </TouchableOpacity>
    );
}
