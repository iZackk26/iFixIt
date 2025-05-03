// src/components/Report.tsx
import { useState /*, useEffect */ } from "react";
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
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import intacto
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Report = () => {
  const { registrationID } = useParams();

  // 1) Datos quemados de ejemplo
  const dummyRegistrationData = {
    ownername: "Carlos Pérez",
    ownerdni: "12345678",
    owneremail: "c.perez@example.com",
    ownerphone: "+506 8888-7777",
    vehiclebrand: "Toyota Corolla",
    vehicleyear: "2018",
    vehiclelicenseplate: "ABC-1234",
    employeename: "Ana García",
    employeeposition: "Técnica Senior",
    comments: [
      {
        id: "c1",
        comment: "Revisar nivel de aceite y frenos.",
        created_at: "2025-05-01T10:15:00Z",
      },
      {
        id: "c2",
        comment: "Cliente aprueba cambio de pastillas.",
        created_at: "2025-05-02T14:30:00Z",
      },
    ],
    newComment: "",
    // images no van aquí, se manejan en el estado images
  };

  // 2) Inicializamos registrationData con el dummy
  const [registrationData, setRegistrationData] = useState<any>(
    dummyRegistrationData
  );

  // Estado para gestionar las imágenes (vacío inicialmente)
  const [images, setImages] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("");

  // 3) Función y efecto de fetch comentados
  /*
  const fetchRegistrationData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(
        `${apiUrl}registration/${registrationID}/reports`
      );
      if (response?.data) {
        setRegistrationData({
          ...response.data,
          comments: response.data.comments || [],
        });
        setRegistrationStatus(response.data.status);
        setImages(response.data.images || []);
      }
    } catch (err) {
      console.error("Error fetching registration data:", err);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, [registrationID]);
  */

  // Estado para gestionar el estado del registro
  const [registrationStatus] = useState<
    "pendiente" | "en proceso" | "completado"
  >("pendiente");

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

  // Manejadores de axios (siguen operativos si decides quitarlos luego)
  const handleAddNewComment = async () => {
    if (!registrationData.newComment) return;
    try {
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.put(
        `${apiUrl}registration/${registrationID}/comments`,
        { comment: registrationData.newComment }
      );
      if (response.status === 201) {
        alert("Comentario añadido exitosamente");
        setRegistrationData((prev: any) => ({
          ...prev,
          comments: [
            ...prev.comments,
            {
              id: response.data.data.id,
              comment: prev.newComment,
              created_at: new Date().toISOString(),
            },
          ],
          newComment: "",
        }));
      }
    } catch (err) {
      console.error("Error añadiendo el comentario:", err);
      alert("Error añadiendo el comentario");
    }
  };

  const handleConfirmPrice = async () => {
    // ...
  };

  const handleMarkAsPaid = async () => {
    // ...
  };

  const handleMarkAsCompleted = async () => {
    // ...
  };

  const handleFileUpload = () => {
    if (!selectedFiles) return;
    const uploaded = Array.from(selectedFiles).map((f) =>
      URL.createObjectURL(f)
    );
    setImages((prev) => [...prev, ...uploaded]);
    alert("Imágenes subidas exitosamente");
    setIsUploadModalOpen(false);
    setSelectedFiles(null);
  };

  // Determinar texto del botón según estado
  const getCompletionButtonText = () => {
    if (registrationStatus === "pendiente") return "Marcar en proceso";
    if (registrationStatus === "en proceso") return "Marcar como Completado";
    return "Completado";
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Reporte de Vehículo
      </h1>

      {/* Info Propietario */}
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

      {/* Info Vehículo */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Información del Vehículo</h2>
        <div className="flex items-start space-x-4">
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

      {/* Comments */}
      <div className="bg-white shadow-md rounded-lg p-4 h-[500px] flex flex-col overflow-y-auto">
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
        {registrationData.comments.length > 0 ? (
          registrationData.comments.map((c: any, i: number) => (
            <div
              key={i}
              className="mb-4 p-3 rounded-lg shadow-sm border border-gray-200 bg-gray-50"
            >
              <p className="text-gray-800 text-sm mb-2 font-medium">
                {c.comment}
              </p>
              <p className="text-gray-500 text-xs">
                {new Date(c.created_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay comentarios disponibles.</p>
        )}
        <textarea
          value={registrationData.newComment}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              newComment: e.target.value,
            })
          }
          placeholder="Añadir un comentario..."
          className="w-full p-4 border border-gray-300 rounded-lg mt-4 text-base h-32 placeholder-gray-500 resize-none"
        />
      </div>

      {/* Imágenes */}
      <div className="flex flex-wrap gap-4 justify-between mt-2">
        <div className="flex items-start flex-wrap">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mr-2"
            >
              <img
                src={url}
                alt={`Imagen ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          {imagePreviews.map((url, idx) => (
            <div
              key={`pv-${idx}`}
              className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden mr-2"
            >
              <img
                src={url}
                alt={`Preview ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-2xl text-gray-400 hover:bg-gray-200"
          >
            <FaPlus />
          </button>
        </div>
        <Button
          onClick={handleAddNewComment}
          className="flex items-center gap-3"
          variant="outlined"
        >
          <FaSave className="h-5 w-5 text-gray-900" />
          Add Comment
        </Button>
      </div>

      {/* Modal Subida */}
      <Dialog
        open={isUploadModalOpen}
        handler={() => setIsUploadModalOpen(!isUploadModalOpen)}
        size="lg"
        className="rounded-lg shadow-lg flex flex-col h-1/2"
      >
        <DialogHeader className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Agregar imágenes del vehículo
          </span>
          <Button
            variant="text"
            color="gray"
            onClick={() => setIsUploadModalOpen(false)}
            className="p-2"
          >
            <FaTimes className="h-5 w-5 text-gray-600" />
          </Button>
        </DialogHeader>
        <DialogBody divider className="flex-grow overflow-y-auto">
          <div className="flex flex-col items-center h-full">
            <div className="w-full p-4 border-dashed border-gray-300 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex-grow relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <FaCloudUploadAlt className="h-12 w-12 text-gray-500 mb-2" />
                <p className="text-gray-500 text-center">
                  Arrastra tus archivos o haz clic para seleccionar
                </p>
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-gray-800">
                {imagePreviews.map((f, i) => (
                  <li key={i} className="text-sm">
                    {f.split("/").pop()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="flex-shrink-0">
          <Button
            variant="text"
            onClick={() => setIsUploadModalOpen(false)}
            className="mr-4"
          >
            Cancelar
          </Button>
          <Button
            variant="gradient"
            onClick={handleFileUpload}
            disabled={!selectedFiles || selectedFiles.length === 0}
          >
            Subir
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Precio y acciones */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-md font-semibold mb-2">
            Precio en dólares:
          </label>
          <div className="flex items-center">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="$ 0"
            />
            <Button onClick={handleConfirmPrice} className="p-2 ml-2">
              <FaSave className="h-5 w-5 text-gray-300" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleMarkAsPaid}>Marcar como Pagado</Button>
          <Button
            onClick={handleMarkAsCompleted}
            disabled={registrationStatus === "completado"}
            className={`transition duration-300 ${
              registrationStatus === "completado"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {getCompletionButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;

