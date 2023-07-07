/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DropDownMenu.css"
import LoginContext from "../../contexts/LoginContext"

export default function DropDownMenu() {

    const navigate = useNavigate();
    const {user, dispatch} = useContext(LoginContext);

    const logOut = ()=>{
        dispatch({
            type: 'LOGOUT',
        });
        navigate('/');
    }
    return (
    <div className="dropdown">
        <ul className="dropdown-list">
            <li className="dropdown-list-item"><Link to="#">Mi Perfil</Link></li>
            <li className="dropdown-list-item"><Link to="/reservas">Reservas</Link></li>
            {user.role == 'ADMIN' && <li className="dropdown-list-item"><Link to="/registerCategory">Crear Categoria</Link></li>}
            {user.role == 'ADMIN' && <li className="dropdown-list-item"><Link to="/registerProduct">Crear Producto </Link></li>}
            <li className="dropdown-list-item"><p className="header-welcome-logOut-btn" onClick={() => logOut()}>Cerrar Sesion</p></li>
        </ul>
    </div>
  )
}
