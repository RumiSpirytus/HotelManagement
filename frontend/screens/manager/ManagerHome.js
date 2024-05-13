import { Text, ScrollView, View, FlatList, Image } from "native-base";

import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
    {
        name: "Khách sạn 1",
        address: "123 Đường ABC",
        description: "Mô tả khách sạn 1",
        logo: "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
        rating: 4.2,
    },
    {
        name: "Khách sạn 2",
        address: "123 Đường ABC",
        description: "Mô tả khách sạn 2",
        logo: "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
        rating: 5,
    },
    {
        name: "Khách sạn 3",
        address: "123 Đường ABC",
        description: "Mô tả khách sạn 3",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
        rating: 3,
    },
];

import MyHotel from "../../components/manager/MyHotel";

export default function MangerHome({ navigation }) {
    return (
        <ScrollView
            style={{
                paddingHorizontal: 20,
                paddingVertical: 60,
                display: "flex",
                gap: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    paddingVertical: 10,
                    fontWeight: "bold",
                }}
            >
                Khách sạn của bạn
            </Text>

            {/* Danh sách khách sạn của bạn */}
            <View>
                <FlatList
                    gap={10}
                    horizontal
                    data={data}
                    renderItem={(item) => {
                        return (
                            <MyHotel
                                name={item.item.name}
                                address={item.item.address}
                                description={item.item.description}
                                logo={item.item.logo}
                                rating={item.item.rating}
                                navigation={navigation}
                            />
                        );
                    }}
                />
            </View>

            {/* Thống kê  */}
            <View
                style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 16,
                    paddingBottom: 80,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        paddingVertical: 10,
                        fontWeight: "bold",
                    }}
                >
                    Thống kê
                </Text>
                {/* Tổng doanh thu  */}
                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fdf1f8",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                    }}
                >
                    <FontAwesome5 name="money-bill" size={24} color="green" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Tổng doanh thu
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        1.000.000 VNĐ
                    </Text>
                </View>

                {/* Số lượng khách hàng  */}
                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f6f5ff",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                        marginTop: 12,
                    }}
                >
                    <Entypo name="users" size={24} color="blue" />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Số lượng khách hàng
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        52.2K
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ebf5ff",
                        padding: 10,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        borderColor: "#000",
                        borderWidth: 1,
                        marginTop: 12,
                    }}
                >
                    <MaterialCommunityIcons
                        name="human"
                        size={40}
                        color="pink"
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            paddingVertical: 4,
                        }}
                    >
                        Số lượng nhân viên
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>20</Text>
                </View>
            </View>
        </ScrollView>
    );
}
