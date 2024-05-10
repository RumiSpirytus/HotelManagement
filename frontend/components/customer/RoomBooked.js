import { View } from "react-native";
import { styled } from "nativewind";

import { Image } from "native-base";

const StyledView = styled(View);

import { Box, Text } from "native-base";

import { TouchableOpacity } from "react-native";

export default function RoomBooked({
    id,
    image,
    name,
    address,
    booking_id,
    room_id,
    navigation,
    size,
}) {
    const handlePress = () => {
        navigation.navigate("BookingDetail", { id: booking_id, name: name, address: address, image: image});
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <StyledView
                style={{
                    width: "100%",
                    height: "auto",
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
                        width={400}
                        height={200}
                        alt="hotel logo"
                        style={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    />
                </StyledView>

                <Box style={{ display: "flex", gap: 4 }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            {name}
                        </Text>
                    </View>

                    <Text style={{ fontSize: 14 }}>{address}</Text>
                </Box>
            </StyledView>
        </TouchableOpacity>
    );
}
