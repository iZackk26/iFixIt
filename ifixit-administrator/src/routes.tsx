import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Registration from './pages/registration';
import Works from './pages/works';
import Billing from './pages/billing';
import Report from './pages/report';
import { Layout } from './components/Layout';
import { useAuth } from './contexts/AuthContext';

const Routing = () => {
  const { isAuthenticated, loading } = useAuth();  // Añadir el estado de carga

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

      <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route path="/registration" element={<Registration />} />
        <Route path="/workstation" element={<Works />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/reports/:registrationID" element={<Report />} />
      </Route>
    </Routes>
  );
};

export default Routing;
