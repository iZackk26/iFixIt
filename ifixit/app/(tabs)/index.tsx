import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const orderNumbers = ['uEtWt0pCVO36', 'BRQxGdvO25GE', 'CkXkMflkmrO5'];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchOrders: any[] = [];

                for (const orderNumber of orderNumbers) {
                    const storedOrder = await AsyncStorage.getItem(orderNumber);
                    if (storedOrder) {
                        fetchOrders.push(JSON.parse(storedOrder));
                        continue;
                    }

                    const response = await axios.get(`${BASE_URL}registration/${orderNumber}/details`);
                    const orderDetails: OrderDetails = response.data;

                    await AsyncStorage.setItem(orderNumber, JSON.stringify(orderDetails));

                    fetchOrders.push(orderDetails);
                }
                setOrders(fetchOrders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Orders...</Text>
          </View>
        );
    }
        
    return (
        <View className="bg-gray-100 flex-1 p-6 pt-14 h-full w-full">
            <View className="mb-6">
                <Text className="text-2xl font-bold mb-2">Welcome back!</Text>
                <Text className="text-xl font-semibold text-gray-600">Your Car Mechanic Orders</Text>
            </View>
    
            <ScrollView className="space-y-4">
                {orders.map((order) => (
                    <TouchableOpacity
                        key={order.ordernumber}
                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                        //onPress={() => navigation.navigate('OrderDetails', { order })}
                    >
                        <View className="flex-row items-center p-4 space-x-4">
                            <Image
                                source = {require('@/assets/images/ifixit.png')}
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
        </View>
    );
    
}