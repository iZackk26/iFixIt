import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Registration from "./pages/registration";
import Works from "./pages/works";


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/works" element={<Works/>} />

    </Routes>
  );
};

export default Routing;