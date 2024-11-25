import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Button, Platform, TouchableOpacity, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

interface Comment {
  comment: string;
  created_at: string;
}

interface OrderDetails {
  ordernumber: string;
  date: string;
  comments: Comment[];
  employeename: string;
  employeeposition: string;
  employeeworkshop: string;
  vehiclebrand: string;
  vehicleyear: number;
  vehiclelicenseplate: string;
  appointmentAvailable: boolean;
  appointmentDate: string | null;
  price: number | null;
}

const BASE_URL = "http://ifixit-18a1923dbbcd.herokuapp.com/api/";

export default function VehicleRevision() {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string }; 

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}registration/${orderId}/details`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); 
    if (date) {
      setSelectedDate(date);
    }
  };

  const saveAppointmentDate = async () => {
    if (selectedDate) {
      try {
        await axios.put(`${BASE_URL}registration/${orderDetails?.ordernumber}/appointment`, {
          appointmentDate: selectedDate.toISOString().split('T')[0],
        });

        if (Platform.OS === 'android') {
          ToastAndroid.show('Fecha de cita guardada exitosamente', ToastAndroid.SHORT);
        } else {
          alert('Fecha de cita guardada exitosamente');
        }

        setOrderDetails((prev) => prev ? { ...prev, appointmentDate: selectedDate.toISOString().split('T')[0] } : prev);
      } catch (error) {
        console.error('Error al guardar la fecha de cita:', error);
        alert('Error al guardar la fecha de cita');
      }
    }
  };

  if (!orderDetails) {
    return null;
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
              {orderDetails.comments.map((comment, index) => (
                <View key={index} className="mb-4 p-3 border-b border-gray-300">
                  <Text className="text-gray-700 text-base mb-1">{comment.comment}</Text>
                  <Text className="text-gray-500 text-xs">
                    {new Date(comment.created_at).toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
  
            {orderDetails.price && (
              <View className="mt-8 items-center">
                <Text className="text-green-600 text-xl font-bold">${orderDetails.price}</Text>
              </View>
            )}
  
            {/* Selector de fecha siempre disponible */}
            <View className="mt-8">
              <Text className="text-lg font-semibold text-gray-800 text-center">Fecha de Cita</Text>
  
              <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-blue-500 px-4 py-2 rounded-full mt-4">
                <Text className="text-white font-semibold text-center">Elige una fecha</Text>
              </TouchableOpacity>
  
              {showDatePicker && (
                <View className="mt-2 items-center justify-center">
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                </View>
              )}
  
              {selectedDate && (
                <View className="mt-4 items-center">
                  <Text className="text-gray-700 mb-2">Fecha seleccionada: {selectedDate.toLocaleDateString()}</Text>
                  <TouchableOpacity
                    onPress={saveAppointmentDate}
                    className="bg-blue-500 px-4 py-2 rounded-full"
                    activeOpacity={0.7}
                  >
                    <Text className="text-white font-semibold text-lg">Guardar Fecha de Cita</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}
