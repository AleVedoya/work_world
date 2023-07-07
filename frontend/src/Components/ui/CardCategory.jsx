/* eslint-disable react/prop-types */
import '../../styles/CardCategory.css';

export default function CardCategory({category}) {
  const {id, name, description, imgUrl} = category;

  const imagenes = [
    '/images/openOffice.jpg',
    '/images/petFriendly.jpg',
    '/images/privateOffice.jpg',
    '/images/sharedOffice.jpg',
    '/images/oficina1.jpg',
  ]
  return (
    <div className='categoria-conatiner'>
        <div className="img-container">
            <img className="img-styles" src={ imgUrl ? imgUrl : imagenes[Math.floor(Math.random()*imagenes.length)+1]} alt="foto categoria"/>
        </div>
        <div className="title-container">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}
