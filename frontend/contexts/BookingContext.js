// UserContext.js
import * as React from "react";

const BookingContext = React.createContext();
import UserContext from "./UserContext";

export const BookingProvider = ({ children }) => {
    const [booking, setBooking] = React.useState(null);
    const { user } = React.useContext(UserContext);

    const getBooking = async () => {
        const response = await fetch(
            `http://10.0.2.2:8000/api/booking/customer/${user.role_id}`
        );
        const data = await response.json();
        if (data.length > 0) {
            setBooking(data);
            return data;
        }
    };

    const addBooking = async (bookingData) => {
        const response = await fetch("http://10.0.2.2:8000/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });
        const data = await response.json();
        setBooking(data);
    };

    const cancelBooking = () => {
        setBooking(null);
    };

    const getBookingDetail = async (booking_id) => {
        const response = await fetch(
            `http://10.0.2.2:8000/api/booking/${booking_id}`
        );
        const data = await response.json();
        return data;
    };


    return (
        <BookingContext.Provider
            value={{
                booking,
                addBooking,
                getBooking,
                cancelBooking,
                getBookingDetail,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;
