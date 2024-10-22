import React from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

interface Observation {
  title: string;
  description: string;
}

interface VehicleRevision {
  worker: string;
  date: string;
  brand: string;
  year: number;
  licensePlate: string;
  observations: Observation[];
}

export default function VehicleRevision() {
  const revision: VehicleRevision = {
    worker: "Juan Pérez",
    date: "2023-10-21",
    brand: "Toyota",
    year: 2020,
    licensePlate: "ABC-123",
    observations: [
      {
        title: "Oil Change",
        description: "The oil was changed using high-quality synthetic oil."
      },
      {
        title: "Air Filter",
        description: "The air filter was replaced with a new one to improve engine efficiency."
      },
      {
        title: "Brake Condition",
        description: "The brakes are in good condition, with enough material on the pads."
      },
      {
        title: "Recommendation",
        description: "It is recommended to perform an alignment during the next visit to optimize tire performance."
      }
    ]
  };

  const renderObservation = ({ item }: { item: Observation }) => (
    <View className="border-b border-gray-200 pb-3 mb-3 last:border-b-0">
      <Text className="text-lg text-black-600 font-semibold">{item.title}</Text>
      <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
    </View>
  );

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
                <Text className="font-semibold text-sm text-gray-500">Worker</Text>
                <Text className="text-gray-900">{revision.worker}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Revision Date</Text>
                <Text className="text-gray-900">{new Date(revision.date).toLocaleDateString()}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Brand</Text>
                <Text className="text-gray-900">{revision.brand}</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="font-semibold text-sm text-gray-500">Year</Text>
                <Text className="text-gray-900">{revision.year.toString()}</Text>
              </View>
              <View className="w-full mb-4">
                <Text className="font-semibold text-sm text-gray-500">License Plate</Text>
                <View className="bg-gray-200 px-3 py-1 rounded-full self-start mt-1">
                  <Text className="text-lg text-gray-700">{revision.licensePlate}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="font-bold text-2xl mb-3 text-black-800">Observations</Text>
              <FlatList
                data={revision.observations}
                renderItem={renderObservation}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
