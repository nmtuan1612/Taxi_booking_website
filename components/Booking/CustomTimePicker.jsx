import React, { useState, useRef } from "react";

const TimePicker = ({ timePicker, setTimePicker }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const dateRef = useRef();
  const timeRef = useRef(null);

  const handleDateChange = (event) => {
    dateRef.current.type = "text";
    dateRef.current.blur();
    timeRef.current.type = "time";
    timeRef.current.showPicker();

    const date = new Date(event.target.value);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setSelectedDate(event.target.value);
    setTimePicker({ date: formattedDate });
  };

  const handleTimeChange = (event) => {
    // timeRef.current.blur();
    setSelectedTime(event.target.value);
    setTimePicker((prev) => ({ ...prev, time: event.target.value }));
    // dateRef.current.style.display = "block";
  };

  return (
    <>
      <input
        type="text"
        ref={dateRef}
        name="departure_date"
        className="option__input"
        value={timePicker?.date}
        onChange={handleDateChange}
        onFocus={() => {
          dateRef.current.type = "date";
          dateRef.current.valueAsDate = new Date();
          dateRef.current.showPicker();
        }}
        placeholder="Thời gian đón"
      />

      <div
        style={{
          height: 20,
          width: 1,
          backgroundColor: "var(--color-grey)",
          margin: "0 12px",
        }}
      ></div>

      <input
        id="time"
        type="text"
        ref={timeRef}
        name="departure_time"
        className="option__input"
        value={selectedTime}
        placeholder="Giờ đón"
        onChange={handleTimeChange}
        onFocus={() => {
          const hour = new Date().getHours();
          const min = new Date().getMinutes();
          timeRef.current.type = "time";
          timeRef.current.value = hour + ":" + min;
          timeRef.current.showPicker();
        }}
      />
    </>
  );
};

export default TimePicker;
