import React, { useState } from "react";
import Calendar from "./Calendar";

const Form = () => {
  const [inputValue, setInputValue] = useState({
    destination: "",
    date: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(true);
  };

  return (
    <div className="main-container">
      <h2>
        Reserva tu espacio de coworking que mejor se adapte a tu necesidad{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="section-inputs">
          <input
            className="data-input"
            type="text"
            onChange={(e) =>
              setInputValue({ ...inputValue, destination: e.target.value })
            }
            placeholder="¿A dónde de vamos?"
          />
          <Calendar />
          {/* <input
            className="data-input"
            type="date"
            onChange={(e) =>
              setInputValue({ ...inputValue, date: e.target.value })
            }
            placeholder="Check in - Check out"
          /> */}
          <button type="submit" className="submit-btn">
            BUSCAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
