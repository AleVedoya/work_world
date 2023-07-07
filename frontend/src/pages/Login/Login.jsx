import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from "../../contexts/LoginContext";
import "../../styles/Login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loggedUser, setLoggedUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(LoginContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const newErrors = [];

    if (user.email.trim() === "") {
      newErrors.push("El campo email es requerido");
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.push("El email es inválido");
    }

    if (user.password.trim() === "") {
      newErrors.push("El campo contraseña es requerido");
    } else if (user.password.length < 6) {
      newErrors.push("La contraseña debe tener al menos 6 caracteres");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.status === 403) {
        setLoginError("Usuario o contraseña incorrecta");
      } else if (!response.ok) {
        setLoginError("Inténtalo más tarde por favor!");
      } else {
        const data = await response.json();
        const jwtToken = data.token;

        const dataUserJSON = await fetch(
          "http://localhost:8080/api/v1/users/me",
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        const dataUser = await dataUserJSON.json();

        const { firstname, email, role } = dataUser.response;

        const resUser = {
          name: firstname || "User",
          email: email || "defualt@email.com",
          role: role || "USER",
        };

        setLoading(false);

        dispatch({
          type: "LOGIN",
          payload: {
            user: resUser,
            accessToken: jwtToken,
            isLogged: true,
          },
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        "Error en el inicio de sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) loginUser();
  };

  useEffect(() => {
    if (loginError || errors.length > 0) {
      setLoading(false);
      const timer = setTimeout(() => {
        setLoginError("");
        setErrors([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginError, errors, loading]);

  return (
    <section className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="form-title">Iniciar Sesión</h1>
        <div className="login-form-inputs">
          <div className="input-wrapper">
            <label htmlFor="email">
              <span>Email</span>
              <input
                required
                name="email"
                size="small"
                type="text"
                label="Email *"
                placeholder="Correo"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
            <label htmlFor="password">
              <span>Contraseña</span>
              <input
                required
                name="password"
                size="small"
                type="password"
                label="Contraseña *"
                placeholder="Contraseña"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </label>
          </div>
          <div className="button-ingresar-container">
            {loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )}
            {errors.length > 0 && (
              <ul className="error-msg-list">
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            )}
            {loginError && <p className="error-msg">{loginError}</p>}
            <button type="submit" className="botonIngresar">
              Ingresar
            </button>
            <p>
              ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
