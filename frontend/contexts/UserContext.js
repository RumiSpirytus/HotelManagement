// UserContext.js
import * as React from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [count, setCount] = React.useState(0);

    // Add a function to log in the user
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Add a function to log out the user
    const logoutUser = () => {
        setUser(null);
    };

    const increaseCount = () => {
        setCount(count + 1);
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, count, increaseCount }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;