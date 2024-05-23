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

import { useState, useContext, useEffect } from "react";

import { BASE_URL } from "../../utils";

import UserContext from "../../contexts/UserContext";
import ManagerContext from "../../contexts/ManagerContext";

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

    console.log("Hotel ID:", hotel_id);

    const { count } = useContext(ManagerContext);

    const [rooms, setRooms] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/room/hotel/${hotel_id}/`
                );
                const data = await response.json();
                setRooms(data);
                // console.log(data);
            } catch (error) {
                console.error("Failed to get rooms:", error);
            }
        };

        getRooms();
    }, [count]);

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

                {rooms ? (
                    <View style={{ display: "flex", gap: 10 }}>
                        {rooms.map((room) => (
                            <HotelCard
                                key={room.id}
                                logo={room.logo}
                                name={room.name}
                                rating={room.rating}
                                price={room.price}
                                is_hired={room.is_hired}
                                id={room.id}
                                room_size={room.room_size}
                                navigation={navigation}
                            />
                        ))}
                    </View>
                ) : null}

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
