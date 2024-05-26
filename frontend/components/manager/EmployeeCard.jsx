import { View, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Center, FormControl, Input, Modal } from "native-base";
import { TouchableOpacity } from "react-native";

import { useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../utils";

import ManagerContext from "../../contexts/ManagerContext";
import UserContext from "../../contexts/UserContext";

import { AlertDialog } from "native-base";

export default function EmployeeCard({
    id,
    email,
    first_name,
    last_name,
    phone_num,
}) {
    const { increaseCount } = useContext(ManagerContext);
    const { count } = useContext(UserContext);
    const [isEditEmployee, setIsEditEmployee] = useState(false);

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        async function getEmployee() {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/employee/employee_id/${id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data);
                    setEditEmployeeFirstName(data.first_name);
                    setEditEmployeeLastName(data.last_name);
                    setEditEmployeePhoneNum(data.phone_num);

                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getEmployee();
    }, [count]);

    const [editEmployeeFirstName, setEditEmployeeFirstName] = useState(
        employee.first_name
    );
    const [editEmployeeLastName, setEditEmployeeLastName] = useState(
        employee.last_name
    );
    const [editEmployeePhoneNum, setEditEmployeePhoneNum] = useState(
        employee.phone_num
    );
    const [editEmployeePassword, setEditEmployeePassword] = useState("");

    const [isDeleteEmployee, setIsDeleteEmployee] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsEditEmployee(true)}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "",
                    gap: 10,
                    borderWidth: 1,
                    borderColor: "#a8a7a7",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: "white",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 16,
                        alignItems: "center",
                    }}
                >
                    <FontAwesome name="vcard" size={24} color="#62ace5" />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontWeight: "600" }}>Email:</Text>
                        <Text>{email}</Text>
                    </View>
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="rename-box"
                        size={24}
                        color="#feb2a8"
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontWeight: "600" }}>Họ và tên:</Text>
                        <Text>{`${first_name} ${last_name}`}</Text>
                    </View>
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        alignItems: "center",
                    }}
                >
                    <AntDesign name="phone" size={24} color="#00dc81" />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontWeight: "600" }}>
                            Số điện thoại:
                        </Text>
                        <Text>{phone_num}</Text>
                    </View>
                </View>
                {/* modal chỉnh sửa thông tin nhân viên */}
                <Center>
                    <Modal
                        isOpen={isEditEmployee}
                        onClose={() => setIsEditEmployee(false)}
                    >
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>
                                Chỉnh sửa thông tin nhân viên
                            </Modal.Header>
                            <Modal.Body>
                                <FormControl mt="3">
                                    <FormControl.Label>
                                        Cấp mật khẩu mới
                                    </FormControl.Label>
                                    <Input
                                        placeholder="******"
                                        type="password"
                                        defaultValue={editEmployeePassword}
                                        onChangeText={(text) =>
                                            setEditEmployeePassword(text)
                                        }
                                    />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Họ</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        defaultValue={editEmployeeFirstName}
                                        onChangeText={(text) =>
                                            setEditEmployeeFirstName(text)
                                        }
                                    />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>Tên</FormControl.Label>
                                    <Input
                                        placeholder=""
                                        defaultValue={editEmployeeLastName}
                                        onChangeText={(text) =>
                                            setEditEmployeeLastName(text)
                                        }
                                    />
                                </FormControl>
                                <FormControl mt="3">
                                    <FormControl.Label>
                                        Số điện thoại
                                    </FormControl.Label>
                                    <Input
                                        placeholder=""
                                        defaultValue={editEmployeePhoneNum}
                                        onChangeText={(text) =>
                                            setEditEmployeePhoneNum(text)
                                        }
                                    />
                                </FormControl>
                                <FormControl mt="3">
                                    <Button colorScheme="red" onPress={() => setIsDeleteEmployee(true)}>
                                        Xóa nhân viên
                                    </Button>
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setIsEditEmployee(false);
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        onPress={async () => {
                                            try {
                                                const response = await fetch(
                                                    `${BASE_URL}/api/employee/${id}`,
                                                    {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            first_name:
                                                                editEmployeeFirstName,
                                                            last_name:
                                                                editEmployeeLastName,
                                                            phone_num:
                                                                editEmployeePhoneNum,
                                                            password:
                                                                editEmployeePassword,
                                                        }),
                                                    }
                                                );
                                                if (response.ok) {
                                                    alert(
                                                        "Chỉnh sửa thông tin nhân viên thành công"
                                                    );
                                                    setIsEditEmployee(false);
                                                    setEditEmployeePassword("");
                                                    increaseCount();
                                                }
                                            } catch (error) {
                                                console.error(error);
                                                alert(
                                                    "Đã xảy ra lỗi khi chỉnh sửa thông tin nhân viên"
                                                );
                                            }
                                            setIsEditEmployee(false);
                                        }}
                                    >
                                        Lưu
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>

                {/* confirmDeleteEmployee  */}
                <AlertDialog
                    isOpen={isDeleteEmployee}
                    onClose={() => setIsDeleteEmployee(false)}
                >
                    <AlertDialog.Content maxWidth="400px">
                        <AlertDialog.Header>
                            Xác nhận xóa nhân viên
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text>
                                Bạn có chắc chắn muốn xóa nhân viên này không?
                            </Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant="ghost"
                                    colorScheme="blueGray"
                                    onPress={() => {
                                        setIsDeleteEmployee(false);
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                colorScheme="red"
                                    onPress={async () => {
                                        try {
                                            const response = await fetch(
                                                `${BASE_URL}/api/employee/${id}`,
                                                {
                                                    method: "DELETE",
                                                }
                                            );
                                            if (response.ok) {
                                                alert(
                                                    "Xóa nhân viên thành công"
                                                );
                                                setIsDeleteEmployee(false);
                                                increaseCount();
                                            }
                                        } catch (error) {
                                            console.error(error);
                                            alert(
                                                "Đã xảy ra lỗi khi xóa nhân viên"
                                            );
                                        }
                                        setIsDeleteEmployee(false);
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </View>
        </TouchableOpacity>
    );
}
