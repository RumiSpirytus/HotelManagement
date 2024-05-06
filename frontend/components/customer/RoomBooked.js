import { View, Text } from "react-native";
import { styled } from "nativewind";

import { Image } from "native-base";

const StyledView = styled(View);
const StyledText = styled(Text);

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
        navigation.navigate("RoomDetail", { id: room_id });
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
                            uri: `${image}`,
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
                <StyledView
                    style={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 6,
                        justifyContent: "space-between",
                        height: 140,

                    }}
                >
                    <StyledView>
                        <StyledText
                            style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                            {name}
                        </StyledText>
                    </StyledView>
                    <StyledView >
                        {size ? (
                            <StyledText style={{ textAlign: "center" }}>
                                {size} m2
                            </StyledText>
                        ) : (
                            <StyledText style={{ textAlign: "center" }}>
                                {address}
                            </StyledText>
                        )}
                    </StyledView>
                    <StyledView>
                        <StyledText style={{ textAlign: "center", fontWeight: '500' }}>
                            Mã đặt phòng: {booking_id}
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </TouchableOpacity>
    );
}
