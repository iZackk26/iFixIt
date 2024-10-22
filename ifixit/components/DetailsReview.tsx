import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Badge } from './Badge'; // Crear este componente como Badge personalizado si es necesario
import { tw } from 'nativewind'; // Para utilizar NativeWind

interface Observacion {
  titulo: string;
  descripcion: string;
}

interface RevisionVehiculo {
  trabajador: string;
  fecha: string;
  marca: string;
  año: number;
  placa: string;
  observaciones: Observacion[];
}

export default function RevisionVehiculo() {
  // Estos datos normalmente vendrían de una API o props
  const revision: RevisionVehiculo = {
    trabajador: "Juan Pérez",
    fecha: "2023-10-21",
    marca: "Toyota",
    año: 2020,
    placa: "ABC-123",
    observaciones: [
      {
        titulo: "Cambio de aceite",
        descripcion: "Se realizó el cambio de aceite utilizando aceite sintético de alta calidad."
      },
      {
        titulo: "Filtro de aire",
        descripcion: "Se reemplazó el filtro de aire por uno nuevo para mejorar la eficiencia del motor."
      },
      {
        titulo: "Estado de los frenos",
        descripcion: "Los frenos se encuentran en buen estado, con suficiente material en las pastillas."
      },
      {
        titulo: "Recomendación",
        descripcion: "Se recomienda realizar una alineación en la próxima visita para optimizar el rendimiento de los neumáticos."
      }
    ]
  }

  return (
    <View style={tw`w-full max-w-2xl mx-auto p-4`}>
      <View style={tw`mb-6`}>
        <Text style={tw`text-2xl font-bold text-center`}>Revisión de Vehículo</Text>
      </View>
      <View style={tw`space-y-4`}>
        <View style={tw`flex flex-row justify-between`}>
          <View>
            <Text style={tw`font-semibold text-sm text-gray-500`}>Trabajador</Text>
            <Text>{revision.trabajador}</Text>
          </View>
          <View>
            <Text style={tw`font-semibold text-sm text-gray-500`}>Fecha de Revisión</Text>
            <Text>{new Date(revision.fecha).toLocaleDateString()}</Text>
          </View>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <View>
            <Text style={tw`font-semibold text-sm text-gray-500`}>Marca</Text>
            <Text>{revision.marca}</Text>
          </View>
          <View>
            <Text style={tw`font-semibold text-sm text-gray-500`}>Año</Text>
            <Text>{revision.año}</Text>
          </View>
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`font-semibold text-sm text-gray-500`}>Placa</Text>
          <Badge text={revision.placa} />
        </View>
        <View style={tw`mt-6`}>
          <Text style={tw`font-semibold text-lg mb-3`}>Observaciones</Text>
          <FlatList
            data={revision.observaciones}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={tw`border-b pb-3 mb-3`}>
                <Text style={tw`font-medium text-blue-500`}>{item.titulo}</Text>
                <Text style={tw`text-sm text-gray-500 mt-1`}>{item.descripcion}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

// Badge personalizado (se puede ajustar)
const Badge = ({ text }: { text: string }) => {
  return (
    <View style={tw`bg-blue-100 px-3 py-1 rounded-full`}>
      <Text style={tw`text-lg font-mono text-blue-600`}>{text}</Text>
    </View>
  );
};
