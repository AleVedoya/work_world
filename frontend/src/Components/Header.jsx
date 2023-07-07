/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"
import LoginContext from "../contexts/LoginContext";
import DropDownMenu from "./ui/DropDownMenu";


const LoginButtons = () =>{
    return (
        <ul className="nav-bar-header">
                    <li className="nav-bar-header-item"> <Link className='link-element' to="/login">Iniciar Sesion</Link> </li>
                    <li className="nav-bar-header-item"> <Link className='link-element'to="/register">Crear Cuenta</Link></li>
        </ul>
    )
}


const LoggedInHeader = ({user}) => {

    const { open, dispatch } = useContext(LoginContext);
    const initials = user[0];

    const toggleDropdown = (e) => {
        e.preventDefault();
      dispatch({ type: 'TOGGLE_DROPDOWN' }); // Dispatch the toggle dropdown action
    };


    return (
        <section className="header-welcome-conatiner">
            <div className="header-welcome-display">
                <h1 className="header-welcome-title"> Hola {user}!</h1>
                {/* <button className="header-welcome-logOut-btn" onClick={() => logout()}>Cerrar Sesion</button> */}
                <p className="header-initialsBox" onClick={toggleDropdown}>{initials.toUpperCase()}</p>
            </div>
            {open && <DropDownMenu />};
        </section>
    )
}
const Header = () => {

    const {user, isLogged} = useContext(LoginContext);

    return (
        <header className="header-conatiner">
            <Link className="header-conatiner-link" to='/'>
                <div className="lema-conatiner">
                    <img src="/images/work.jpg" alt="logo" />
                    <p className="lema-text">Sentite como en tu hogar</p>
                </div>
                {isLogged ? <LoggedInHeader user={user.name}/> : <LoginButtons/>}
            </Link>
        </header>
    );
};

export default Header;
