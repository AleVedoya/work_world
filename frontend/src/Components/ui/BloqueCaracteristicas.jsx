import '../../styles/BloqueCaracteristicas.css'

const AmenityItem = ({amenity, icon})=>{
    return (
      <div className='carac-item'>
            <i className={`carac-tem-logo bi bi-${icon}`}></i>
            <p className='carac-item-title'>{amenity}</p>
      </div> 
    )
}

export default function BloqueCaracteristicas() {
    const amenities = [['wifi', 'wifi'], ['pet friendly', 'basket2-fill'], ['Kitchenette', 'basket2-fill'], ['parking', 'basket2-fill'], ['rest space', 'moon-stars-fill']]
  return (
    <div className='carac-container'>
        <h3 className='carac-title'>Que ofrece este lugar?</h3>
        <div className='separator'/>
        <section className='carac-grid'>
            {amenities.map((amenity,index) => <AmenityItem key={index} amenity={amenity[0]} icon={amenity[1]}/> )}
        </section>
    </div>
  )
}
