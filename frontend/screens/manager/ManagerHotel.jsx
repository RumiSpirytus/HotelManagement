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

import { TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import HotelCard from "../../components/manager/HotelCard";
import EmployeeCard from "../../components/manager/EmployeeCard";

import { useState, useContext, useEffect } from "react";

import { BASE_URL } from "../../utils";

import ManagerContext from "../../contexts/ManagerContext";
import UserContext from "../../contexts/UserContext";

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

    const [hotel, setHotel] = useState({
        logo: logo,
        name: name,
        address: address,
        rating: rating,
    });

    const { count, increaseCount } = useContext(ManagerContext);
    const { user } = useContext(UserContext);

    const [rooms, setRooms] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    const [formRoomError, setFormRoomError] = useState(false);
    const [formRoomData, setFormRoomData] = useState({
        name: "",
        logo: "",
        images: "",
        description: "",
        facilities: "",
        supplies: "",
        room_size: "",
        rating: "",
        price: "",
    });
    const [formEmployeeError, setFormEmployeeError] = useState(false);
    const [formEmployeeData, setFormEmployeeData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_num: "",
    });

    useEffect(() => {
        const getHotel = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/hotel/${hotel_id}`
                );
                const data = await response.json();
                setHotel(data);
            } catch (error) {
                console.error("Failed to get hotel:", error);
            }
        };
        getHotel();
    }, [count]);

    const validateRoomForm = (values) => {
        let errors = {};

        if (!values.name) {
            errors.name = "Tên phòng không được để trống";
        }

        if (!values.logo) {
            errors.logo = "Logo không được để trống";
        }

        if (!values.images) {
            errors.images = "Ảnh không được để trống";
        }

        if (!values.description) {
            errors.description = "Mô tả không được để trống";
        }

        if (!values.facilities) {
            errors.facilities = "Tiện ích không được để trống";
        }

        if (!values.supplies) {
            errors.supplies = "Đồ dùng cung cấp không được để trống";
        }

        if (!values.room_size) {
            errors.room_size = "Diện tích không được để trống";
        }

        if (!values.rating) {
            errors.rating = "Đánh giá không được để trống";
        }

        if (!values.price) {
            errors.price = "Giá không được để trống";
        }

        return errors;
    };

    const validateFormEmployee = (values) => {
        let errors = {};

        if (!values.email) {
            errors.email = "Email không được để trống";
        }

        if (!values.password) {
            errors.password = "Mật khẩu không được để trống";
        }

        if (!values.first_name) {
            errors.first_name = "Họ không được để trống";
        }

        if (!values.last_name) {
            errors.last_name = "Tên không được để trống";
        }
        if (!values.phone_num) {
            errors.phone_num = "Số điện thoại không được để trống";
        }

        return errors;
    };

    const handleSubmitRoomForm = async () => {

        const errors = validateRoomForm(formRoomData);

        if (Object.keys(errors).length === 0) {
            // No errors, submit the form
            formData = {
                hotel_id: hotel_id,
                name: formRoomData.name,
                logo: formRoomData.logo,
                images: formRoomData.images
                    .split(",")
                    .map((image) => image.trim()),
                room_detail: formRoomData.description,
                room_convenient: formRoomData.facilities
                    .split(",")
                    .map((facility) => facility.trim()),
                room_supplies: formRoomData.supplies
                    .split(",")
                    .map((supply) => supply.trim()),
                room_size: formRoomData.room_size,
                rating: formRoomData.rating,
                price: formRoomData.price,
                is_hired: false,
            };

            try {
                const response = await fetch(`${BASE_URL}/api/room`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    increaseCount();
                    alert("Tạo phòng thành công");
                    setShowModal(false);
                } else {
                    const data = await response.json();
                    if (data.message) {
                        alert(data.message);
                    } else {
                        alert("Tạo phòng thất bại, vui lòng thử lại");
                    }
                }
            } catch (error) {
                console.error("Failed to create room:", error);
                alert("Tạo phòng thất bại, vui lòng thử lại");
                setShowModal(false);
            }
        } else {
            // There are errors, update the state
            console.log("Errors:", errors);
            setFormRoomError(errors);
        }
    };

    const handleSubmitEmployeeForm = async () => {

        const errors = validateFormEmployee(formEmployeeData);

        if (Object.keys(errors).length === 0) {
            // No errors, submit the form
            formData = {
                email: formEmployeeData.email,
                password: formEmployeeData.password,
                first_name: formEmployeeData.first_name,
                last_name: formEmployeeData.last_name,
                phone_num: formEmployeeData.phone_num,
                hotel_id: hotel_id,
                manager_id: user?.role_id,
                role: "employee",
            };


            try {
                const response = await fetch(`${BASE_URL}/api/employee`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert("Tạo nhân viên thành công");
                    setShowEmployeeModal(false);
                    setFormEmployeeData({
                        email: "",
                        password: "",
                        first_name: "",
                        last_name: "",
                        phone_num: "",
                    });
                    increaseCount();
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {
                console.error("Failed to create employee:", error);
                alert("Tạo nhân viên thất bại, vui lòng thử lại");
                setShowEmployeeModal(false);
            }
        } else {
            // There are errors, update the state
            console.log("Errors:", errors);
            setFormEmployeeError(errors);
        }
    };

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/room/hotel/${hotel_id}`
                );
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error("Failed to get rooms:", error);
            }
        };

        const getEmployees = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/employee/${hotel_id}`
                );
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to get employees:", error);
            }
        };

        getRooms();
        getEmployees();
    }, [count]);

    const [isEditHotel, setIsEditHotel] = useState(false);

    const [editHotelName, setEditHotelName] = useState(hotel ? hotel.name : '');
    const [editHotelAddress, setEditHotelAddress] = useState(hotel ? hotel.address : '');
    const [editHotelRating, setEditHotelRating] = useState(hotel ? hotel.rating : '');
    const [editHotelLogo, setEditHotelLogo] = useState(hotel ? hotel.logo : '');

    const [isDeleteHotel, setIsDeleteHotel] = useState(false);

    return (
        <ScrollView
            style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 120,
            }}
        >
            {/* banner */}
            <Image
                source={{ uri: logo }}
                style={{ width: "100%", height: 200 }}
                alt="Image"
            />

            <Text
                style={{
                    paddingHorizontal: 20,
                    fontStyle: "italic",
                    paddingVertical: 5,
                }}
                onPress={() => setIsEditHotel(true)}
            >
                Chỉnh sửa thông tin khách sạn
            </Text>

            {/* Thông tin khách sạn */}
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
                        {hotel?.name}
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
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "700",
                            paddingRight: 20,
                        }}
                    >
                        {hotel?.address}
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
                        {hotel?.rating}
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
                            <FormControl
                                isRequired
                                isInvalid={formRoomError.name}
                            >
                                <FormControl.Label>Tên phòng</FormControl.Label>
                                <Input
                                    placeholder="Phòng VIP"
                                    value={formRoomData.name}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            name: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.name}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.logo}
                            >
                                <FormControl.Label>Logo</FormControl.Label>
                                <Input
                                    placeholder="URL"
                                    value={formRoomData.logo}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            logo: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.logo}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.images}
                            >
                                <FormControl.Label>Ảnh phòng</FormControl.Label>
                                <Input
                                    placeholder="URLs (ngăn cách bởi dấu phẩy)"
                                    value={formRoomData.images}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            images: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.images}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.description}
                            >
                                <FormControl.Label>
                                    Mô tả phòng
                                </FormControl.Label>
                                <Input
                                    placeholder="Mô tả"
                                    value={formRoomData.description}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            description: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.description}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.facilities}
                            >
                                <FormControl.Label>Tiện ích</FormControl.Label>
                                <Input
                                    placeholder="Điều hòa, Nóng lạnh (ngăn cách bởi dấu phẩy)"
                                    value={formRoomData.facilities}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            facilities: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.facilities}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.supplies}
                            >
                                <FormControl.Label>
                                    Đồ dùng cung cấp
                                </FormControl.Label>
                                <Input
                                    placeholder="Máy sấy, Dép (ngăn cách bởi dấu phẩy)"
                                    value={formRoomData.supplies}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            supplies: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formRoomError.supplies}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.room_size}
                            >
                                <FormControl.Label>Diện tích</FormControl.Label>
                                <Input
                                    placeholder="20"
                                    value={formRoomData.room_size}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            room_size: text,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.rating}
                            >
                                <FormControl.Label>Đánh giá</FormControl.Label>
                                <Input
                                    placeholder="4"
                                    value={formRoomData.rating}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            rating: text,
                                        })
                                    }
                                />

                                <FormControl.ErrorMessage>
                                    {formRoomError.rating}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formRoomError.price}
                            >
                                <FormControl.Label>Giá</FormControl.Label>
                                <Input
                                    placeholder="10000"
                                    value={formRoomData.price}
                                    onChangeText={(text) =>
                                        setFormRoomData({
                                            ...formRoomData,
                                            price: text,
                                        })
                                    }
                                />

                                <FormControl.ErrorMessage>
                                    {formRoomError.price}
                                </FormControl.ErrorMessage>
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
                                    Hủy
                                </Button>
                                <Button
                                    onPress={() => {
                                        handleSubmitRoomForm();
                                    }}
                                >
                                    Lưu
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

                {employees && employees.length > 0 ? (
                    <View style={{ display: "flex", gap: 10 }}>
                        {employees.map((employee) => (
                            <EmployeeCard key={employee.id} {...employee} />
                        ))}
                    </View>
                ) : (
                    <Text>Không có nhân viên</Text>
                )}

                {/* thêm nhân viên  */}
                <AntDesign
                    name="plussquare"
                    size={24}
                    color="#00dc81"
                    style={{ alignSelf: "center", marginTop: 10, fontSize: 30 }}
                    onPress={() => setShowEmployeeModal(true)}
                />
            </View>

            {/* modal tạo tài khoản nhân viên  */}
            <Center>
                <Modal
                    isOpen={showEmployeeModal}
                    onClose={() => setShowEmployeeModal(false)}
                >
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Tạo tài khoản nhân viên</Modal.Header>
                        <Modal.Body>
                            <FormControl
                                isRequired
                                isInvalid={formEmployeeError.email}
                            >
                                <FormControl.Label>Email</FormControl.Label>
                                <Input
                                    placeholder="example@gmail.com"
                                    defaultValue={formEmployeeData.email}
                                    onChangeText={(text) =>
                                        setFormEmployeeData({
                                            ...formEmployeeData,
                                            email: text,
                                        })
                                    }
                                />
                                <FormControl.ErrorMessage>
                                    {formEmployeeError.email}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formEmployeeError.password}
                            >
                                <FormControl.Label>Mật khẩu</FormControl.Label>
                                <Input
                                    placeholder="******"
                                    type="password"
                                    defaultValue={formEmployeeData.password}
                                    onChangeText={(text) =>
                                        setFormEmployeeData({
                                            ...formEmployeeData,
                                            password: text,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formEmployeeError.first_name}
                            >
                                <FormControl.Label>Họ</FormControl.Label>
                                <Input
                                    placeholder=""
                                    defaultValue={formEmployeeData.first_name}
                                    onChangeText={(text) =>
                                        setFormEmployeeData({
                                            ...formEmployeeData,
                                            first_name: text,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formEmployeeError.last_name}
                            >
                                <FormControl.Label>Tên</FormControl.Label>
                                <Input
                                    placeholder=""
                                    defaultValue={formEmployeeData.name}
                                    onChangeText={(text) =>
                                        setFormEmployeeData({
                                            ...formEmployeeData,
                                            last_name: text,
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                mt="3"
                                isRequired
                                isInvalid={formEmployeeError.phone_num}
                            >
                                <FormControl.Label>
                                    Số điện thoại
                                </FormControl.Label>
                                <Input
                                    placeholder=""
                                    defaultValue={formEmployeeData.phone_num}
                                    onChangeText={(text) =>
                                        setFormEmployeeData({
                                            ...formEmployeeData,
                                            phone_num: text,
                                        })
                                    }
                                />
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
                                    Hủy
                                </Button>
                                <Button
                                    onPress={async () => {
                                        handleSubmitEmployeeForm();
                                    }}
                                >
                                    Lưu
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>

            {/* modal chỉnh sửa thông tin khách sạn  */}
            <Modal isOpen={isEditHotel} onClose={() => setIsEditHotel(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Chỉnh sửa thông khách sạn</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Tên khách sạn</FormControl.Label>
                            <Input
                                placeholder="Tên khách sạn"
                                value={editHotelName}
                                onChangeText={(text) => setEditHotelName(text)}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Địa chỉ</FormControl.Label>
                            <Input
                                placeholder="Địa chỉ"
                                value={editHotelAddress}
                                onChangeText={(text) =>
                                    setEditHotelAddress(text)
                                }
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Đánh giá</FormControl.Label>
                            <Input
                                placeholder="Đánh giá"
                                value={editHotelRating.toString()}
                                onChangeText={(text) =>
                                    setEditHotelRating(text)
                                }
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Logo</FormControl.Label>
                            <Input
                                placeholder="Logo"
                                value={editHotelLogo}
                                onChangeText={(text) => setEditHotelLogo(text)}
                            />
                        </FormControl>
                        <FormControl mt="3">
                            <Button
                                colorScheme="red"
                                onPress={() => setIsDeleteHotel(true)}
                            >
                                Xóa khách sạn
                            </Button>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setIsEditHotel(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                onPress={async () => {
                                    try {
                                        const response = await fetch(
                                            `${BASE_URL}/api/hotel/${hotel_id}`,
                                            {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    name: editHotelName,
                                                    address: editHotelAddress,
                                                    rating: editHotelRating,
                                                    logo: editHotelLogo,
                                                }),
                                            }
                                        );
                                        if (response.ok) {
                                            alert(
                                                "Chỉnh sửa thông tin khách sạn thành công"
                                            );
                                            setIsEditHotel(false);
                                            increaseCount();
                                        } else {
                                            const data = await response.json();
                                            if (data.message) {
                                                alert(data.message);
                                            } else {
                                                alert(
                                                    "Đã xảy ra lỗi khi chỉnh sửa thông tin khách sạn"
                                                );
                                            }
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        alert(
                                            "Đã xảy ra lỗi khi chỉnh sửa thông tin khách sạn"
                                        );
                                    }
                                    setIsEditHotel(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* alert dialog xóa khách sạn  */}
            <Modal
                isOpen={isDeleteHotel}
                onClose={() => setIsDeleteHotel(false)}
            >
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Xác nhận xóa khách sạn</Modal.Header>
                    <Modal.Body>
                        <Text>Bạn có chắc chắn muốn xóa khách sạn này?</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setIsDeleteHotel(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                colorScheme="red"
                                onPress={async () => {
                                    try {
                                        const response = await fetch(
                                            `${BASE_URL}/api/hotel/${hotel_id}`,
                                            {
                                                method: "DELETE",
                                            }
                                        );
                                        if (response.ok) {
                                            alert("Xóa khách sạn thành công");
                                            setIsDeleteHotel(false);
                                            increaseCount();
                                            navigation.navigate("Manager");
                                        } else {
                                            const data = await response.json();
                                            if (data.message) {
                                                alert(data.message);
                                            } else {
                                                alert(
                                                    "Đã xảy ra lỗi khi xóa khách sạn"
                                                );
                                            }
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        alert(
                                            "Đã xảy ra lỗi khi xóa khách sạn"
                                        );
                                    }
                                    setIsDeleteHotel(false);
                                }}
                            >
                                Xóa
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </ScrollView>
    );
}
