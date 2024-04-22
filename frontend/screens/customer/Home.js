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

import { Image } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useState, useEffect } from "react";

import PopularHotel from "../../components/customer/PopularHotel";

import axios from "axios";

const popular_hotels = [
    {
        id: 1,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1",
        name: "Granda Legend",
        address: "Cầu Giấy",
        price: 495000,
    },
    {
        id: 2,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1",
        name: "Granda Legend",
        address: "Cầu Giấy",
        price: 495000,
    },
    {
        id: 3,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1",
        name: "Granda Legend",
        address: "Cầu Giấy",
        price: 495000,
    },
];

export default function Home({ navigation }) {
    const [receiveDate, setReceiveDate] = useState(new Date());
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [checkinShow, setCheckinShow] = useState(false);
    const [checkoutShow, setCheckoutShow] = useState(false);

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

                {/* khách sạn phổ biến */}
                <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold">
                            Khách sạn phổ biến
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row">
                            {popular_hotels.map((hotel) => (
                                <PopularHotel
                                    key={hotel.id}
                                    image={hotel.image}
                                    name={hotel.name}
                                    address={hotel.address}
                                    price={hotel.price}
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
