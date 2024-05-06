// UserContext.js
import * as React from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    // Add a function to log in the user
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Add a function to log out the user
    const logoutUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;