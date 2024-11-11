import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Star } from 'lucide-react-native';

interface Taller {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  estrellas: number;
}

const talleres: Taller[] = [
    {
      id: 1,
      nombre: "Taller Mecánico El Rayo",
      imagen: require('../../assets/images/mech1.png'),
      descripcion: "Especialistas en reparaciones rápidas y eficientes para todo tipo de vehículos.",
      estrellas: 4,
    },
    {
      id: 2,
      nombre: "Auto Service Pro",
      imagen: require('../../assets/images/mech2.png'),
      descripcion: "Servicio premium con técnicos certificados y equipamiento de última generación.",
      estrellas: 5,
    },
    {
      id: 3,
      nombre: "Taller Hermanos Rodríguez",
      imagen: require('../../assets/images/mech3.png'),
      descripcion: "Taller familiar con más de 30 años de experiencia en el sector automotriz.",
      estrellas: 3,
    },
  ];
  

export default function TalleresMecanicos() {
  const [ordenes, setOrdenes] = useState<{ [key: number]: string }>({});

  const handleOrdenChange = (id: number, valor: string) => {
    setOrdenes(prev => ({ ...prev, [id]: valor }));
  };

  const handleSubmitOrden = (id: number) => {
    console.log(`Orden ${ordenes[id]} enviada para el taller ID: ${id}`);
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
                source={taller.imagen} // Usar `taller.imagen` directamente
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

              {/* Input de número de orden y botón de enviar */}
              <View className="flex-col sm:flex-row items-stretch gap-2 mt-4">
                <TextInput
                  placeholder="Número de orden"
                  value={ordenes[taller.id] || ''}
                  onChangeText={(valor) => handleOrdenChange(taller.id, valor)}
                  className="flex-grow border border-gray-300 p-2 rounded-lg mb-2"
                />
                <TouchableOpacity
                  onPress={() => handleSubmitOrden(taller.id)}
                  className="bg-blue-500 px-4 py-2 rounded-lg items-center"
                >
                  <Text className="text-white font-semibold">Comprobar fecha agendada</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
