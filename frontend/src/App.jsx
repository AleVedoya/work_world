import {Routes, Route} from"react-router-dom"
import FormProduct from "./pages/RegisterProduct/FormProduct";
import FormCategory from "./pages/registerCategory/FormCategory";
import Home from "./pages/home/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Reservas from './pages/reservas/Reservas.jsx';
// import FormAddProduct from '../src/pages/RegisterProduct/FormAddProductos.jsx';
import ProductList from './pages/Category/ProductList.jsx';
import DetalleProducto from './Components/ui/DetalleProducto.jsx';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ReservaCard from "./pages/reservas/ReservaCard";
import ReservaDetail from "./pages/reservaDetail/ReservaDetail";
import ModalReserva from './pages/registerProduct/ModalReserva';
import ConfirmacionReserva from "./pages/reservaDetail/ConfirmacionReserva";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path="/registerProduct" element={<FormProduct />} />
        <Route path="/registerCategory" element={<FormCategory />} />
        <Route path="/reservas" element={<Reservas/>} />
        <Route path="/reservaCard" element={<ReservaCard/>} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/category/:id" element={<ProductList />} />
        <Route path="/reservaDetail/:id" element={<ReservaDetail/>} />
        <Route path='/reservaConfirmation' element={<ConfirmacionReserva/>}/>
        {/* <Route path='/reservaConfirmation' element={<ModalReserva/>}/> */}
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;



