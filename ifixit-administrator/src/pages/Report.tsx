import { useState, useEffect } from "react";
import {
  FaUser,
  FaCar,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarDay,
  FaCreditCard,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

const Report = () => {
  const { registrationID } = useParams();
  const [registrationData, setRegistrationData] = useState(null);

  // Imprimir registrationID para verificar si se obtiene correctamente
  useEffect(() => {
    console.log('Registration ID:', registrationID);
  }, [registrationID]);

  const fetchRegistrationData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${apiUrl}registration/${registrationID}/details`);

      if (response) {
        console.log('Registration data:', response.data);
        setRegistrationData(response.data);
      }
    } catch (err) {
      console.error('Error fetching registration data:', err);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, [registrationID]);

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

  // Comprobación para ver si `registrationData` está disponible
  if (!registrationData) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga hasta que los datos estén disponibles
  }

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
            detail={registrationData.ownername}  // Cambio para coincidir con los datos
          />
          <InfoCard
            icon={<FaIdCard className="h-6 w-6 text-gray-400" />}
            title="DNI"
            detail={registrationData.ownerdni}  // Cambio para coincidir con los datos
          />
          <InfoCard
            icon={<FaEnvelope className="h-6 w-6 text-gray-400" />}
            title="Correo"
            detail={registrationData.owneremail}  // Cambio para coincidir con los datos
          />
          <InfoCard
            icon={<FaPhone className="h-6 w-6 text-gray-400" />}
            title="Teléfono"
            detail={registrationData.ownerphone}  // Cambio para coincidir con los datos
          />
        </div>
      </div>

      {/* Información del vehículo */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Información del Vehículo</h2>
        <div className="flex items-start space-x-4">
          <div className="flex flex-row justify-between w-full px-4">
            <InfoCard
              icon={<FaCar className="h-6 w-6 text-gray-400" />}
              title="Marca"
              detail={registrationData.vehiclebrand}  // Cambio para coincidir con los datos
            />
            <InfoCard
              icon={<FaCalendarDay className="h-6 w-6 text-gray-400" />}
              title="Año"
              detail={registrationData.vehicleyear}  // Cambio para coincidir con los datos
            />
            <InfoCard
              icon={<FaCreditCard className="h-6 w-6 text-gray-400" />}
              title="Placa"
              detail={registrationData.vehiclelicenseplate}  // Cambio para coincidir con los datos
            />
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="bg-white shadow-md rounded-lg p-4 h-96 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-semibold">Comentarios</h3>
          <div className="mr-2">
            <p className="text-md font-semibold">{registrationData.employeename}</p>
            <p className="text-sm text-gray-500">{registrationData.employeeposition}</p>
          </div>
        </div>
        <textarea
          value={registrationData.comments.comment}  // Valor actual del comentario
          onChange={(e) => setRegistrationData({
            ...registrationData,
            comments: { ...registrationData.comments, comment: e.target.value }
          })}
          className="w-full p-2 border border-gray-300 rounded-lg flex-grow"
        />
      </div>
    </div>
  );
};

export default Report;
