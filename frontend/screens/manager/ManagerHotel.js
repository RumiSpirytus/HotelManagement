import { ScrollView, View, Text, Image } from "native-base";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Badge } from "native-base";

const roomsData = [
    {
        id: 1,
        name: "Phòng 1",
        price: 1000000,
        logo: "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
        images: [
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
        ],
        room_detail: "Mô tả phòng 1",
        room_conveninet: [
            "Tiện ích phòng 1",
            "Tiện ích phòng 1",
            "Tiện ích phòng 1",
        ],
        room_supplies: [
            "Vật dụng phòng 1",
            "Vật dụng phòng 1",
            "Vật dụng phòng 1",
        ],
        room_size: 20,
        is_hired: true,
        rating: 4.2,
    },
    {
        id: 2,
        name: "Phòng 2",
        price: 2000000,
        logo: "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
        images: [
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
        ],
        room_detail: "Mô tả phòng 2",
        room_conveninet: [
            "Tiện ích phòng 2",
            "Tiện ích phòng 2",
            "Tiện ích phòng 2",
        ],
        room_supplies: [
            "Vật dụng phòng 2",
            "Vật dụng phòng 2",
            "Vật dụng phòng 2",
        ],
        room_size: 25,
        is_hired: false,
        rating: 5,
    },
    {
        id: 3,
        name: "Phòng 3",
        price: 3000000,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
        ],
        room_detail: "Mô tả phòng 3",
        room_conveninet: [
            "Tiện ích phòng 3",
            "Tiện ích phòng 3",
            "Tiện ích phòng 3",
        ],
        room_supplies: [
            "Vật dụng phòng 3",
            "Vật dụng phòng 3",
            "Vật dụng phòng 3",
        ],
        room_size: 30,
        is_hired: true,
        rating: 3,
    },
];

export default function ManagerHotel({ route, navigation }) {
    const hotel_id = route.params.hotel_id;
    const logo = route.params.logo;
    const name = route.params.name;
    const address = route.params.address;
    const rating = route.params.rating;

    return (
        <ScrollView style={{ display: "flex", flexDirection: "column" }}>
            <Image
                source={{ uri: logo }}
                style={{ width: "100%", height: 200 }}
                alt="Image"
            />

            <View
                style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 12,
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <FontAwesome5 name="hotel" size={24} color="#70bc59" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {name}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <Entypo name="location" size={24} color="#7b51e2" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {address}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <AntDesign name="star" size={24} color="#f7d003" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {rating}
                    </Text>
                </View>
            </View>

            {/* Danh  sách phòng  */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <Text
                    style={{
                        fontSize: 25,
                        paddingVertical: 10,
                        fontWeight: "bold",
                    }}
                >
                    Danh sách phòng
                </Text>

                <View style={{display: 'flex', gap: 10}}>
                <View
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
                        source={{
                            uri: "https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg",
                        }}
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
                            Phòng thường
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <Entypo
                                name="location-pin"
                                size={24}
                                color="#5e7cfa"
                            />
                            <Text>Phòng 202</Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <Entypo name="star" size={24} color="#ffd81c" />
                            <Text>4.5</Text>
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
                            <Text>500.000 VNĐ</Text>
                            <Badge colorScheme="success">Trống</Badge>
                            {/* <Badge colorScheme="danger">DANGER</Badge>
                            <Badge colorScheme="info">INFO</Badge>
                            <Badge colorScheme="coolGray">DARK</Badge> */}
                        </View>
                    </View>

                    
                </View>

                <View
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
                        source={{
                            uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1"
                        }}
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
                            Phòng VIP
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <Entypo
                                name="location-pin"
                                size={24}
                                color="#5e7cfa"
                            />
                            <Text>Phòng 401</Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <Entypo name="star" size={24} color="#ffd81c" />
                            <Text>5</Text>
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
                            <Text>1.000.000 VNĐ</Text>
                            {/* <Badge colorScheme="success">Trống</Badge> */}
                            <Badge colorScheme="danger">Hết</Badge>
                            {/* <Badge colorScheme="info">INFO</Badge>
                            <Badge colorScheme="coolGray">DARK</Badge> */}
                        </View>
                    </View>

                    
                </View>

                </View>

            </View>
        </ScrollView>
    );
}
