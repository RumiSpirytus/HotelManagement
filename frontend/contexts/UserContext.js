// UserContext.js
import * as React from "react";

const UserContext = React.createContext();
import { BASE_URL } from "../utils";

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [count, setCount] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState(null);

    // Add a function to log in the user
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Add a function to log out the user
    const logoutUser = () => {
        setUser(null);
        setCount(0);
        setUserInfo(null);
    };

    const increaseCount = () => {
        setCount(count + 1);
    };

    const getUserInfo = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/customer/${user?.role_id}`
            );
            const data = await response.json();
            setUserInfo(data);
            console.log("User info:", data);
            return data;
        } catch (error) {
            console.error("Failed to get user info:", error);
        }
    };

    return (
        <UserContext.Provider
            value={{ user, loginUser, logoutUser, count, increaseCount, getUserInfo, userInfo}}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
