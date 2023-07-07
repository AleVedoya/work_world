/* eslint-disable react/prop-types */
import "../../styles/Card.css";
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const CardHeader = ({ name }) => {


    const stars = Math.floor((Math.random()*4) + 1);


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


    function generateStars(number) {
        if (number >= 1 && number <= 5) {
            return "\u{2B50} ".repeat(number);
        } else {
            return "Invalid number";
        }
    }



    return (
        <div className="card-header-container">
            <div className="header-title-conatiner">
                <p className="header-stars-title">{generateStars(stars)}</p>
                <h1 className="header-title">{name}</h1>
            </div>
            <div className="raiting-container">
                <div className="header-rating-container">
                    <p className="header-raiting-number">{stars * 2}</p>
                </div>
                <p className="header-raiting-text">{mapValueToRange(stars * 2)}</p>
            </div>
        </div>
    );
};

const CardDistanceInfo = () => {
    return (
        <div className="distance-info-container">
            <div className="distance-info">
                <p className="distance-info-p">
                    <i className="location-icon">&#x1F4CD;</i> {`${Math.floor(Math.random()*100)} mets del Centro. \n`}
                    <a className="ver-mapa-text" href="/">
                        MOSTRAR EN EL MAPA
                    </a>
                </p>
            </div>
            <ul className="utilities-list">
                <li className="utilities-item">&#x1F4F6;</li>
                <li className="utilities-item">&#x1F3CA;</li>
            </ul>
        </div>
    );
};


// eslint-disable-next-line react/prop-types
export default function Card({ producto }) {

    console.log(producto);

    const {id, name, description, image} = producto;

    return (
        <Link className={'card-link'} to={`/detalle/${id}`}>
            <div className="card-container">
                <div className="card-img-container">
                    <img src={image ? image : `/images/oficina${(Math.round(Math.random() * 4)+ 1)}.jpg`} alt="foto producto" />
                </div>
                <div className="info-container">
                    <CardHeader name={name} />
                    <CardDistanceInfo />
                    <p className="info-container-text">{description}</p>
                    <button className="info-container-button">Ver mas</button>
                </div>
            </div>
        </Link>
    );
}
