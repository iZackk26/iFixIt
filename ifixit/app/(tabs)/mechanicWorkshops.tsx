import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Linking } from 'react-native';
import { Star } from 'lucide-react-native';

interface Empleado {
  nombre: string;
  origen: string;
}

interface Taller {
  id: number;
  nombre: string;
  imagen: any; // Usamos `any` para permitir el uso de require para las imágenes
  descripcion: string;
  estrellas: number;
  empleados: Empleado[];
  ubicacion: {
    direccion: string;
    latitud: number;
    longitud: number;
  };
}

const talleres: Taller[] = [
    {
      id: 1,
      nombre: "Taller Fibras y Frenos Paton",
      imagen: require('../../assets/images/mech1.png'),
      descripcion: "Especialistas en reparaciones rápidas y eficientes para todo tipo de vehículos.",
      estrellas: 4,
      empleados: [
        { nombre: "Luis", origen: "perky@gmail.com" },
        { nombre: "Josue", origen: "josue@gmail.com" }
      ],
      ubicacion: {
        direccion: "50m sureste Registro Civil, Provincia de Alajuela, Cd Quesada, 21001",
        latitud: 10.319151390075868,
        longitud: -84.42867802294369,
      },
    },
    {
      id: 2,
      nombre: "Taller TECSTOP",
      imagen: require('../../assets/images/mech2.png'),
      descripcion: "Servicio premium con técnicos certificados y equipamiento de última generación.",
      estrellas: 5,
      empleados: [
        { nombre: "Miguel", origen: "miguel@yahoo.com" }
      ],
      ubicacion: {
        direccion: "Provincia de Alajuela, Cd Quesada, Barrio San Antonio, 21001",
        latitud: 10.335223893019652,
        longitud: -84.43043177129887,
      },
    },
    {
      id: 3,
      nombre: "EuroTaller Quincho",
      imagen: require('../../assets/images/mech3.png'),
      descripcion: "Taller familiar con más de 30 años de experiencia en el sector automotriz.",
      estrellas: 3,
      empleados: [
        { nombre: "Izack", origen: "izackk26@gmail.com" },
        { nombre: "Tortillon", origen: "tortillon@zmail.com" }
      ],
      ubicacion: {
        direccion: "Frente a Bar en Descorche, 200 mts Este de la Entrada a la Dos Pinos, Av. 4, Provincia de Alajuela, Cd Quesada",
        latitud: 10.331704283773073,
        longitud: -84.419467305357465,
      },
    },
    {
      id: 4,
      nombre: "Auto servicios Hermanos Hernandez",
      imagen: require('../../assets/images/mech2.png'),
      descripcion: "Servicios especializados y atención personalizada para vehículos de todo tipo.",
      estrellas: 4,
      empleados: [
        { nombre: "Ana", origen: "ana@hotmail.com" },
        { nombre: "Carlos", origen: "carlos@gmail.com" }
      ],
      ubicacion: {
        direccion: "kilómetros suroeste del Bar, 1.2, Provincia de Alajuela, Cd Quesada, Barrio Gamonales, 21001",
        latitud: 10.318130122382113,
        longitud: -84.419585422279815,
      },
    },
];

export default function TalleresMecanicos() {
  const handleNavigate = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch((err) => console.error("Error al abrir Google Maps:", err));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mb-6 text-center">Talleres Mecánicos</Text>
        
        {/* Listado de talleres */}
        {talleres.map((taller) => (
          <View key={taller.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            
            {/* Encabezado del taller */}
            <View className="p-4 flex-row items-center border-b border-gray-200">
              <Text className="text-2xl text-gray-500 mr-2">🔧</Text>
              <Text className="text-xl font-semibold text-gray-800">{taller.nombre}</Text>
            </View>

            {/* Contenido del taller */}
            <View className="p-4">
              <Image
                source={taller.imagen}
                className="w-full h-48 rounded mb-4"
                resizeMode="cover"
              />
              <Text className="text-sm text-gray-600 mb-3">{taller.descripcion}</Text>

              {/* Estrellas de valoración */}
              <View className="flex-row items-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${index < taller.estrellas ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </View>

              {/* Lista de empleados */}
              <Text className="text-lg font-semibold mb-2">Empleados:</Text>
              {taller.empleados.map((empleado, index) => (
                <Text key={index} className="text-sm text-gray-700 mb-1">
                  - {empleado.nombre} (de {empleado.origen})
                </Text>
              ))}

              {/* Ubicación y botón de navegación */}
              <Text className="text-lg font-semibold mb-2 mt-4">Ubicación:</Text>
              <Text className="text-sm text-gray-700 mb-3">{taller.ubicacion.direccion}</Text>
              <TouchableOpacity
                onPress={() => handleNavigate(taller.ubicacion.latitud, taller.ubicacion.longitud)}
                className="bg-blue-500 px-4 py-2 rounded-lg items-center"
              >
                <Text className="text-white font-semibold">Navegar a Taller</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
