import { useState } from "react";
import {
  FaUser,
  FaCar,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarDay,
  FaCreditCard,
} from "react-icons/fa";

const Report = () => {
  const [comentarios, setComentarios] = useState(
    "El vehículo requiere cambio de aceite y revisión de frenos. Se recomienda programar una cita de seguimiento en 3 meses."
  );

  const InfoCard = ({
    icon,
    title,
    detail,
  }: {
    icon: JSX.Element;
    title: string;
    detail: string;
  }) => (
    <div className="flex items-start space-x-4 mb-4">
      <div className="border border-gray-200 p-2.5 rounded-lg">{icon}</div>
      <div>
        <p className="font-bold mb-1 text-blue-gray-700">{title}</p>
        <p className="!text-gray-600 text-xs font-normal">{detail}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Reporte de Vehículo
      </h1>

      {/* Información del propietario */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Información del Propietario</h2>
        <div className="grid grid-cols-2 gap-6">
          <InfoCard
            icon={<FaUser className="h-6 w-6 text-gray-400" />}
            title="Nombre"
            detail="Juan Pérez"
          />
          <InfoCard
            icon={<FaIdCard className="h-6 w-6 text-gray-400" />}
            title="DNI"
            detail="12345678"
          />
          <InfoCard
            icon={<FaEnvelope className="h-6 w-6 text-gray-400" />}
            title="Correo"
            detail="juan.perez@email.com"
          />
          <InfoCard
            icon={<FaPhone className="h-6 w-6 text-gray-400" />}
            title="Teléfono"
            detail="+51 987 654 321"
          />
        </div>
      </div>

      {/* Información del vehículo */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Información del Vehículo</h2>
        <div className="flex items-start space-x-4">
          {/* Icono del vehículo */}
        
          <div className="flex flex-row justify-between w-full px-4">
     
            <div className="flex items-start space-x-4">
              <div className="border border-gray-200 p-2.5 rounded-lg">
                <FaCar className="h-6 w-6 text-gray-400" />
              </div>
              <div>
              <p className="font-bold text-blue-gray-700">Marca</p>
              <p className="!text-gray-600 text-xs font-normal">Toyota</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="border border-gray-200 p-2.5 rounded-lg">
                <FaCalendarDay className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-blue-gray-700">Año</p>
                <p className="!text-gray-600 text-xs font-normal">2020</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="border border-gray-200 p-2.5 rounded-lg">
                <FaCreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-blue-gray-700">Placa</p>
                <p className="!text-gray-600 text-xs font-normal">ABC-123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comentarios y empleado */}
      <div className="bg-white shadow-md rounded-lg p-4 h-96 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold">Comentarios</h3>
          <div className="mr-2">
            <p className="text-md font-semibold">Josué</p>
            <p className="text-sm text-gray-500">Mecánico</p>
          </div>
        </div>
        <textarea
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg flex-grow" // flex-grow permite que el textarea crezca para llenar el espacio restante
        />
      </div>
    </div>
  );
};

export default Report;
