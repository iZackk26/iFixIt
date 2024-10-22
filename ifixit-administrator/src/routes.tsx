import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Works from "./pages/works";
import Billing from "./pages/billing";
import Report from "./pages/report";


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/works" element={<Works/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/report" element={<Report/>} />
    </Routes>
  );
};

export default Routing;