/* eslint-disable react/prop-types */
// import { FaCheckCircle } from 'react-icons/fa';
import "../../styles/ReservaExitosa.css";


const ReservaExitosa = () => {
    // const [modalOpen, setModalOpen] = useState(false);

    // const handleModalToggle = () => {
    // setModalOpen(!modalOpen);
    // };

    return (
            <div className="reserva-exitosa-container">
                {/* {modalOpen && ( */}
                <div className="modal">
                    {/* <div className="FaRegWindowClose">
            <button className="button-close" onClick={handleModalToggle}>
                <FaRegWindowClose size={20} color="red" />
            </button>
            </div> */}
                    <div className="container">
                        <div className="objeto-2">
                            {/* <FaCheckCircle size={70} color="#1DBEB4" />; */}
                        </div>
                    </div>
                    <div className="message-container">
                        <p className="message">
                            ¡Muchas gracias!
                        </p>
                        <p>Su reserva se ha realizado con éxito</p>
                    </div>
                </div>
                {/* )}  */}
                {/* <div className="button-container">
        <button className="ok-button" onClick={handleModalToggle}>
            confirmar reserva
        </button>
        </div> */}
            </div>
    );
};

export default ReservaExitosa;
