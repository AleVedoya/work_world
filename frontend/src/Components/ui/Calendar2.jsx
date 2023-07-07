/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useContext } from 'react';
import { DateRangePicker } from 'react-date-range';
import LoginConext from "../../contexts/LoginContext";
import '../../styles/calendar-styles.css'; // Importa el archivo CSS personalizado
import '../../styles/Calendar.css'
import format from 'date-fns/format'

function Calendar({id}) {
  //const { id } = useParams();
  const [fechasReservadas, setFechasReservadas]=useState([]);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  
  // Contexto Para Guardar las Fechas
  const { date, setDateState } = useContext(LoginConext);

   function changeDateFormat(date) {
    const inputDateStr = date;
    const dateObj = new Date(inputDateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const fetchReserva = async () => {
    try {
      console.log('id ' + id)
      const response = await fetch(`http://localhost:8080/api/v1/productos/${id}/reservas`);
      console.log('response ', response)
      const data1 = await response.json();
      console.log('data1 ', data1)
      if (Array.isArray(data1)) {
        console.log('data1 en res', data1)
        const reservas = data1.map(reserva => (
          {
            startDate: new Date(reserva.checkInDate),
            endDate: addDays(reserva.checkOutDate, 1),
            key: 'blocked'
          }))
        setFechasReservadas(reservas)
      } else {
        console.error('La respuesta de la API no es un arreglo válido');
      }
    } catch (error) {
      console.error('Error al obtener las fechas bloqueadas:', error);
    }
  };


  useEffect(() => {
    fetchReserva();
},[]);

const [open, setOpen] = useState(false)
const refOne = useRef(null)

// hide dropdown on ESC press
const hideOnEscape = (e) => {
  // console.log(e.key)
  if( e.key === "Escape" ) {
    setOpen(false)
  }
}

// Hide on outside click
const hideOnClickOutside = (e) => {
  // console.log(refOne.current)
  // console.log(e.target)
  if( refOne.current && !refOne.current.contains(e.target) ) {
    setOpen(false)
  }
}

useEffect(() => {
  // event listeners
  document.addEventListener("keydown", hideOnEscape, true)
  document.addEventListener("click", hideOnClickOutside, true)
}, [])


//extraer las fechas checkInDate y checkOutDate como un array para bloqeuarlas


  const handleDateChange = (ranges) => {
    const { endDate, startDate } = [ranges.selection][0]
              setDateState({
                end: changeDateFormat(endDate),
                start: changeDateFormat(startDate),
                productId: id
              })
              console.log(date);
    setSelectedRange([ranges.selection]);
  };

  const disabledDay = (date) => {
    return fechasReservadas.some(
      (range) => date >= new Date(range.startDate) && date <= new Date(range.endDate)
    );
  };

  return (
    <div className="calendarWrap">

<input
        value={`${format(selectedRange[0].startDate, "MM/dd/yyyy")} to ${format(selectedRange[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

<div ref={refOne}>
        {open && 
      <DateRangePicker
        ranges={selectedRange}
        onChange={handleDateChange}
        disabledDay={disabledDay}
        minDate={new Date()}
        months={2}
        direction="horizontal"
        className="calendarElement"
      />}
      </div>
    </div>
  );
}

export default Calendar;