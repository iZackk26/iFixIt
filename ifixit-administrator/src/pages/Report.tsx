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
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [price, setPrice] = useState<string>(""); // Estado para el precio

  // Simular un estado de la base de datos para el proceso de registro
  const [registrationStatus, setRegistrationStatus] = useState<'pendiente' | 'en proceso' | 'completado'>('pendiente');

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
        setRegistrationStatus(response.data.status); // Simular estado de la base de datos
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

  // Función para manejar la actualización del comentario
  const handleUpdateComment = () => {
    const comment = registrationData.comments.comment;
    console.log('Comentario actualizado:', comment);
    // Aquí va la lógica para subir a la base de datos
    // subir a la base de datos
  };

  // Función para manejar la confirmación del precio
  const handleConfirmPrice = () => {
    console.log('Precio confirmado:', price);
    // Aquí va la lógica para actualizar el precio en la base de datos
    // actualizar a la base de datos
  };

  // Función para marcar el registro como pagado
  const handleMarkAsPaid = () => {
    console.log('Registro marcado como pagado');
    // Aquí va la lógica para cambiar el estado de pagado en la base de datos
    // cambiar estado de pagado a la base de datos
  };

  // Función para manejar el estado de completado
  const handleMarkAsCompleted = () => {
    if (registrationStatus === 'pendiente') {
      console.log('Estado cambiado a: en proceso');
      setRegistrationStatus('en proceso');
      // Aquí va la lógica para actualizar el estado en la base de datos
      // actualizar estado a 'en proceso' en la base de datos
    } else if (registrationStatus === 'en proceso') {
      console.log('Estado cambiado a: completado');
      setRegistrationStatus('completado');
      // Aquí va la lógica para actualizar el estado en la base de datos
      // actualizar estado a 'completado' en la base de datos
    }
  };

  // Comprobación para ver si `registrationData` está disponible
  if (!registrationData) {
    return <p>Loading...</p>;
  }

  // Determinar el texto del botón según el estado del registro
  const getCompletionButtonText = () => {
    if (registrationStatus === 'pendiente') return 'Marcar en proceso';
    if (registrationStatus === 'en proceso') return 'Marcar como Completado';
    return 'Completado'; // Si el estado es 'completado'
  };

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
            detail={registrationData.ownername}
          />
          <InfoCard
            icon={<FaIdCard className="h-6 w-6 text-gray-400" />}
            title="DNI"
            detail={registrationData.ownerdni}
          />
          <InfoCard
            icon={<FaEnvelope className="h-6 w-6 text-gray-400" />}
            title="Correo"
            detail={registrationData.owneremail}
          />
          <InfoCard
            icon={<FaPhone className="h-6 w-6 text-gray-400" />}
            title="Teléfono"
            detail={registrationData.ownerphone}
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
              detail={registrationData.vehiclebrand}
            />
            <InfoCard
              icon={<FaCalendarDay className="h-6 w-6 text-gray-400" />}
              title="Año"
              detail={registrationData.vehicleyear}
            />
            <InfoCard
              icon={<FaCreditCard className="h-6 w-6 text-gray-400" />}
              title="Placa"
              detail={registrationData.vehiclelicenseplate}
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
          value={registrationData.comments.comment}
          onChange={(e) => setRegistrationData({
            ...registrationData,
            comments: { ...registrationData.comments, comment: e.target.value }
          })}
          className="w-full p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpdateComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Entrada para el precio y botones de acción */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <label className="text-md font-semibold">Precio en dólares:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Ingrese el precio"
          />
          <button
            onClick={handleConfirmPrice}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Confirmar
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleMarkAsPaid}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Marcar como Pagado
          </button>
          <button
            onClick={handleMarkAsCompleted}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ${
              registrationStatus === 'completado' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={registrationStatus === 'completado'}
          >
            {getCompletionButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;