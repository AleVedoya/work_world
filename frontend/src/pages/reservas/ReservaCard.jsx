/* eslint-disable react/prop-types */
import '../../styles/ReservaCard.css';
import { Link } from 'react-router-dom';

const ReservaCard = ({producto, checkIn, checkOut, id}) => {

    console.log(producto);

    function generateStars(number) {
        if (number >= 1 && number <= 5) {
            return "\u{2B50} ".repeat(number);
        } else {
            return "Invalid number";
        }
    }

  return (
    <Link to={`/reservaDetail/${id}`}className="card">
        <div className='card-title-conatiner'>
        <h2 className='card-title'>Detalle de la Reserva</h2>
        </div>
        <div className="content-container">
            <div className="image-container">
            <img className="image" src="/images/oficina1.jpg" alt="Image" />
            </div>
            <div className="details-container">
                <div className="subtitle">
                    <h6>{producto.name}</h6>
                    <div className="rating-container">
                     {generateStars(Math.floor(Math.random()*4)+1)}
                    </div>
                </div>
                <div className='direccion'>
                    <p><i className="socialM-icon bi-geo-alt adress-icon"></i>{producto.address}</p> 
                    {/* {producto.cityDto.state}, {producto.cityDto.name},  */}
                    
                </div>
                <div className="date-container">
                    <p className="date">Check-in: {checkIn}</p>
                    <p className="date">Check-out: {checkOut}</p>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ReservaCard;
