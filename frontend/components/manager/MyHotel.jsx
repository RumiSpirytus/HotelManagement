import {
    Image,
    Text,
    View,
    Box,
    Stack,
    HStack,
    Heading,
    Center,
    AspectRatio,
} from "native-base";

import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function MyHotel({
    id,
    logo,
    name,
    address,
    rating,
    navigation,
}) {
    const handlePress = () => {
        navigation.navigate("ManagerHotel", {
            hotel_id: id,
            logo,
            name,
            address,
            rating,
        });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Box alignItems="center">
                <Box
                    maxWidth={300}
                    minHeight={350}
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.400"
                    borderWidth="2"
                    _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700",
                    }}
                    _web={{
                        shadow: 2,
                        borderWidth: 0,
                    }}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                    marginRight={2}
                >
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image
                                source={{
                                    uri: `${logo}`,
                                }}
                                alt="image"
                            />
                        </AspectRatio>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {name}
                            </Heading>
                            <Text
                                fontSize="xs"
                                _light={{
                                    color: "violet.500",
                                }}
                                _dark={{
                                    color: "violet.400",
                                }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                            >
                                {address}
                            </Text>
                        </Stack>
                        <HStack
                            alignItems="center"
                            space={4}
                            justifyContent="space-between"
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 6,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                    fontSize={14}
                                >
                                    {rating}
                                </Text>
                                <AntDesign
                                    name="star"
                                    size={20}
                                    color="#f7d003"
                                />
                            </View>
                        </HStack>
                    </Stack>
                </Box>
            </Box>
        </TouchableOpacity>
    );
}
