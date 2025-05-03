import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Registration from './pages/registration';
import Works from './pages/works';
import Billing from './pages/billing';
import Stats from './pages/stats';
import Report from './pages/Report';
import { Layout } from './components/Layout';
import { useAuth } from './contexts/AuthContext';

const Routing = () => {
  const { loading } = useAuth();  // Añadir el estado de carga

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        
        <Route path="registration" element={<Registration />} />
        <Route path="workstation"  element={<Works />} />
        <Route path="billing"      element={<Billing />} />
        <Route path="reports/:registrationID" element={<Report />} />
        <Route path="stats"        element={<Stats />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>

    );
};

export default Routing;
