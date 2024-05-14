import {
    ScrollView,
    View,
    Text,
    Image,
    Modal,
    Center,
    Button,
    FormControl,
    Input,
    Checkbox,
} from "native-base";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import HotelCard from "../../components/manager/HotelCard";
import EmployeeCard from "../../components/manager/EmployeeCard";

import { useState } from "react";

const roomsData = [
    {
        id: 1,
        name: "Phòng VIP",
        price: 1000000,
        logo: "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
        images: [
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
            "https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg",
        ],
        room_detail: "Mô tả phòng 1",
        room_conveninet: [
            "Tiện ích phòng 1",
            "Tiện ích phòng 1",
            "Tiện ích phòng 1",
        ],
        room_supplies: [
            "Vật dụng phòng 1",
            "Vật dụng phòng 1",
            "Vật dụng phòng 1",
        ],
        room_size: 20,
        is_hired: true,
        rating: 4.2,
    },
    {
        id: 2,
        name: "Phòng thường",
        price: 2000000,
        logo: "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
        images: [
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
            "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/hotel-la-gi.jpg",
        ],
        room_detail: "Mô tả phòng 2",
        room_conveninet: [
            "Tiện ích phòng 2",
            "Tiện ích phòng 2",
            "Tiện ích phòng 2",
        ],
        room_supplies: [
            "Vật dụng phòng 2",
            "Vật dụng phòng 2",
            "Vật dụng phòng 2",
        ],
        room_size: 25,
        is_hired: false,
        rating: 5,
    },
    {
        id: 3,
        name: "Phòng VIP",
        price: 3000000,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s",
        ],
        room_detail: "Mô tả phòng 3",
        room_conveninet: [
            "Tiện ích phòng 3",
            "Tiện ích phòng 3",
            "Tiện ích phòng 3",
        ],
        room_supplies: [
            "Vật dụng phòng 3",
            "Vật dụng phòng 3",
            "Vật dụng phòng 3",
        ],
        room_size: 30,
        is_hired: true,
        rating: 3,
    },
];

const employeesData = [
    {
        id: 1,
        first_name: "Nguyễn",
        last_name: "Văn A",
        phone_num: "0123456789",
    },
    {
        id: 2,
        first_name: "Nguyễn",
        last_name: "Văn B",
        phone_num: "0123456789",
    },
    {
        id: 3,
        first_name: "Nguyễn",
        last_name: "Văn C",
        phone_num: "0123456789",
    },
];

export default function ManagerHotel({ route, navigation }) {
    const hotel_id = route.params.hotel_id;
    const logo = route.params.logo;
    const name = route.params.name;
    const address = route.params.address;
    const rating = route.params.rating;

    const [showModal, setShowModal] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    return (
        <ScrollView
            style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 120,
            }}
        >
            <Image
                source={{ uri: logo }}
                style={{ width: "100%", height: 200 }}
                alt="Image"
            />
            <View
                style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 12,
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <FontAwesome5 name="hotel" size={24} color="#70bc59" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {name}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <Entypo name="location" size={24} color="#7b51e2" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {address}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        alignItems: "center",
                    }}
                >
                    <AntDesign name="star" size={24} color="#f7d003" />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        {rating}
                    </Text>
                </View>
            </View>

            {/* Danh  sách phòng  */}
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        paddingVertical: 10,
                        fontWeight: "bold",
                    }}
                >
                    Danh sách phòng
                </Text>

                <View style={{ display: "flex", gap: 10 }}>
                    {roomsData.map((room) => (
                        <HotelCard key={room.id} {...room} />
                    ))}
                </View>

                {/* thêm phòng  */}
                <AntDesign
                    name="plussquare"
                    size={24}
                    color="#00dc81"
                    style={{ alignSelf: "center", marginTop: 10, fontSize: 30 }}
                    onPress={() => setShowModal(true)}
                />
            </View>

            {/* modal thêm phòng  */}
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Thêm phòng</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Tên phòng</FormControl.Label>
                                <Input placeholder="Phòng VIP" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Logo</FormControl.Label>
                                <Input placeholder="URL" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Ảnh phòng</FormControl.Label>
                                <Input placeholder="URLs (ngăn cách bởi dấu phẩy)" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>
                                    Mô tả phòng
                                </FormControl.Label>
                                <Input placeholder="Mô tả" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Tiện ích</FormControl.Label>
                                <Input placeholder="Điều hòa, Nóng lạnh (ngăn cách bởi dấu phẩy)" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>
                                    Đồ dùng cung cấp
                                </FormControl.Label>
                                <Input placeholder="Máy sấy, Dép (ngăn cách bởi dấu phẩy)" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Diện tích</FormControl.Label>
                                <Input placeholder="20" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Đánh giá</FormControl.Label>
                                <Input placeholder="4" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Giá</FormControl.Label>
                                <Input placeholder="10000" />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="ghost"
                                    colorScheme="blueGray"
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>

            {/* danh sách nhân viên  */}
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingBottom: 40,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        paddingVertical: 10,
                        fontWeight: "bold",
                    }}
                >
                    Danh sách nhân viên
                </Text>

                <View style={{ display: "flex", gap: 10 }}>
                    {employeesData.map((employee) => (
                        <EmployeeCard key={employee.id} {...employee} />
                    ))}
                </View>

                {/* thêm nhân viên  */}
                <AntDesign
                    name="plussquare"
                    size={24}
                    color="#00dc81"
                    style={{ alignSelf: "center", marginTop: 10, fontSize: 30 }}
                    onPress={() => setShowEmployeeModal(true)}
                />
            </View>

            <Center>
                <Modal
                    isOpen={showEmployeeModal}
                    onClose={() => setShowEmployeeModal(false)}
                >
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Tạo tài khoản nhân viên</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input placeholder="example@gmail.com" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Mật khẩu</FormControl.Label>
                                <Input placeholder="******" type="password" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Họ</FormControl.Label>
                                <Input placeholder="" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Tên</FormControl.Label>
                                <Input placeholder="" />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>
                                    Số điện thoại
                                </FormControl.Label>
                                <Input placeholder="" />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="ghost"
                                    colorScheme="blueGray"
                                    onPress={() => {
                                        setShowEmployeeModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={() => {
                                        setShowEmployeeModal(false);
                                    }}
                                >
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </ScrollView>
    );
}
