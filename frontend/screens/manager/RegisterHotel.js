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

import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
} from "react-native";

import React, { useState, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Ionicons from "@expo/vector-icons/Ionicons";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
};

export default function RegisterHotel({ navigation }) {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const [formData, setData] = useState({
        name: "",
        description: "",
        address: "",
        rating: 0,
        logo: "",
    });

    // Load images on startup
    useEffect(() => {
        loadImages();
    }, []);

    // Load images from file system
    const loadImages = async () => {
        await ensureDirExists();
        const files = await FileSystem.readDirectoryAsync(imgDir);
        if (files.length > 0) {
            setImages(files.map((f) => imgDir + f));
        }
    };

    // Select image from library or camera
    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    // Save image to file system
    const saveImage = async (uri) => {
        await ensureDirExists();
        const filename = new Date().getTime() + ".jpeg";
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        setImages([...images, dest]);
    };

    // Upload image to server
    const uploadImage = async (uri) => {
        setUploading(true);

        await FileSystem.uploadAsync(
            "http://192.168.1.52:8888/upload.php",
            uri,
            {
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: "file",
            }
        );

        setUploading(false);
    };

    // Delete image from file system
    const deleteImage = async (uri) => {
        await FileSystem.deleteAsync(uri);
        setImages(images.filter((i) => i !== uri));
    };

    // Render image list item
    const renderItem = ({ item }) => {
        const filename = item.split("/").pop();
        return (
            <View
                style={{
                    flexDirection: "row",
                    margin: 1,
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <Image
                    style={{ width: 80, height: 80 }}
                    source={{ uri: item }}
                    alt="Image"
                />
                <Text style={{ flex: 1 }}>{filename}</Text>
                <Ionicons.Button
                    name="cloud-upload"
                    onPress={() => uploadImage(item)}
                />
                <Ionicons.Button
                    name="trash"
                    onPress={() => deleteImage(item)}
                />
            </View>
        );
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
                <FormControl isRequired>
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
                    />
                    <FormControl.HelperText
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        Tên chứa ít nhất 3 ký tự.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        Error Name
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* description  */}
                <FormControl isRequired>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Mô tả
                    </FormControl.Label>
                    <TextArea
                        onChangeText={(value) =>
                            setData({ ...formData, name: value })
                        }
                    />
                    <FormControl.HelperText
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        Mô tả chứa ít nhất 100 ký tự.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        Error Name
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* địa chỉ  */}
                <FormControl isRequired>
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
                            setData({ ...formData, name: value })
                        }
                    />
                    <FormControl.ErrorMessage
                        _text={{
                            fontSize: "xs",
                        }}
                    >
                        Error Name
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* rating  */}
                <FormControl>
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
                            setData({ ...formData, name: value })
                        }
                    />
                </FormControl>

                {/* upload logo  */}
                <FormControl style={{ flex: 1, gap: 6 }}>
                    <FormControl.Label
                        _text={{
                            bold: true,
                        }}
                    >
                        Logo khách sạn
                    </FormControl.Label>
                    <Button onPress={() => selectImage(true)}>
                        Tải lên từ thư viện
                    </Button>

                    <FlatList
                        data={images}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        horizontal
                    />

                    {uploading && (
                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    backgroundColor: "rgba(0,0,0,0.4)",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                            ]}
                        >
                            <ActivityIndicator
                                color="#fff"
                                animating
                                size="large"
                            />
                        </View>
                    )}
                </FormControl>

                <View style={{display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center', justifyContent: 'center'}}>
                    <Button style={{backgroundColor: '#0dbd27'}}>Lưu</Button>
                </View>
            </View>
        </ScrollView>
    );
}
