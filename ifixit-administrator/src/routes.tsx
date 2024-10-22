import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Works from "./pages/works";


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/works" element={<Works/>} />

    </Routes>
  );
};

export default Routing;