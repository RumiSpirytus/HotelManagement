import { View, Text } from "react-native";
import { styled } from "nativewind";

import { Image } from "native-base";

const StyledView = styled(View);
const StyledText = styled(Text);

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
    AntDesign
} from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

export default function PopularHotel({
    id,
    logo,
    name,
    address,
    rating,
    navigation,
}) {
    const handlePress = () => {
        navigation.navigate("HotelDetail", { id: id });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <StyledView
                style={{
                    width: 200,
                    height: 300,
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
                            uri: `${logo}`,
                        }}
                        width={200}
                        height={140}
                        alt="hotel logo"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    />
                </StyledView>
                <StyledView style={{ flexWrap: "wrap", alignItems: "center", gap: 6, justifyContent: 'space-between', height: 140}}>
                    <StyledView>
                        <StyledText style={{ textAlign: "center", fontWeight: "bold" }}>
                            {name}
                        </StyledText>
                    </StyledView>
                    <StyledView className="">
                        <StyledText style={{ textAlign: "center" }}>
                            {address}
                        </StyledText>
                    </StyledView>
                    <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{fontWeight: "500"}}>{rating}</Text>
                            <AntDesign name="star" size={16} color="#fe8813" />
                        </View>
                </StyledView>
            </StyledView>
        </TouchableOpacity>
    );
}
