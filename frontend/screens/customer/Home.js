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
    WarningOutlineIcon,
    ScrollView,
} from "native-base";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useState, useEffect } from "react";

import AvailableRoom from "../../components/customer/AvailableRoom";
import PopularHotel from "../../components/customer/PopularHotel";

export default function Home({ navigation }) {
    const [receiveDate, setReceiveDate] = useState(new Date());
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [checkinShow, setCheckinShow] = useState(false);
    const [checkoutShow, setCheckoutShow] = useState(false);
    const [availableRooms, setAvailableRooms] = useState([]);
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
        fetchAvailableRooms();
    }, []);

    const [popularHotel, setPopularHotel] = useState([]);
    useEffect(() => {
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
    }, []);

    const onReceiveChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setCheckinShow(!checkinShow);
        setReceiveDate(currentDate);
    };

    const onCheckoutChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setCheckoutShow(!checkoutShow);
        setCheckoutDate(currentDate);
    };

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
                                            Địa điểm, tên khách sạn
                                        </FormControl.Label>
                                        <Input
                                            type="text"
                                            placeholder="Nhập địa điểm, tên khách sạn"
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            Vui lòng nhập tên địa điểm, khách
                                            sạn
                                        </FormControl.ErrorMessage>
                                    </Stack>

                                    <Stack mx="">
                                        <FormControl.Label>
                                            Ngày nhận phòng
                                        </FormControl.Label>
                                        <Input
                                            type="date"
                                            placeholder="Nhập ngày nhận phòng"
                                            value={receiveDate
                                                .toISOString()
                                                .substring(0, 10)}
                                            onTouchStart={() =>
                                                setCheckinShow(true)
                                            }
                                        />
                                        {checkinShow && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={receiveDate}
                                                mode="date"
                                                display="default"
                                                onChange={onReceiveChange}
                                            />
                                        )}
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        ></FormControl.ErrorMessage>
                                    </Stack>

                                    {/* <Stack mx="">
                                        <FormControl.Label>
                                            Ngày nhận phòng
                                        </FormControl.Label>
                                        <Input
                                            type="date"
                                            placeholder="Nhập ngày nhận phòng"
                                            value={date
                                                .toISOString()
                                                .substring(0, 10)}
                                            onTouchStart={() => setShow(true)}
                                        />
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        ></FormControl.ErrorMessage>
                                    </Stack> */}

                                    <Stack mx="">
                                        <FormControl.Label>
                                            Ngày trả phòng
                                        </FormControl.Label>
                                        <Input
                                            type="date"
                                            placeholder="Nhập ngày trả phòng"
                                            value={checkoutDate
                                                .toISOString()
                                                .substring(0, 10)}
                                            onTouchStart={() =>
                                                setCheckoutShow(true)
                                            }
                                        />
                                        {checkoutShow && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={checkoutDate}
                                                mode="date"
                                                display="default"
                                                onChange={onCheckoutChange}
                                            />
                                        )}
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        ></FormControl.ErrorMessage>
                                    </Stack>

                                    <Stack mx="">
                                        <FormControl.Label>
                                            Số phòng trống
                                        </FormControl.Label>
                                        <Input
                                            type="date"
                                            placeholder="Nhập số lượng"
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        ></FormControl.ErrorMessage>
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Box>

                        <Button onPress={() => console.log("hello world")}>
                            Tìm kiếm
                        </Button>
                    </StyledView>
                </StyledView>

                {/* Tìm kiếm gần đây  */}
                {/* <StyledView className="flex flex-col gap-y-1 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold">
                            Tìm kiếm gần đây
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row gap-4">
                            <StyledView className="bg-white p-4 rounded-lg shadow-lg">
                                <StyledText className="font-semibold">
                                    Hà Nội
                                </StyledText>
                            </StyledView>
                            <StyledView className="bg-white p-4 rounded-lg shadow-lg">
                                <StyledText className="font-semibold">
                                    Granda Legend
                                </StyledText>
                            </StyledView>
                            <StyledView className="bg-white p-4 rounded-lg shadow-lg">
                                <StyledText className="font-semibold">
                                    Hồ Chí Minh
                                </StyledText>
                            </StyledView>
                            <StyledView className="bg-white p-4 rounded-lg shadow-lg">
                                <StyledText className="font-semibold">
                                    Hải Phòng
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </ScrollView>
                </StyledView> */}

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
