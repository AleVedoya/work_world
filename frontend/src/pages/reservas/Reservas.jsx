import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import Loading from "../../Components/ui/Loading";
import LoginContext from "../../contexts/LoginContext";
import ReservaCard from "./ReservaCard";
import "../../styles/ProductList.css";

const EmptyMessage = () => {
    return (
        <div className="empty-message-container">
            <p>No posee ninguna Reserva!</p>
        </div>
    );
};

export default function ProductList() {
    // const { id } = useParams();

    const { user } = useContext(LoginContext);
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchReservas = async () => {
        try {
            setLoading(true);
            setError(false);
            const jwt = JSON.parse(localStorage.getItem("accessToken"));
            const email = JSON.parse(localStorage.getItem("email"));
            const response = await fetch(
                `http://localhost:8080/api/v1/users/reservations/${email}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                console.log(response);
                throw new Error("No se pueden cargar las reservas");
            }
            const data = await response.json();
            console.log(data);
            setLoading(false);
            setReservas(data.response);
        } catch (e) {
            console.log(e.message);
            setError(true);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReservas();
    }, []);
    if (loading) {
        return <Loading />;
    } else if (error) {
        return <EmptyMessage />;
    }

    return (
        <section className="product-listContainer">
            <div className="productList-header">
                <h2 className="productList-title"> Mis Reservas</h2>
            </div>
            <div className="productList-list">
                <div className="reservasList-list-cntr">
                    {reservas.map((reserva) => {
                        const { id, productDto, checkInDate, checkOutDate } = reserva;
                        return (
                                <ReservaCard
                                    key={id}
                                    producto={productDto}
                                    checkIn={checkInDate}
                                    checkOut={checkOutDate}
                                    id={id}
                                />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
