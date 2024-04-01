import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";

const Stack = createNativeStackNavigator();
const Main = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="home"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Group>
					<Stack.Screen name="home" component={Home} />
					{/* <Stack.Screen name="Setting" component={Setting} /> */}
					<Stack.Screen name="login" component={Login} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Main;
