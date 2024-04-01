import React from "react";
import { Text, View } from "react-native";
import Header from "../components/Header.jsx";
import { defaultStyle } from "../styles/styles";
import Footer from "./../components/Footer";

const Home = () => {
	return (
		<>
			<View style={{ ...defaultStyle, flex: 1 }}>
				<Header />
				<View>
					<Text style={{ fontSize: 25 }}> Hotel </Text>
					<Text style={{ fontSize: 25 }}> Management </Text>
				</View>
				<View style={{ marginTop: 320 }}>
					<Text>Description</Text>
				</View>
			</View>

			<Footer activeRoute={"home"} />
		</>
	);
};

export default Home;
