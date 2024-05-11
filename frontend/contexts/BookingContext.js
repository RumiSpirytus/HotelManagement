// UserContext.js
import * as React from "react";

const BookingContext = React.createContext();
import UserContext from "./UserContext";

import { BASE_URL } from "../utils";

export const BookingProvider = ({ children }) => {
    const [booking, setBooking] = React.useState(null);
    const { user } = React.useContext(UserContext);

    const getBooking = async () => {
        if (!user) return;
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/customer/${user?.role_id}`
            );
            const data = await response.json();
            if (data.length > 0) {
                setBooking(data);
                return data;
            }
        } catch (error) {
            console.error('Failed to get booking:', error);
        }
    };

    const addBooking = async (bookingData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });
            const data = await response.json();
            setBooking(data);
        } catch (error) {
            console.error('Failed to add booking:', error);
        }
    };

    const cancelBooking = () => {
        setBooking(null);
    };

    const getBookingDetail = async (booking_id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/booking/${booking_id}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to get booking detail:', error);
        }
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