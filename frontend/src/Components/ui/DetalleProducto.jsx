import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BloqueCaracteristicas from "../ui/BloqueCaracteristicas.jsx";
import Calendar2 from "./Calendar2.jsx";
import ImagenesGrid from "./ImagenesGrid";
import Modal from "../ui/Modal.jsx";
import Loading from "./Loading";
import LoginContext from "../../contexts/LoginContext";
import ModalReserva from "../../pages/RegisterProduct/ModalReserva.jsx";
import "../../styles/DetalleProducto.css";

export default function DetalleProducto() {
  const { date, setDateState, isLogged } = useContext(LoginContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [address, setAddress] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  function mapValueToRange(value) {
    if (value >= 1 && value <= 3) {
      return "Malo";
    } else if (value >= 4 && value <= 6) {
      return "Bueno";
    } else if (value >= 7 && value <= 8) {
      return "Muy Bueno";
    } else if (value >= 9 && value <= 10) {
      return "Excelente";
    } else {
      return "Invalid value";
    }
  }

  // Check Dates
  function changeDateFormat(date) {
    const inputDateStr = date;
    const dateObj = new Date(inputDateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getDatesInRange(startDateStr, endDateStr) {
    const dates = [];
    let currentDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    while (currentDate <= endDate) {
      dates.push(changeDateFormat(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log(dates);
    return dates;
  }

  const reservar = (e) => {
    e.preventDefault();
    if (!isLogged) {
      alert("Primero debes iniciar sesion!");
      navigate("/login");
    } else {
      navigate("/reservaConfirmation");
    }
  };

  const fetchAvialabeProductsForDates = async (id) => {
    try {
      const dataJSON = await fetch(
        `http://localhost:8080/api/v1/productos/${id}/available-dates`
      );
      const response = await dataJSON.json();
      // console.log(response);
      setAvailableDates(response);
    } catch (e) {
      console.log(e.message);
      // Add appropriate error handling here (e.g., set an error state variable)
    }
  };

  const fetchProduct = async (id) => {
    try {
      const dataJSON = await fetch(
        `http://localhost:8080/api/v1/productos/${id}`
      );
      const { response } = await dataJSON.json();
      console.log(response);
      setProducto(response);
      setAddress(response.address);
    } catch (e) {
      console.log(e.message);
      // Add appropriate error handling here (e.g., set an error state variable)
    }
  };

  useEffect(() => {
    fetchProduct(id);
    fetchAvialabeProductsForDates(id);
  }, [id]);

  if (Object.keys(producto).length === 0) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="detalle-producto-container">
          <div className="detalle-producto-title-container">
            <h1 className="detalle-producto-title">{producto.name}</h1>
          </div>
          <div className="reservarProducto-conatiner">
            <div className="reservarProducto-fechasDisponibles-container">
              <h3 className="reservarProducto-fechasDisponibles-title">
                Fechas Disponibles
              </h3>
              <div className="reservarProducto-fechas">
                <div className="calendar-conatiner">
                  <Calendar2 id={id} />
                </div>
              </div>
            </div>
            <div className="reservarProducto-btn-container">
              <button className="reservar-btn" onClick={reservar}>
                Realizar Reserva
              </button>
            </div>
          </div>
          <div className="detalle-producto-info-container">
            <div className="detalle-producto-description-container">
              <p className="detalle-producto-description-text">
                <i className="socialM-icon bi-geo-alt adress-icon"></i>
                {producto.cityDto.state}, {producto.cityDto.name}, {address}
              </p>
            </div>
            <div className="detalle-producto-info-stars-conatiner">
              <p className="detalle-producto-info-stars-text">
                {mapValueToRange(producto.rate)}
              </p>
              <p className="detalle-producto-info-stars">{producto.rate}</p>
            </div>
          </div>
          <ImagenesGrid images={producto.images} />
          <p className="detalle-producto-description">{producto.description}</p>
          <BloqueCaracteristicas />
        </div>
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <ModalReserva />
          </Modal>
        )}
      </>
    );
  }
}
