import { View, Text, TextInput } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

import { Button, Box, FormControl, Stack, Input, WarningOutlineIcon } from "native-base";

export default function Home() {
    return (
        <StyledView className=" flex flex-col gap-4">
            <StyledView className=" p-4 bg-white">
                <StyledView className=" bg-white shadow-lg rounded-lg flex flex-col gap-4">
                    <Box alignItems="center">
                        <Box w="100%">
                            <FormControl className="flex flex-col gap-4">
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
                                        Vui lòng nhập tên địa điểm, khách sạn
                                    </FormControl.ErrorMessage>
                                </Stack>

								<Stack mx="">
                                    <FormControl.Label>
                                        Password
                                    </FormControl.Label>
                                    <Input
                                        type="password"
                                        defaultValue="12345"
                                        placeholder="password"
                                    />
                                    <FormControl.HelperText>
                                        Must be atleast 6 characters.
                                    </FormControl.HelperText>
                                    <FormControl.ErrorMessage
                                        leftIcon={
                                            <WarningOutlineIcon size="xs" />
                                        }
                                    >
                                        Atleast 6 characters are required.
                                    </FormControl.ErrorMessage>
                                </Stack>
								
                            </FormControl>
                        </Box>
                    </Box>
                    
                    <Button onPress={() => console.log("hello world")}>
                        Tìm kiếm
                    </Button>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}
