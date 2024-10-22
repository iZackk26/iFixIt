import { useState } from "react";
import { Button, Input, Alert } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { setOwnerData } from "../utils/owner";

export function OwnerForm() {
  const [ownerSearch, setOwnerSearch] = useState("");
  const [ownerResult, setOwnerResult] = useState<any>(null);
  const [isOwnerFormVisible, setIsOwnerFormVisible] = useState(false);
  const [newOwner, setNewOwner] = useState({
    name: "",
    mail: "",
    phone: "",
    dni: "",
  });
  const [showSuccess, setShowSuccess] = useState(false); // Estado para la alerta de éxito
  const [showError, setShowError] = useState(false); // Estado para la alerta de error
  const [addedOwnerName, setAddedOwnerName] = useState(""); // Almacena el nombre del propietario agregado

  const handleOwnerSearch = async () => {
    if (!ownerSearch) {
      console.error("No ID provided");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_KEY;
    const searchUrl = `${apiUrl}owner/dni`;

    try {
      const response = await axios.post(searchUrl, {
        dni: ownerSearch,
      });

      if (response.data) {
        console.log("Owner found:", response.data);
        setOwnerData(response.data); // Almacenar en el localStorage
        setOwnerResult(response.data);
        setShowSuccess(true); // Mostrar la alerta cuando encuentra el propietario
        setShowError(false); // Ocultar alerta de error
      } else {
        console.log("No owner found with that ID");
        setOwnerResult(null);
        setShowSuccess(false); // No mostrar alerta si no hay resultados
        setShowError(true); // Mostrar la alerta de error
      }
    } catch (error) {
      console.error("Error searching for owner:", error);
      setOwnerResult(null);
      setShowSuccess(false); // Asegúrate de que no se muestre la alerta de éxito en caso de error
      setShowError(true); // Mostrar la alerta de error
    }
  };

  const handleAddOwner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Owner:", newOwner);

    const apiUrl = import.meta.env.VITE_API_KEY;
    const addOwnerUrl = `${apiUrl}owner/`;

    try {
      const response = await axios.post(addOwnerUrl, newOwner);

      if (response.data) {
        console.log("Owner added:", response.data);
        setOwnerData(response.data); // Almacenar en localStorage el objeto agregado
        setAddedOwnerName(response.data.name); // Almacenar el nombre del propietario agregado
        setShowSuccess(true); // Mostrar la alerta de éxito
        setShowError(false); // Ocultar la alerta de error si existía
      }

      setNewOwner({ name: "", mail: "", phone: "", dni: "" }); // Limpiar el formulario después de agregar el propietario
      setIsOwnerFormVisible(false); // Ocultar el formulario después de agregar el propietario
    } catch (error) {
      console.error("Error adding owner:", error);
    }
  };

  return (
    <div className="w-96 mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold w-full text-center">
        Search Owner by ID
      </h2>

      {/* Search field */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search owner by ID"
          value={ownerSearch}
          onChange={(e) => setOwnerSearch(e.target.value)}
          className="pr-10"
        />
        <button
          onClick={handleOwnerSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <FaSearch className="text-gray-500" />
        </button>
      </div>
      {/* Button to show/hide the form to add a new owner */}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setIsOwnerFormVisible(!isOwnerFormVisible)}
      >
        {isOwnerFormVisible ? "Cancel" : "Add New Owner"}
      </Button>

      {/* Animated form to add a new owner */}
      <AnimatePresence>
        {isOwnerFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 overflow-hidden"
          >
            <form onSubmit={handleAddOwner} className="space-y-4 mt-4">
              <Input
                label="Name"
                value={newOwner.name}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, name: e.target.value })
                }
                required
              />
              <Input
                label="Email"
                type="email"
                value={newOwner.mail}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, mail: e.target.value })
                }
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={newOwner.phone}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, phone: e.target.value })
                }
                required
              />
              <Input
                label="DNI"
                type="text"
                value={newOwner.dni}
                onChange={(e) =>
                  setNewOwner({ ...newOwner, dni: e.target.value })
                }
                required
              />
              <Button type="submit" fullWidth>
                Add Owner
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show success alert */}
      {showSuccess && (
        <div className="mt-4 animate-pulse">
          <Alert variant="gradient" color="green">
            <span>
              {ownerResult?.name || addedOwnerName} was successfully added
            </span>
          </Alert>
        </div>
      )}

      {/* Show error alert */}
      {showError && (
        <div className="mt-4 animate-pulse">
          <Alert variant="gradient" color="red">
            <span>User not found</span>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default OwnerForm;
