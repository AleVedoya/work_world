import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../contexts/LoginContext";
import validateRegistration from "../../utils/registerValidation ";
import '../../styles/Register.css'
import { isValidElement } from "react";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorUser, setErrorUser] = useState(false)
    const { dispatch } = useContext(LoginContext);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrors({});
            setErrorUser(false);
            const validationErrors = validateRegistration(
                firstname,
                lastname,
                email,
                password,
                confirmPassword
            );

            setErrors(validationErrors);

            console.log(errors);

            const isValidForm = Object.keys(validationErrors).length === 0;

            if (isValidForm) {
                const user = {
                    firstname,
                    lastname,
                    email,
                    password,
                };

                const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                if (response.status === 403 || !response.ok) {
                    console.log("usuario ya registrado");
                    setErrorUser(true);
                } else {
                    const { email, token } = await response.json();

                    dispatch({
                        type: "LOGIN",
                        payload: {
                            user: {
                                name: user.firstname,
                                email: email,
                                role: user.role || "USER",
                            },
                            accessToken: token,
                            isLogged: true,
                        },
                    });

                    navigate("/");
                }
            } else {
                setErrorUser(false);
            }
        } catch (error) {
            console.error("Failed to create user:", error);
            console.log(e.message);
        }
    };



    return (
        <div className="login-container">
            <form className="login" id="form" onSubmit={handleSubmit}>
                <h2 className="form-title">Regístrate</h2>
                <div className="login-inputs-container">
                    <label htmlFor="nombre" className="input-label">
                        Nombre
                        <input
                            required
                            name="nombre"
                            type="text"
                            placeholder="Escribe tu Nombre"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />

                    </label>

                    <label htmlFor="apellido" className="input-label">
                        Apellido
                        <input
                            required
                            name="apellido"
                            type="text"
                            placeholder="Escribe tu Apellido"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />

                    </label>

                    <label htmlFor="email" className="input-label">
                        Email
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="Escribe tu E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                    </label>

                    <label htmlFor="password" className="input-label">
                        Contraseña
                        <input
                            required
                            name="password"
                            type="password"
                            placeholder="Escribe tu Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label htmlFor="repeatPassword" className="input-label">
                        Confirma tu Contraseña
                        <input
                            required
                            name="repeatPassword"
                            type="password"
                            placeholder="Confirma tu Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                </div>
                {!errorUser && Object.keys(errors).length >= 1 &&
                    <ul className="errorMsg-list">
                        {Object.entries(errors).map(([key, errMsg]) => (
                            <li className="error-Msg" key={key}>
                                {errMsg}
                            </li>
                        ))}
                    </ul>}
                {errorUser && (<p className="error-msg-already-register"> El email ya se encuentra registrado!</p>)}
                <div className="btn-form-container">
                    <button className="btn-CrearCuenta" type="submit">
                        Crear Cuenta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
