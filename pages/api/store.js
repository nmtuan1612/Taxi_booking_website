import { createContext, useContext, useState } from "react";

export const BookingContext = createContext();

export const BookingContextProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    booking_type: "xeduongdai",
    car_option: "4",
    departure_date: "",
    departure_time: "",
    direction_option: "1",
    distance: { text: "", value: 0 },
    drop_location: "",
    pickup_location: "",
    price: "",
  });
  const [priceData, setPriceData] = useState([]);

  return (
    <BookingContext.Provider
      value={{ booking, setBooking, priceData, setPriceData }}
    >
      {children}
    </BookingContext.Provider>
  );
};
