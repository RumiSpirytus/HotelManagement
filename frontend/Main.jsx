import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();
const Main = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={Home}>
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Main;
