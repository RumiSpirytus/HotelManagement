import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

import {
    Button,
    Box,
    FormControl,
    Stack,
    Input,
    ScrollView,
} from "native-base";

import { useState, useEffect } from "react";

import AvailableRoom from "../../components/customer/AvailableRoom";
import PopularHotel from "../../components/customer/PopularHotel";

import { BASE_URL } from "../../utils";

export default function Home({ navigation }) {
    const [availableRooms, setAvailableRooms] = useState([]);
    const [searchRooms, setSearchRooms] = useState(null);
    const [popularHotel, setPopularHotel] = useState([]);

    // search 
    const [handleSearch, setHandleSearch] = useState(false);
    const [formRoomName, setFormRoomName] = useState("");
    const [formHotelAddress, setFormHotelAddress] = useState("");
    const [formHotelName, setFormHotelName] = useState("");
    const [formPrice, setFormPrice] = useState(0);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/room/available`);

                if (response.ok) {
                    const data = await response.json();
                    setAvailableRooms(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const fetchPopularHotel = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/hotel/popular`);
                if (response.ok) {
                    const data = await response.json();
                    setPopularHotel(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularHotel();
        fetchAvailableRooms();
    }, []);

    useEffect(() => {
        const search_room = async () => {
            form_data = {};
            if (formHotelName) {
                form_data["hotel_name"] = formHotelName;
            }
            if (formHotelAddress) {
                form_data["address"] = formHotelAddress;
            }
            if (formRoomName) {
                form_data["room_name"] = formRoomName;
            }
            if (formPrice) {
                form_data["max_price"] = formPrice;
            }
            try {
                const response = await fetch(`${BASE_URL}/api/search/rooms`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form_data,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setSearchRooms(data);
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (handleSearch) {
            search_room();
            setHandleSearch(false);
        }
    }, [handleSearch]);

    return (
        <ScrollView>
            <StyledView className=" flex flex-col" style={{ paddingTop: 16 }}>
                {/* tìm kiếm  */}
                <StyledView className=" p-4 ">
                    <StyledView className=" shadow-lg rounded-lg flex flex-col gap-4 mt-1">
                        <Box alignItems="center">
                            <Box w="100%">
                                <FormControl className="flex flex-col gap-2">
                                    <Stack>
                                        <FormControl.Label>
                                            Địa điểm
                                        </FormControl.Label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập địa điểm"
                                            value={formHotelAddress}
                                            onChangeText={(text) =>
                                                setFormHotelAddress(text)
                                            }
                                        />
                                    </Stack>

                                    <Stack>
                                        <FormControl.Label>
                                            Tên khách sạn
                                        </FormControl.Label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập tên khách sạn"
                                            value={formHotelName}
                                            onChangeText={(text) =>
                                                setFormHotelName(text)
                                            }
                                        />
                                    </Stack>

                                    <Stack>
                                        <FormControl.Label>
                                            Tên phòng
                                        </FormControl.Label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập tên phòng"
                                            value={formRoomName}
                                            onChangeText={(text) =>
                                                setFormRoomName(text)
                                            }
                                        />
                                    </Stack>

                                    <Stack>
                                        <FormControl.Label>
                                            Giá
                                        </FormControl.Label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập giá tối đa"
                                            value={formPrice}
                                            onChangeText={(text) =>
                                                setFormPrice(text)
                                            }
                                        />
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Box>

                        <Button onPress={() => setHandleSearch(true)}>
                            Tìm kiếm
                        </Button>
                    </StyledView>
                </StyledView>

                {/* kết quả tìm kiếm  */}
                {searchRooms ? <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold text-red-500">
                            Kết quả tìm kiếm
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row">
                            {searchRooms && searchRooms.length > 0 ? (
                                searchRooms.map((room) => (
                                    <AvailableRoom
                                        key={room.id}
                                        image={room.logo}
                                        name={room.name}
                                        address={room.address}
                                        price={room.price}
                                        navigation={navigation}
                                        id={room.id}
                                    />
                                ))
                            ) : (
                                <StyledText>Không tìm thấy kết quả</StyledText>
                            )}
                        </StyledView>
                    </ScrollView>
                </StyledView> : null}

                {/* Phòng còn trống */}
                <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold">
                            Phòng còn trống
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row">
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
                        </StyledView>
                    </ScrollView>
                </StyledView>

                {/* Khách sạn chất lượng  */}
                <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold">
                            Khách sạn chất lượng
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 12,
                            }}
                        >
                            {popularHotel.map((hotel) => (
                                <PopularHotel
                                    key={hotel.id}
                                    logo={hotel.logo}
                                    name={hotel.name}
                                    address={hotel.address}
                                    rating={hotel.rating}
                                    navigation={navigation}
                                    id={hotel.id}
                                />
                            ))}
                        </StyledView>
                    </ScrollView>
                </StyledView>
            </StyledView>
        </ScrollView>
    );
}
