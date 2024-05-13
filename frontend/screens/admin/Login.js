import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors.js";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../components/Button.js";

import UserContext from "../../contexts/UserContext.js";

import { BASE_URL } from "../../utils.js";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const { loginUser } = React.useContext(UserContext);

    const validateForm = () => {
        let isValid = true;
        let emailRegEx = /\S+@\S+\.\S+/;

        if (!emailRegEx.test(email)) {
            alert("Vui lòng nhập email hợp lệ.");
            isValid = false;
        } else if (password.length < 6) {
            alert("Mật khẩu phải chứa ít nhất 6 ký tự.");
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            // handle login
            formData = {
                email: email,
                password: password,
            };

            try {
                const response = await fetch(
                    `${BASE_URL}/api/user/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                let responseData = await response.json();

                if (response.ok) {
                    alert("Đăng nhập thành công.");

                    // Save user data to context
                    loginUser(responseData);

                    // Navigate to Home screen
                    if (responseData.role == "customer") {
                        navigation.navigate("Home");
                    }
                } else {
                    if (responseData.detail == "Incorrect email") {
                        alert("Email không tồn tại");
                    } else if (responseData.detail == "Incorrect password") {
                        alert("Mật khẩu không chính xác!");
                    }
                }
            } catch (error) {
                console.log(error);
                alert(error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            marginVertical: 12,
                            color: COLORS.black,
                        }}
                    >
                        Chào mừng ! 👋
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8,
                        }}
                    >
                        Email
                    </Text>

                    <View
                        style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22,
                        }}
                    >
                        <TextInput
                            placeholder="Nhập email"
                            placeholderTextColor={COLORS.black}
                            keyboardType="email-address"
                            style={{ width: "100%" }}
                            onChangeText={setEmail}
                            value={email}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8,
                        }}
                    >
                        Mật khẩu
                    </Text>

                    <View
                        style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22,
                        }}
                    >
                        <TextInput
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{ width: "100%" }}
                            onChangeText={setPassword}
                            value={password}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12,
                            }}
                        >
                            {isPasswordShown == true ? (
                                <Ionicons
                                    name="eye-off"
                                    size={24}
                                    color={COLORS.black}
                                />
                            ) : (
                                <Ionicons
                                    name="eye"
                                    size={24}
                                    color={COLORS.black}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 6,
                    }}
                >
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Nhớ mật khẩu</Text>
                </View>

                <Button
                    title="Đăng nhập"
                    filled
                    style={{ marginTop: 18, marginBottom: 4 }}
                    onPress={handleLogin}
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 20,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10,
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Hoặc đăng nhập với</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10,
                        }}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8,
                            }}
                            resizeMode="contain"
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10,
                        }}
                    >
                        <Image
                            source={require("../../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8,
                            }}
                            resizeMode="contain"
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22,
                    }}
                >
                    <Text style={{ fontSize: 16, color: COLORS.black }}>
                        Bạn chưa có tài khoản?{" "}
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6,
                            }}
                        >
                            Đăng ký
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;
