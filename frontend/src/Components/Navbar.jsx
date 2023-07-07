import React from "react";

const Navbar = () => {
    return (
    <nav >
        <div className="nav">
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/favs">Favs</Link>
        <button className="favButton">
            <Link to="/login">Salir</Link>
        </button>

        <button className="favButton" onClick={manejoTema}>
            Change theme
        </button>
        </div>
    </nav>
    );
};

export default Navbar;
