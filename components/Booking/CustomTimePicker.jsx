import React, { useState, useRef } from "react";

const TimePicker = () => {

  const dateRef = useRef();
  const timeRef = useRef(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          fontFamily: "var(--font-alt)",
          color: "var(--color-grey)",
          marginBottom: "6px",
        }}
      >
        <label
          htmlFor="date_picker"
          style={{ padding: "0 4px", flex: 1 }}
        >
          Ngày đón
        </label>
        <label
          htmlFor="time_picker"
          style={{ padding: "0 4px", flex: 1 }}
        >
          Giờ đón
        </label>
      </div>
      <div className="form__input-item flex__center">
        <input
          type="date"
          id="date_picker"
          ref={dateRef}
          name="departure_date"
          className="option__input"
          onClick={() => dateRef.current.showPicker()}
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
          id="time_picker"
          type="time"
          ref={timeRef}
          name="departure_time"
          className="option__input"
          onClick={() => timeRef.current.showPicker()}
        />
      </div>
    </>
  );
};

export default TimePicker;
