// src/components/Appointment/Header.jsx
import React from "react";

const Header = (props) => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">
        {props.time}
      </h4>
    </header>
  );
};