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

import { BASE_URL } from "../../utils.js";

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [isManager, setIsManager] = useState(false);

    const validateForm = () => {
        let isValid = true;
        let emailRegEx = /\S+@\S+\.\S+/;

        if (!emailRegEx.test(email)) {
            alert("Vui lòng nhập địa chỉ email hợp lệ.");
            isValid = false;
        } else if (phoneNumber.length < 10) {
            alert("Số điện thoại phải có ít nhất 10 số.");
            isValid = false;
        } else if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự.");
            isValid = false;
        } else if (!isChecked) {
            alert("Vui lòng đồng ý với các điều khoản.");
            isValid = false;
        }

        return isValid;
    };

    const handleSignup = async () => {
        if (validateForm()) {
            formData = {
                email: email,
                password: password,
                role: isManager ? "manager" : "customer",
            };
            try {
                const response = await fetch(`${BASE_URL}/api/user/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                let responseData = await response.json();
                if (response.ok) {
                    alert("Đăng ký thành công!");
                    navigation.navigate("Login");
                } else {
                    if (responseData.detail == "User already exists") {
                        throw new Error("Email đã tồn tại!");
                    }
                }
            } catch (error) {
                console.log(error);
                alert(error.message || "Đã có lỗi xảy ra!");
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
                        Đăng ký
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

                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Checkbox
                            style={{ marginRight: 8 }}
                            value={isManager}
                            onValueChange={setIsManager}
                            color={isManager ? COLORS.primary : undefined}
                        />

                        <Text style={{}}>Bạn là chủ khách sạn?</Text>
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
                        Số điện thoại
                    </Text>

                    <View
                        style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingLeft: 22,
                        }}
                    >
                        <TextInput
                            placeholder="+84"
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%",
                            }}
                        />

                        <TextInput
                            placeholder="Nhập số điện thoại của bạn"
                            placeholderTextColor={COLORS.black}
                            style={{ width: "80%" }}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
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
                        alignItems: "center",
                    }}
                >
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text style={{ fontStyle: "italic" }}>
                        Tôi đồng ý với các điều khoản
                    </Text>
                </View>

                <Button
                    title="Đăng ký"
                    filled
                    style={{ marginTop: 18, marginBottom: 4 }}
                    onPress={handleSignup}
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
                    <Text style={{ fontSize: 14 }}>Hoặc đăng ký với</Text>
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
                        Bạn đã có tài khoản?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 6,
                            }}
                        >
                            Đăng nhập
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;
