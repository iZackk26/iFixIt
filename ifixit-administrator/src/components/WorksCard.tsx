import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación

interface WorksCardPropsType {
    title: string;
    options: string[];
    icon: string;
    detail: string;
    registrationID: string; // Agregar registrationID a las props
    orderNumber: string; // Agregar orderNumber a las props
}

function WorksCard({ title, options, icon, detail, registrationID, orderNumber }: WorksCardPropsType) {
  const navigate = useNavigate(); // Hook para redirigir

  // Manejar el clic en el botón "In progress"
  const handleInProgressClick = () => {
    navigate(`/reports/${registrationID}`); // Redirigir a la vista de Report pasando el registrationID
  };

  return (
    <Card shadow={false} className="rounded-lg border border-gray-300 p-4">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="border border-gray-200 p-2.5 rounded-lg">
            {icon}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
              {title}
            </Typography>
            <Typography className="!text-gray-600 text-xs font-normal">
              {detail}
            </Typography>
            <Typography className="!text-gray-600 text-xs font-normal">
              Order Number: <span className="font-bold">{orderNumber}</span> {/* Mostrar el número de orden */}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
            onClick={handleInProgressClick} // Llamar la función cuando se haga clic
          >
            <FaPencilAlt className="h-4 w-4 text-gray-600" />
            <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
              Comentarios
            </Typography>
          </Button>
        </div>
      </div>
      <div>
        {options && (
          <div>
            {Object.keys(options).map((label) => (
              <div key={label} className="flex gap-1">
                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                  {label}:
                </Typography>
                <Typography className="text-xs !font-bold" color="blue-gray">
                  {options[label]}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default WorksCard;
