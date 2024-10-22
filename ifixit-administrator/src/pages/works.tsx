import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaCar } from "react-icons/fa";
import WorksCard from "../components/WorksCard";
import axios from "axios";
import { useState, useEffect } from "react";


function Works() {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY; // Asegúrate de que esté configurada correctamente
      const response = await axios.get(`${apiUrl}registration/in-progress`); // Solicitud a la API
      
      if (response) {
        console.log('Registrations:', response.data);
        setRegistrations(response.data);
      }

    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
        >
          <div className="w-full mb-2">
            <Typography className="!font-bold" color="blue-gray">
              Works Information
            </Typography>
            <Typography className="mt-1 !font-normal !text-gray-600" variant="small">
              View and update your works details quickly and easily.
            </Typography>
          </div>
          <div className="w-full">
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-4">
          {/* Reemplazar los datos estáticos con los datos obtenidos de la API */}
          {registrations.map((registration, key) => (
            <WorksCard
              key={key}
              icon={<FaCar className="h-6 w-6 text-gray-900" />} // Añadir el ícono
              title={registration.title} // Modelo de carro
              detail={registration.detail} // No tienes la placa en la respuesta actual, así que lo dejé vacío
              options={registration.options} // Información del propietario
              registrationID={registration.registrationID} // ID de la registración
            />
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

export default Works;
