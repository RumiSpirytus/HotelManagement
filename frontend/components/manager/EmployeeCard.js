import { View, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EmployeeCard({ id, first_name, last_name, phone_num }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "",
                gap: 10,
                borderWidth: 1,
                borderColor: "#a8a7a7",
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 16,
                    alignItems: "center",
                }}
            >
                <FontAwesome name="vcard" size={24} color="#62ace5" />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>ID:</Text>
                    <Text>{id}</Text>
                </View>
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <MaterialCommunityIcons
                    name="rename-box"
                    size={24}
                    color="#feb2a8"
                />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>Họ và tên:</Text>
                    <Text>
                        {`${first_name} ${last_name}`}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <AntDesign name="phone" size={24} color="#00dc81" />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: "600" }}>Số điện thoại:</Text>
                    <Text>{phone_num}</Text>
                </View>
            </View>
        </View>
    );
}
