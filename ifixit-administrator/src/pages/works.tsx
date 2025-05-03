import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaCar } from "react-icons/fa";
import WorksCard from "../components/WorksCard";
import axios from "axios";
import { useState } from "react";

function Works() {
  // 1) Datos “quemados” de ejemplo
  const dummyRegistrations = [
    {
      registrationID: "1",
      orderNumber: "ORD-001",
      title: "Honda Civic 2020",
      detail: "Cambio de llantas delanteras",
      options: {
        Cliente: "Carlos Pérez",
        Kilometraje: "25 000 km",
      },
    },
    {
      registrationID: "2",
      orderNumber: "ORD-002",
      title: "Ford Mustang GT",
      detail: "Revisión de frenos y suspensión",
      options: {
        Cliente: "María Gómez",
        Kilometraje: "40 500 km",
      },
    },
    {
      registrationID: "3",
      orderNumber: "ORD-003",
      title: "Chevrolet Spark",
      detail: "Service general + alineación",
      options: {
        Cliente: "Luis Martínez",
        Kilometraje: "18 200 km",
      },
    },
  ];

  // 2) Estados inicializados con los datos quemados
  const [registrations] = useState(dummyRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] = useState(dummyRegistrations);

  // 3) Función y efecto de fetch comentados para mantenerlos en el código pero sin ejecutarse
  /*
  const fetchRegistrations = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${apiUrl}registration/in-progress`);
      if (response?.data) {
        setRegistrations(response.data);
        setFilteredRegistrations(response.data);
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);
  */

  // 4) Filtrado por número de orden
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredRegistrations(
      registrations.filter((reg) =>
        reg.orderNumber.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <section className="max-w-4xl mx-auto px-8 py-20 w-full">
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
          <div className="w-full max-w-sm min-w-[200px] relative mt-4">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter your order number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 p-4">
          {filteredRegistrations.length > 0 ? (
            filteredRegistrations.map((registration) => (
              <WorksCard
                key={registration.registrationID}
                icon={<FaCar className="h-6 w-6 text-gray-900" />}
                title={registration.title}
                detail={registration.detail}
                options={registration.options}
                registrationID={registration.registrationID}
                orderNumber={registration.orderNumber}
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

