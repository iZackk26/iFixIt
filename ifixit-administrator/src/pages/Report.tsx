import { useState, useEffect } from "react";
import {
  FaUser,
  FaCar,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendarDay,
  FaCreditCard,
  FaSave,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const Report = () => {
  const { registrationID } = useParams();
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [price, setPrice] = useState<string>(""); // Estado para el precio

  // Simular un estado de la base de datos para el proceso de registro
  const [registrationStatus, setRegistrationStatus] = useState<
    "pendiente" | "en proceso" | "completado"
  >("pendiente");

  // Estado para gestionar las imágenes
  const [images, setImages] = useState<string[]>([]); // Array de URLs de imágenes
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    console.log("Registration ID:", registrationID);
  }, [registrationID]);

  const fetchRegistrationData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(
        `${apiUrl}registration/${registrationID}/reports`
      );

      if (response) {
        console.log("Registration data:", response.data);
        setRegistrationData(response.data);
        setRegistrationStatus(response.data.status); // Simular estado de la base de datos
        // Inicializar imágenes (vacías por ahora)
        setImages(response.data.images || []);
      }
    } catch (err) {
      console.error("Error fetching registration data:", err);
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
  const handleUpdateComment = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.put(`${apiUrl}registration/${registrationID}/comments`, {
        comment: registrationData.comments.comment,  // Enviar el nuevo comentario
      });
  
      if (response.status === 200) {
        console.log('Comentarios actualizados:', response.data);
        alert('Comentarios actualizados exitosamente');
      }
    } catch (err) {
      console.error('Error actualizando los comentarios:', err);
      alert('Error actualizando los comentarios');
    }
  };

  // Función para manejar la confirmación del precio
  const handleConfirmPrice = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.put(`${apiUrl}registration/${registrationID}/price`, {
        price: parseFloat(price),  // Enviar el precio como un número decimal
      });
  
      if (response.status === 200) {
        console.log('Precio actualizado:', response.data);
        alert('Precio actualizado exitosamente');
      }
    } catch (err) {
      console.error('Error actualizando el precio:', err);
      alert('Error actualizando el precio');
    }
  };

  // Función para marcar el registro como pagado
  const handleMarkAsPaid = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.put(`${apiUrl}registration/${registrationID}/pay`);
  
      if (response.status === 200) {
        console.log('Registro marcado como pagado:', response.data);
        alert('Registro marcado como pagado exitosamente');
      }
    } catch (err) {
      console.error('Error marcando como pagado:', err);
      alert('Error marcando como pagado');
    }
  };

  // Función para manejar el estado de completado
  const handleMarkAsCompleted = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      let statusParam = 0;
    
      if (registrationStatus === 'pendiente') {
        statusParam = 2;  // Pasar a "en proceso"
      } else if (registrationStatus === 'en proceso') {
        statusParam = 3;  // Pasar a "completado"
      }
  
      console.log('Estado actual:', registrationStatus);
      console.log('URL:', `${apiUrl}registration/${registrationID}/status`);
      console.log('Estado a enviar:', statusParam);
    
      const response = await axios.put(`${apiUrl}registration/${registrationID}/status`, {
        status: statusParam,
      });
    
      if (response.status === 200) {
        console.log('Estado actualizado:', response.data);
        setRegistrationStatus(statusParam === 2 ? 'en proceso' : 'completado');
        alert(`Estado cambiado a: ${statusParam === 2 ? 'en proceso' : 'completado'}`);
      }
    } catch (err) {
      console.error('Error actualizando el estado:', err);
      alert('Error actualizando el estado');
    }
  };
  
  // Función para manejar la subida de archivos
  const handleFileUpload = async () => {
    if (!selectedFiles) return;

    const apiUrl = import.meta.env.VITE_API_KEY;
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        `${apiUrl}registration/${registrationID}/upload-images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('Imágenes subidas:', response.data);
        // Actualizar el estado de imágenes
        setImages(response.data.images);
        alert('Imágenes subidas exitosamente');
        setIsUploadModalOpen(false);
      }
    } catch (err) {
      console.error('Error subiendo imágenes:', err);
      alert('Error subiendo imágenes');
    }
  };

  // Comprobación para ver si `registrationData` está disponible
  if (!registrationData) {
    return <p>Loading...</p>;
  }

  // Determinar el texto del botón según el estado del registro
  const getCompletionButtonText = () => {
    if (registrationStatus === "pendiente") return "Marcar en proceso";
    if (registrationStatus === "en proceso") return "Marcar como Completado";
    return "Completado"; // Si el estado es 'completado'
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
            <p className="text-md font-semibold">
              {registrationData.employeename}
            </p>
            <p className="text-sm text-gray-500">
              {registrationData.employeeposition}
            </p>
          </div>
        </div>
        <textarea
          value={registrationData.comments.comment}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              comments: {
                ...registrationData.comments,
                comment: e.target.value,
              },
            })
          }
          className="w-full p-2 border border-gray-300 rounded-lg flex-grow"
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleUpdateComment}
            className="flex items-center gap-3"
            variant="outlined"
          >
            <FaSave className="h-5 w-5 text-gray-900" />
            Update comment
          </Button>
        </div>

        {/* Sección de imágenes */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4">Imágenes</h4>
          <div className="flex flex-wrap gap-4">
            {images.length > 0 ? (
              images.map((imgUrl, index) => (
                <div key={index} className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  {/* Placeholder para la imagen */}
                  <img src={imgUrl} alt={`Imagen ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay imágenes disponibles.</p>
            )}
            {/* Botón de añadir imagen */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-2xl text-gray-400 hover:bg-gray-200"
              title="Agregar imagen"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Modal para subir imágenes */}
        <Dialog open={isUploadModalOpen} handler={() => setIsUploadModalOpen(!isUploadModalOpen)}>
          <DialogHeader>Subir Imágenes</DialogHeader>
          <DialogBody divider>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(e.target.files)}
              className="w-full"
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setIsUploadModalOpen(false)}
              className="mr-4"
            >
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleFileUpload}
              disabled={!selectedFiles || selectedFiles.length === 0}
            >
              Subir
            </Button>
          </DialogFooter>
        </Dialog>
      </div>

      {/* Entrada para el precio y botones de acción */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div className="flex flex-row w-full  items-end">
          <div className="flex flex-col ">
            <label className="text-md font-semibold">Precio en dólares:</label>
            <div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg"
                placeholder="$ 0"
              />
              <Button onClick={handleConfirmPrice} className="p-2 ml-2">
                <FaSave className="h-5 w-5 text-gray-300" />
              </Button>
            </div>
          </div>
          <div className="flex flex-1  space-x-4 justify-end">
            <Button
              onClick={handleMarkAsPaid}
              
            >
              Marcar como Pagado
            </Button>
            <Button
              onClick={handleMarkAsCompleted}
              className={` transition duration-300 ${
                registrationStatus === "completado"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={registrationStatus === "completado"}
            >
              {getCompletionButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
