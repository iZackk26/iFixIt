import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaSearch, FaCar } from "react-icons/fa";
import WorksCard from "../components/WorksCard";
import axios from "axios";
import { useState, useEffect } from "react";

function Works() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY; // Asegúrate de que esté configurada correctamente
      const response = await axios.get(`${apiUrl}registration/in-progress`); // Solicitud a la API

      if (response) {
        console.log("Registrations:", response.data);
        setRegistrations(response.data);
        setFilteredRegistrations(response.data); // Inicializar los registros filtrados
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar las registraciones por el número de orden
    const filtered = registrations.filter((registration) =>
      registration.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRegistrations(filtered);
  };

  return (
    <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-col items-start"
        >
          <div className="w-full mb-2">
            <Typography className="!font-bold" color="blue-gray">
              Works Information
            </Typography>
            <Typography className="mt-1 !font-normal !text-gray-600" variant="small">
              View and update your works details quickly and easily.
            </Typography>
          </div>
  
          {/* Barra de búsqueda colocada debajo del texto */}
          <div className="w-full max-w-sm min-w-[200px] relative mt-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter your order number"
                value={searchTerm} // Asignar el valor del input al searchTerm
                onChange={handleSearchChange} // Manejar el cambio del input
              />
            </div>
          </div>
        </CardHeader>
  
        <CardBody className="flex flex-col gap-4 !p-4">
          {/* Reemplazar los datos estáticos con los datos obtenidos de la API */}
          {filteredRegistrations.length > 0 ? (
            filteredRegistrations.map((registration, key) => (
              <WorksCard
                key={key}
                icon={<FaCar className="h-6 w-6 text-gray-900" />} // Añadir el ícono
                title={registration.title} // Modelo de carro
                detail={registration.detail} // Número de orden
                options={registration.options} // Información del propietario
                registrationID={registration.registrationID} // ID de la registración
                orderNumber={registration.orderNumber} // Número de orden
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </CardBody>
      </Card>
    </section>
  );

}

export default Works;
