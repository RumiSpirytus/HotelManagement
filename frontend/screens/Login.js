import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import {
	colors,
	defaultStyle,
	formHeading,
	inputOptions,
	formStyles as styles,
} from "../styles/styles";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<View style={defaultStyle}>
				{/* Heading */}
				<View style={{ marginBottom: 20 }}>
					<Text style={formHeading}>Login</Text>
				</View>

				<View style={styles.container}>
					<TextInput
						{...inputOptions}
						placeholder="Email"
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>

					<TextInput
						{...inputOptions}
						placeholder="Password"
						secureTextEntry={true}
						value={password}
						onChangeText={setPassword}
					/>

					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => navigation.navigate("forgetpassword")}
					>
						<Text style={styles.forget}>Forget Password?</Text>
					</TouchableOpacity>

					<Button
						textColor={colors.color2}
						disabled={email === "" || password === ""}
						style={styles.btn}
					>
						Log In
					</Button>
				</View>
			</View>

			<Footer activeRoute="profile" />
		</>
	);
};

export default Login;
