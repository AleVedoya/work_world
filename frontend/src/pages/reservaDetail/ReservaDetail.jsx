import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from '../../Components/ui/Loading';
import '../../styles/DetalleProducto.css';
import '../../styles/ProductList.css';
import ImagenesGrid from '../../Components/ui/ImagenesGrid';


const EmptyMessage = () =>{
    return (
        <div className='empty-message-container'>
            <p>No Existe ninguna Reserva con ese Id!</p>
        </div>
    )
}

export default function ReservaDetail() {

    const { id } = useParams();
    const [reserva, setReserva] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // const rate = Math.round((Math.random()*9 ) + 1);

    // function mapValueToRange(value) {
    //     if (value >= 1 && value <= 3) {
    //         return "Malo";
    //     } else if (value >= 4 && value <= 6) {
    //         return "Bueno";
    //     } else if (value >= 7 && value <= 8) {
    //         return "Muy Bueno";
    //     } else if (value >= 9 && value <= 10) {
    //         return "Excelente";
    //     } else {
    //         return "Invalid value";
    //     }
    // }

    const fetchReserva = async () =>{
        try {
            setLoading(true);
            setError(false);
            const jwt = JSON.parse(localStorage.getItem('accessToken'));
            console.log(jwt)
            const response = await fetch(`http://localhost:8080/api/v1/reservation/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                }
            });

            if(!response.ok){
                console.log(response);
                throw new Error("No se puede cargar la reserva");
            }
            const data = await response.json();
            console.log(data);
            setLoading(false);
            setReserva(data.response)
        } catch (e) {
            console.log(e.message);
            setError(true);
            setLoading(false);
            
        }
};

    useEffect(() => {
        fetchReserva(id);
    }, []);

 
    if (loading) {
        return <Loading />;
    }else if(error){
        return <EmptyMessage/>
    }
    return (
        <div className="detalle-producto-container">
            <div className="detalle-producto-title-container">
                <h1 className="detalle-producto-title">Resera Confirmada</h1>
            </div>
            <div className='reservarProducto-conatiner'>
                <div className='reservarProducto-fechasDisponibles-container'>
                    <h3 className="reservarProducto-fechasDisponibles-title">Datos de la Reserva</h3>
                    <div className='reservarProducto-fechas'>
                        <p className='reservarProducto-fecha'><b>Check In</b> {reserva.checkInDate}</p>
                        <p className='reservarProducto-fecha'><b>Check Out</b> {reserva.checkOutDate}</p>
                    </div>
                </div>
                <div className='reservarProducto-btn-container'>
                    <button className='reservar-btn-cancelar'>Cancelar Reserva</button>
                </div>
            </div>
            <div className="name-producto-title-container">
                <h1 className="detalle-producto-title">{reserva.productDto.name}</h1>
            </div>
            <div className="detalle-producto-info-container">
                <div className="detalle-producto-description-container">
                    <p className="detalle-producto-description-text">
                    <i className="socialM-icon bi-geo-alt adress-icon"></i> {`${reserva.productDto.address}`}
                    {/* {`${reserva.cityDto.state}, ${reserva.cityDto.name},  */}
                    </p>
                </div>
                <div className='detalle-producto-info-stars-conatiner'>
                    <p className='detalle-producto-info-stars-text'></p>
                    <p className='detalle-producto-info-stars'></p>
                </div>
            </div>
            <ImagenesGrid/>
            <p className="detalle-producto-description"> {reserva.productDto.description}</p>
            <div className='ver-detalle-producto'>
                <Link className='verProducto-btn' to={`/detalle/${reserva.productDto.id}`}>Ver Detalles del producto</Link>
            </div>
        </div>
    );
}
