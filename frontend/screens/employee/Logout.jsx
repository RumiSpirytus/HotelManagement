import { View, Text } from "react-native"
import { Button } from "native-base"
import UserContext from "../../contexts/UserContext"
import { useContext } from "react"

export default function Logout() {

    const {logoutUser} = useContext(UserContext)
    return (
        <View style={{paddingHorizontal: 20, paddingVertical: 120}}>
            <Button onPress={() => logoutUser()}>Đăng xuất</Button>
        </View>
    )
}