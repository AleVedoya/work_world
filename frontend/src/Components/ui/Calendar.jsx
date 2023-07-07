/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useContext } from 'react'
import { DateRangePicker } from 'react-date-range'
import LoginConext from "../../contexts/LoginContext";
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import '../../styles/Calendar.css'

const Calendar = ({ id }) => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const [reservasPdcto, setReservasPdcto] = useState([]);
  const [fechasReservadas, setFechasReservadas]=useState([]);


  // Contexto Para Guardar las Fechas
  const { date, setDateState } = useContext(LoginConext);

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

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

  // Front Cata
  const fetchReserva = async () => {
    try {
      console.log('id ' + id)
      const response = await fetch(`http://localhost:8080/api/v1/productos/${id}/reservas`);
      const data1 = await response.json();
      console.log('data1 ', data1[0])
      if (Array.isArray(data1)) {
        console.log('data1 en res', data1)
        setReservasPdcto(data1);
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

  const disabledDay = (date) => {
    return fechasReservadas.some(
      (range) => date >= new Date(range.startDate) && date <= new Date(range.endDate)
    );
  };


  useEffect(() => {
    fetchReserva();
},[]);

useEffect(() => {
  // event listeners
  document.addEventListener("keydown", hideOnEscape, true)
  document.addEventListener("click", hideOnClickOutside, true)
}, [])




  return (
    <div className="calendarWrap">

      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        placeholder="Check in - Check Out"
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open &&
          <DateRangePicker
            onChange={item => {
              const { endDate, startDate } = [item.selection][0]
              setDateState({
                end: changeDateFormat(endDate),
                start: changeDateFormat(startDate),
                productId: id
              })
              console.log(date);
              setRange([item.selection])
            }
            }
            disabledDay={disabledDay}
            editableDateInputs={true}
            dateFormat="yyyy/MM/dd"
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}

export default Calendar