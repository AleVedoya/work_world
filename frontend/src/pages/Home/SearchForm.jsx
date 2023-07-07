import {useState } from "react";
import Calendar from "../../Components/ui/Calendar.jsx";
import '../../styles/Buscador.css';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState({
    destination: "",
    date: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // setShow(true);
  };

  return (
    <div className="main-container">
      <h2>
        Reserva tu espacio de coworking que mejor se adapte a tu necesidad{" "}
      </h2>
      <form className='form-buscador' onSubmit={handleSubmit}>
        <div className="section-inputs">
          <input
            className="data-input"
            type="text"
            onChange={(e) =>
              setInputValue({ ...inputValue, destination: e.target.value })
            }
            placeholder="Elige tu espacio"
          />
          <Calendar/>
          <button type="submit" className="submit-btn">
            BUSCAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
