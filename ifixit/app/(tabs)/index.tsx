import { View, Text, Image, ScrollView } from 'react-native';

// Definimos la interfaz de las órdenes
interface Order {
    id: string;
    workshopName: string;
}

// Lista de órdenes
const orders: Order[] = [
    { id: "ORD001", workshopName: "Quick Fix Auto"},
    { id: "ORD002", workshopName: "Precision Motors"},
    { id: "ORD003", workshopName: "Elite Car Care"},
    { id: "ORD004", workshopName: "Speedy Repairs"},
];

export default function Home() {
    return (
        <View className="bg-gray-100 flex-1 p-6 pt-14 h-full w-full">
            <View className="mb-6">
                <Text className="text-2xl font-bold mb-2">Welcome back!</Text>
                <Text className="text-xl font-semibold text-gray-600">Your Car Mechanic Orders</Text>
            </View>
    
            <ScrollView className="space-y-4">
                {orders.map((order) => (
                    <View
                        key={order.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                    >
                        <View className="flex-row items-center p-4 space-x-4">
                            <Image
                                source = {require('@/assets/images/ifixit.png')}
                                className="w-20 h-20 rounded-full"
                            />
    
                            <View>
                                <Text className="font-semibold text-xl mb-1">{order.id}</Text>
                                <Text className="text-lg text-gray-600">{order.workshopName}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
    
}