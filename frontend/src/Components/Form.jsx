import{ useState } from "react";


const Form = () => {
    const [values, setValues] = useState("");
    const [nombre, setNombre] =useState("");
    const [email, setEmail] =useState("");

    const handleSubmit = (e) => {

    e.preventDefault();
        
    console.log(nombre, email);

    if (nombre.length < 5 ) {
        setValues("porfavor revisa tu informacion");
    } else {
        setValues(
        `Gracias,te enviaremos un email`  
        )   
    }
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
        <input className="" 
            name="nombre"
            type="text"  
            placeholder="Escribe tu nombre" 
            values="nombre"
            onChange={(e) => setNombre(e.target.value)}
        />
        <input 
            name="email" 
            type="email" 
            placeholder="Escribe tu E-mail"
            values="email" 
            onChange={(e) => setEmail(e.target.value)}
        />
        <button type="enviar">Enviar</button>
        <div>{values}</div>
        </form>
    </div>
    );
};

export default Form;