import {BrowserRouter} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import LoginProvider from './contexts/LoginProvider.jsx';





ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginProvider>
        <App/>
    </LoginProvider>
  </BrowserRouter>
)