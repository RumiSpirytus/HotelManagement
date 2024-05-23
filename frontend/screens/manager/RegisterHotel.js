import {
    View,
    Text,
    Button,
    ScrollView,
    FormControl,
    Input,
    TextArea,
    Image,
} from "native-base";

import React, { useState, useEffect, useContext } from "react";

import { BASE_URL } from "../../utils";

import UserContext from "../../contexts/UserContext";
import ManagerContext from "../../contexts/ManagerContext";

export default function RegisterHotel({ navigation }) {
    const { user } = useContext(UserContext);
    const { increaseCount } = useContext(ManagerContext);

    const [formData, setData] = useState({
        name: "",
        description: "",
        address: "",
        rating: 0,
        logo: "",
        images: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        address: "",
        rating: "",
        logo: "",
    });

    // Add a function to validate the form
    const validateForm = () => {
        let newErrors = {
            name: "",
            description: "",
            address: "",
            rating: "",
            logo: "",
        };

        // Validate name (at least 3 characters)
        if (formData.name.length < 3) {
            newErrors.name = "Tên chứa ít nhất 3 ký tự.";
        }

        // Validate description (at least 100 characters)
        if (formData.description.length < 100) {
            newErrors.description = " Mô tả chứa ít nhất 100 ký tự.";
        }

        // Validate address (not empty)
        if (formData.address === "") {
            newErrors.address = " Địa chỉ là bắt buộc.";
        }

        // Validate rating (number between 1 and 5)
        if (
            isNaN(formData.rating) ||
            formData.rating < 1 ||
            formData.rating > 5
        ) {
            newErrors.rating = " Rating phải là một số từ 1 đến 5.";
        }

        // Validate logo (not empty)
        if (formData.logo === "") {
            newErrors.logo = " Logo là bắt buộc.";
        }

        setErrors(newErrors);

        // If no errors, return true, else return false
        return !Object.values(newErrors).some((error) => error !== "");
    };

    // Modify the save button's onPress function to validate the form
    const handleSave = async () => {
        if (validateForm()) {
            // If the form is valid, proceed with saving...
            let form_register_hotel = {
                manager_id: user?.role_id,
                name: formData.name,
                description: formData.description,
                address: formData.address,
                rating: formData.rating,
                logo: formData.logo,
                images: formData.images.split(",").map((image) => image.trim()),
            };
            try {
                const response = await fetch(`${BASE_URL}/api/hotel`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form_register_hotel),
                });

                if (response.ok) {
                    const data = await response.json();
                    increaseCount();
                    alert("Khách sạn đã được đăng ký thành công.");
                    navigation.navigate("Manager");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Đã xảy ra lỗi khi đăng ký khách sạn.");
            }
        }
    };

    return (
        <ScrollView
            style={{
                paddingHorizontal: 20,
                paddingVertical: 60,
                display: "flex",
                gap: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                    paddingVertical: 10,
                    fontWeight: "bold",
                }}
            >
                Đăng ký khách sạn
            </Text>

            <View style={{ display: "flex", gap: 10 }}>
                {/* Tên khách sạn  */}
                <FormControl isRequired isInvalid={errors.name !== ""}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Tên khách sạn
                    </FormControl.Label>
                    <Input
                        placeholder="ABC"
                        onChangeText={(value) =>
                            setData({ ...formData, name: value })
                        }
                        defaultValue={formData.name}
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        {errors.name}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* description  */}
                <FormControl isRequired isInvalid={errors.description !== ""}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Mô tả
                    </FormControl.Label>
                    <TextArea
                        onChangeText={(value) =>
                            setData({ ...formData, description: value })
                        }
                        defaultValue={formData.description}
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        {errors.description}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* địa chỉ  */}
                <FormControl isRequired isInvalid={errors.address !== ""}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Địa chỉ
                    </FormControl.Label>
                    <Input
                        placeholder="Cầu Giấy"
                        onChangeText={(value) =>
                            setData({ ...formData, address: value })
                        }
                        defaultValue={formData.address}
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        {errors.address}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* rating  */}
                <FormControl isRequired isInvalid={errors.rating !== ""}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Rating
                    </FormControl.Label>
                    <Input
                        placeholder="5"
                        onChangeText={(value) =>
                            setData({ ...formData, rating: value })
                        }
                        defaultValue={formData.rating}
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        {errors.rating}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* upload logo  */}
                <FormControl isRequired isInvalid={errors.logo != ""}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Logo
                    </FormControl.Label>
                    <Input
                        placeholder=""
                        onChangeText={(value) =>
                            setData({ ...formData, logo: value })
                        }
                        defaultValue={formData.logo}
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        {errors.logo}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* upload images  */}
                <FormControl>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Images
                    </FormControl.Label>
                    <Input
                        placeholder="URL1, URL2, URL3"
                        onChangeText={(value) =>
                            setData({ ...formData, images: value })
                        }
                        defaultValue={formData.images}
                    />
                </FormControl>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        style={{ backgroundColor: "#0dbd27" }}
                        onPress={handleSave}
                    >
                        Lưu
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
