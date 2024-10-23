import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

interface OrderDetails {
  ordernumber: string;
  date: string;
  comments: {
    comment: string;
  };
  employeename: string;
  employeeposition: string;
  employeeworkshop: string;
  vehiclebrand: string;
  vehicleyear: number;
  vehiclelicenseplate: string;
}

const BASE_URL = "http://ifixit-18a1923dbbcd.herokuapp.com/api/";

export default function VehicleRevision() {
  const route = useRoute();
  const { orderId } = route.params; // Recibe el parámetro

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}registration/${orderId}/details`);
        setOrderDetails(response.data); // Asigna los datos obtenidos al estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Si los datos aún no están cargados, no renderiza nada
  if (!orderDetails) {
    return null; // O podrías mostrar un indicador de carga si prefieres
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-center text-gray-800">Vehicle Revision</Text>
          </View>
          <View className="space-y-6">
            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Order Number</Text>
                <Text className="text-gray-900">{orderDetails.ordernumber}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Employee</Text>
                <Text className="text-gray-900">{orderDetails.employeename}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Workshop</Text>
                <Text className="text-gray-900">{orderDetails.employeeworkshop}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Position</Text>
                <Text className="text-gray-900">{orderDetails.employeeposition}</Text>
              </View>
              <View className="w-full mb-4">
                <Text className="font-semibold text-sm text-gray-500">Vehicle</Text>
                <Text className="text-gray-900">{`${orderDetails.vehiclebrand} (${orderDetails.vehicleyear})`}</Text>
              </View>
              <View className="w-full mb-4">
                <Text className="font-semibold text-sm text-gray-500">License Plate</Text>
                <View className="bg-gray-200 px-3 py-1 rounded-full self-start mt-1">
                  <Text className="text-lg text-gray-700">{orderDetails.vehiclelicenseplate}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold text-2xl mb-3 text-black-800">Comments</Text>
              <Text className="text-lg text-gray-700">{orderDetails.comments.comment}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
