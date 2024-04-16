import { View, Text } from "react-native";
import { styled } from "nativewind";

import { Image } from "native-base";

const StyledView = styled(View);
const StyledText = styled(Text);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TouchableOpacity } from "react-native";

export default function PopularHotel({
    id,
    image,
    name,
    address,
    price,
    navigation,
}) {
    const handlePress = () => {
        navigation.navigate("RoomDetail", { id: id });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <StyledView
                style={{
                    width: 140,
                    borderRadius: 10,
                    paddingBottom: 10,
                    marginRight: 16,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    gap: 10,
                }}
            >
                <StyledView className="mb-2">
                    <Image
                        source={{
                            uri: `${image}`,
                        }}
                        width={140}
                        height={140}
                        alt="hotel logo"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    />
                </StyledView>
                <StyledView style={{ flexWrap: "wrap", alignItems: "center", gap: 4 }}>
                    <StyledView>
                        <StyledText className="font-semibold">
                            {name}
                        </StyledText>
                    </StyledView>
                    <StyledView className="">
                        <StyledText style={{ textAlign: "center" }}>
                            {address}
                        </StyledText>
                    </StyledView>
                    <StyledView>
                        <StyledText className="">
                            {new Intl.NumberFormat("vi-VN").format(price)} VNĐ
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </TouchableOpacity>
    );
}
