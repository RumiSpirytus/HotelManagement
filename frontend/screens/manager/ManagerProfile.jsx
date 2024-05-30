import { View, Text, ScrollView, Box, FormControl } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar, Input, Button, AlertDialog } from "native-base";

import { useState, useEffect, useContext } from "react";

import UserContext from "../../contexts/UserContext";

import { BASE_URL } from "../../utils";

export default function ManagerProfile() {
    const [isEditting, setIsEditting] = useState(false);

    const [userDetail, setUserDetail] = useState({});
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    const { getUserInfo, user, logoutUser } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    useEffect(() => {
        getUserInfo().then((data) => {
            setUserDetail(data);
            setFirstName(data?.first_name);
            setLastName(data?.last_name);
            setPhoneNum(data?.phone_num);
        });
    }, [user]);

    const handleSave = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/customer/${user?.role_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        phone_num: phoneNum,
                        bank_name: bankName,
                        bank_num: bankNum,
                    }),
                }
            );
            const data = await response.json();
            alert("Cập nhật thông tin thành công");
            setUserDetail(data);
            setIsEditting(false);
        } catch (error) {
            console.error("Failed to update user info:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    const handleLogout = () => {
        // Add a function to log out the user
        logoutUser();
    };

    return (
        <ScrollView
            style={{
                paddingVertical: 60,
                display: "flex",
                flexDirection: "column",
                gap: 20,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                }}
            >
                <AntDesign name="user" size={24} color="green" />
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        padding: 10,
                    }}
                >
                    Hồ sơ của bạn
                </Text>
            </View>

            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 20,
                }}
            >
                <Avatar bg="green.500" alignSelf="center" size="2xl">
                    TS
                </Avatar>

                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                    {`Chào mừng ${firstName} ${lastName}!`}
                </Text>

                <MaterialIcons
                    name="logout"
                    size={32}
                    color="red"
                    onPress={() => setShowConfirmLogout(true)}
                />
            </View>

            <View
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    paddingTop: 20,
                    marginTop: 20,
                    marginBottom: 40,
                    paddingBottom: 200,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingHorizontal: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                        }}
                    >
                        <AntDesign name="profile" size={24} color="green" />
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>
                            Thông tin cá nhân
                        </Text>
                    </View>

                    <View>
                        <AntDesign
                            name="edit"
                            size={24}
                            color="green"
                            onPress={() => {
                                setIsEditting(true);
                            }}
                        />
                    </View>
                </View>

                <Box
                    style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "center",
                    }}
                >
                    <FormControl>
                        <FormControl.Label>Họ</FormControl.Label>
                        {isEditting ? (
                            <Input
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                        ) : (
                            <Text>{userDetail?.first_name}</Text>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Tên</FormControl.Label>
                        {isEditting ? (
                            <Input
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                            />
                        ) : (
                            <Text>{userDetail?.last_name}</Text>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Số điện thoại</FormControl.Label>
                        {isEditting ? (
                            <Input
                                value={phoneNum}
                                onChangeText={(text) => setPhoneNum(text)}
                            />
                        ) : (
                            <Text>{userDetail?.phone_num}</Text>
                        )}
                    </FormControl>

                    {isEditting ? (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 12,
                                marginTop: 20,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                style={{ backgroundColor: "red" }}
                                onPress={() => {
                                    setIsEditting(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button onPress={handleSave}>Lưu</Button>
                        </View>
                    ) : null}
                </Box>
            </View>
            <AlertDialog
                isOpen={showConfirmLogout}
                onClose={() => setShowConfirmLogout(false)}
            >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Đăng xuất</AlertDialog.Header>
                    <AlertDialog.Body>
                        Bạn có chắc muốn đăng xuất?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={() => setShowConfirmLogout(false)}
                            >
                                Hủy
                            </Button>
                            <Button colorScheme="danger" onPress={handleLogout}>
                                Xác nhận
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </ScrollView>
    );
}
