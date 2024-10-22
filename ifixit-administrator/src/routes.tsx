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
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/workstation" element={<Works/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/reports" element={<Report/>} />
    </Routes>
  );
};

export default Routing;