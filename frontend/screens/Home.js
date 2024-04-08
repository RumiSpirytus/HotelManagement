import { View, Text, TextInput } from "react-native";
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
    // Image,
} from "native-base";

import { Image } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";

export default function Home() {
    const [receiveDate, setReceiveDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(!show);
        setReceiveDate(currentDate);
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
                                            onTouchStart={() => setShow(true)}
                                        />
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={receiveDate}
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
                                            Số người ở
                                        </FormControl.Label>
                                        <Input
                                            type="number"
                                            placeholder="Nhập số lượng"
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        ></FormControl.ErrorMessage>
                                    </Stack>

                                    <Stack mx="">
                                        <FormControl.Label>
                                            Số ngày ở
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
                <ScrollView horizontal>
                    <StyledView className="flex flex-col gap-y-1 p-4">
                        <StyledView>
                            <StyledText className=" text-lg font-semibold">
                                Tìm kiếm gần đây
                            </StyledText>
                        </StyledView>

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
                    </StyledView>
                </ScrollView>

                {/* khách sạn phổ biến */}
                <StyledView className="flex flex-col gap-4 p-4">
                    <StyledView>
                        <StyledText className=" text-lg font-semibold">
                            Khách sạn phổ biến
                        </StyledText>
                    </StyledView>

                    <ScrollView horizontal>
                        <StyledView className="flex flex-row">
                            <StyledView className="flex items-center bg-white mr-4">
                                <StyledView className="mb-2">
                                    <Image
                                        source={{
                                            uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1",
                                        }}
                                        style={{ width: 120, height: 120 }}
                                    />
                                </StyledView>
                                <StyledView className="flex items-center gap-1 pb-2">
                                    <StyledText className="font-semibold">
                                        Granda Legend
                                    </StyledText>
                                    <StyledText className="">
                                        Cầu Giấy
                                    </StyledText>
                                    <StyledText className="">
                                        495.000 VNĐ
                                    </StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className="flex items-center bg-white mr-4">
                                <StyledView className="mb-2">
                                    <Image
                                        source={{
                                            uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1",
                                        }}
                                        style={{ width: 120, height: 120 }}
                                    />
                                </StyledView>
                                <StyledView className="flex items-center gap-1 pb-2">
                                    <StyledText className="font-semibold">
                                        Dream Central
                                    </StyledText>
                                    <StyledText className="">Tây Hồ</StyledText>
                                    <StyledText className="">
                                        495.000 VNĐ
                                    </StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className="flex items-center bg-white mr-4">
                                <StyledView className="mb-2">
                                    <Image
                                        source={{
                                            uri: "https://artishotel.vn/wp-content/uploads/2021/12/artishotel.png",
                                        }}
                                        style={{ width: 120, height: 120 }}
                                    />
                                </StyledView>
                                <StyledView className="flex items-center gap-1 pb-2">
                                    <StyledText className="font-semibold">
                                        Hanoi Victor
                                    </StyledText>
                                    <StyledText className="">
                                        Ba Đình
                                    </StyledText>
                                    <StyledText className="">
                                        495.000 VNĐ
                                    </StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className="flex items-center bg-white mr-4">
                                <StyledView className="mb-2">
                                    <Image
                                        source={{
                                            uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/378828506.jpg?k=ea7d10effc56e6e3ded34794423b9a97f43d25c303867e6051d422a08b023480&o=&hp=1",
                                        }}
                                        style={{ width: 120, height: 120 }}
                                    />
                                </StyledView>
                                <StyledView className="flex items-center gap-1 pb-2">
                                    <StyledText className="font-semibold">
                                        Granda Legend
                                    </StyledText>
                                    <StyledText className="">
                                        Cầu Giấy
                                    </StyledText>
                                    <StyledText className="">
                                        495.000 VNĐ
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </ScrollView>
                </StyledView>
            </StyledView>
        </ScrollView>
    );
}
