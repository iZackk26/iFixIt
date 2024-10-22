import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaCar } from "react-icons/fa";
import WorksCard from "../components/WorksCard";


const WorksCardData = [
  {
    icon: <FaCar className="h-6 w-6 text-gray-900" />,
    title: "Toyota Corolla", // Modelo de carro
    detail: "ABC1234", // Placa
    options: {
      "Nombre": "Emma Roberts", // Nombre del propietario
      "Email Address": "emma@mail.com", // Email (sin cambios)
      "Phone": "123-456-7890", // Teléfono
    },
  },
  {
    icon: <FaCar className="h-6 w-6 text-gray-900" />,
    title: "Honda Civic", // Modelo de carro
    detail: "XYZ5678", // Placa
    options: {
      "Nombre": "Marcel Glock", // Nombre del propietario
      "Email Address": "marcel@mail.com", // Email (sin cambios)
      "Phone": "987-654-3210", // Teléfono
    },
  },
  {
    icon: <FaCar className="h-6 w-6 text-gray-900" />,
    title: "Ford Mustang", // Modelo de carro
    detail: "LMN1234", // Placa
    options: {
      "Nombre": "Misha Stam", // Nombre del propietario
      "Email Address": "misha@mail.com", // Email (sin cambios)
      "Phone": "555-123-4567", // Teléfono
    },
  },
];


function Works() {
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
          {WorksCardData.map((props, key) => (
            <WorksCard key={key} {...props} />
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

export default Works;
