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

export default function Home({ navigation }) {
    const [availableRooms, setAvailableRooms] = useState([]);
    const [searchRooms, setSearchRooms] = useState(null);
    const [popularHotel, setPopularHotel] = useState([]);
    const [handleSearch, setHandleSearch] = useState(false);
    const [formRoomName, setFormRoomName] = useState("");
    const [formHotelAddress, setFormHotelAddress] = useState("");
    const [formHotelName, setFormHotelName] = useState("");
    const [formPrice, setFormPrice] = useState(0);
    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await fetch(
                    "http://10.0.2.2:8000/api/room/available"
                );

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
                const response = await fetch(
                    "http://10.0.2.2:8000/api/hotel/popular"
                );
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
        const fetchSearchRooms = async () => {
            try {
                const response = await fetch(
                    `http://10.0.2.2:8000/api/search/room?room_name=${formRoomName}&hotel_address=${formHotelAddress}&hotel_name=${formHotelName}&price=${formPrice}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setSearchRooms(data);
                } else {
                    setSearchRooms([]);
                }
            } catch (error) {
                console.error(error);
                setSearchRooms([]);
            }
            setHandleSearch(false);
        };
        if (handleSearch) {
            fetchSearchRooms();
        }
    }, [handleSearch]);

    return (
        <ScrollView>
            <StyledView className=" flex flex-col">
                {/* tìm kiếm  */}
                <StyledView className=" p-4 bg-white">
                    <StyledView className=" bg-white shadow-lg rounded-lg flex flex-col gap-4 mt-1">
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
                <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold text-red-500">
                            Kết quả tìm kiếm
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row">
                            {searchRooms ? (
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
                </StyledView>

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
                        <StyledView className="flex flex-row">
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
