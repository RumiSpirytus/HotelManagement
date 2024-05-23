import { createContext, useState, useEffect } from 'react';

const ManagerContext = createContext()

export const ManagerProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };

    return (
        <ManagerContext.Provider value={{ count, increaseCount }}>
            {children}
        </ManagerContext.Provider>
    );
};

export default ManagerContext;