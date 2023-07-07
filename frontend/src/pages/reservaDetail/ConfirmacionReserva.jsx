import { useEffect, useState, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import "../../styles/ConfirmacionReserva.css";
import { Calendar } from "react-feather";
import LoginContext from "../../contexts/LoginContext";
import Loading from "../../components/ui/Loading";
import ReservaExitosa from '../RegisterProduct/ModalReserva';

const ConfirmacionReserva = () => {
  const navigate = useNavigate();  
  const [showModal, setShowModal] = useState(false)
  const [producto, setProducto] = useState({});
  const { date, setDateState } = useContext(LoginContext);
  const { end, start, productId } = date;
  const [loading, setLoading] = useState(false)


  const handleReservarion = async () => {
    //     // Post reserva
    setLoading(true);
    const jwt = JSON.parse(localStorage.getItem('accessToken'));
    const postResponse = await fetch(
      "http://localhost:8080/api/v1/reservation/create",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
          productId: productId
        }),
      }
    );
    if (postResponse.ok) {
      setDateState({
        start: null,
        end: null,
        productId: null
      });
      setLoading(false);
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        navigate('/');
      }, 4000);
    } else {
      setLoading(false)
      alert('No se pudo crear la Reserva');
    }
  }

  const fetchProduct = async (id) => {
    try {
      const dataJSON = await fetch(`http://localhost:8080/api/v1/productos/${id}`);
      const { response } = await dataJSON.json();
      console.log(response);
      setProducto(response);
    } catch (e) {
      console.log(e.message);
      // Add appropriate error handling here (e.g., set an error state variable)
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);


  if (Object.keys(producto).length === 0 || loading) {
    return <Loading />;
  } else {

    return (
      <div className="reserveDetailContainer">
        <h2>Detalle de la reserva</h2>
        <div className="userDetails">
          <h3>Datos del usuario</h3>
          <p><strong>Nombre completo:</strong> {JSON.parse(localStorage.getItem('name'))}</p>
          <p><strong>Email:</strong> {JSON.parse(localStorage.getItem('email'))}</p>
        </div>
        <div className="cardDetailContainer">
          <div className="imageDetailContainer">
            <img className="image" src="/images/oficina1.jpg" alt="" />
          </div>
          <div className="cardDetail">
            <div className="categoryTitleContainer">
              <h2 className="productCategory">{producto.categoryDto.name}</h2>
              <h3 className="productTitle">{producto.name}</h3>
              <p className="descrition"></p>
            </div>
            <div className="fullAdress">
              <p><strong>Direccion:</strong> {producto.address}</p>
              <p><strong>Ciudad:</strong> {producto.cityDto.name}</p>
              <p><strong>Estado:</strong> {producto.cityDto.state}</p>
            </div>
            <div className="price">
              <p><strong>Precio:</strong> ${producto.price}</p>
            </div>
            <div className="selectedDates">
              <h2 className='dates-title'>Fechas Seleccionadas</h2>
              <div className="checkDate">
                <p className='check-dates'>Check in - Check out</p>
                <p>{start} - {end}</p>
              </div>
              <Calendar/>
            </div>
            <button className="confirmButton" onClick={handleReservarion}>Confirmar reserva</button>
          </div>
        </div>
        {
                    showModal ? <ReservaExitosa/> : null
        }
      </div>
    );
  }
}

export default ConfirmacionReserva;
