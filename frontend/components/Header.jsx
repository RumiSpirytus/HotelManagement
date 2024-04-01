import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";

const Header = ({ back }) => {
	const navigate = useNavigation();
	return (
		<>
			{back && (
				<TouchableOpacity
					style={{
						position: "absolute",
						left: 20,
						top: 40,
						zIndex: 10,
					}}
					onPress={() => navigate.goBack()}
				>
					<Avatar.Icon
						style={{ backgroundColor: colors.color4 }}
						icon={"arrow-left"}
						color={colors.color3}
					/>
				</TouchableOpacity>
			)}

			<TouchableOpacity
				style={{
					position: "absolute",
					right: 20,
					top: 40,
					zIndex: 10,
				}}
				onPress={() => navigate.navigate("Setting")}
			>
				<Avatar.Icon
					style={{ backgroundColor: colors.color4 }}
					icon={"cog"}
					color={colors.color3}
				/>
			</TouchableOpacity>
		</>
	);
};

export default Header;
