import React, { useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = "http://ifixit-18a1923dbbcd.herokuapp.com/api/";

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

export default function Home() {
    const [orders, setOrders] = useState<any[]>([]);
    const [orderInput, setOrderInput] = useState('');
    const navigation = useNavigation();

    const handleAddOrder = async () => {
        if (orderInput.trim() === '') {
            Alert.alert('Error', 'Please enter a valid order number');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}registration/${orderInput}/details`);
            const orderDetails: OrderDetails = response.data;

            const exists = orders.some(order => order.ordernumber === orderDetails.ordernumber);
            if (exists) {
                Alert.alert('Error', 'Order already exists');
            } else {
                setOrders([...orders, orderDetails]);
            }
            setOrderInput('');
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Order not found');
        }
    };

    return (
        <View className="bg-gray-100 flex-1 p-6 pt-14 h-full w-full">
            <View className="mb-6">
                <Text className="text-2xl font-bold mb-2">Welcome back!</Text>
                <Text className="text-xl font-semibold text-gray-600">Your Car Mechanic Orders</Text>
            </View>

            <View className="flex-row justify-center mb-6">
                <TextInput
                    value={orderInput}
                    onChangeText={setOrderInput}
                    placeholder="Enter your order number..."
                    className="border border-gray-200 rounded-md px-4 py-2 flex-grow mr-2 bg-white"
                />
                <TouchableOpacity 
                    className="bg-black px-4 py-2 rounded-md py-2 justify-center"
                    onPress={handleAddOrder}
                >
                    <Text className="font-bold text-white">Add Order</Text>
                </TouchableOpacity>
            </View>

            {/* Mostrar mensaje cuando no hay órdenes */}
            {orders.length === 0 && (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-gray-600 text-sm">No orders yet. Please add an order to see details.</Text>
                </View>
            )}

            {/* Lista de órdenes cuando se hayan agregado */}
            {orders.length > 0 && (
                <ScrollView className="space-y-4">
                    {orders.map((order) => (
                        <TouchableOpacity
                            key={order.ordernumber}
                            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                            onPress={() => navigation.navigate('VehicleRevision', { orderId: order.ordernumber })} // Aquí pasas el número de orden
                        >
                            <View className="flex-row items-center p-4 space-x-4">
                                <Image
                                    source={require('@/assets/images/ifixit.png')}
                                    className="w-20 h-20 rounded-full"
                                />
                                <View>
                                    <Text className="font-semibold text-xl mb-1">{order.ordernumber}</Text>
                                    <Text className="text-lg text-gray-600">{order.employeeworkshop}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
