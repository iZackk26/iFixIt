import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MapComponent() {
  const [selectedWorkshop, setSelectedWorkshop] = useState('');

  const region: Region = {
    latitude: 10.328,    // Latitud de Ciudad Quesada
    longitude: -84.429,  // Longitud de Ciudad Quesada
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const talleres = [
    {
      id: 1,
      title: 'EuroTaller Quincho ',
      description: 'Frente a Bar en Descorche, 200 mts Este de la Entrada a la Dos Pinos, Av. 4, Provincia de Alajuela, Cd Quesada',
      latitude: 10.331704283773073,
      longitude: -84.419467305357465,
    },
    {
      id: 2,
      title: 'Taller Fibras y Frenos Paton',
      description: '50m sureste Registro Civil, Provincia de Alajuela, Cd Quesada, 21001',
      latitude: 10.319151390075868,
      longitude: -84.42867802294369,
    },
    {
      id: 3,
      title: 'Auto servicios Hermanos Hernandez',
      description: 'kilómetros suroeste del Bar, 1.2, Provincia de Alajuela, Cd Quesada, Barrio Gamonales, 21001',
      latitude: 10.318130122382113,
      longitude: -84.419585422279815,
    },
    {
      id: 4,
      title: 'Taller TECSTOP',
      description: 'Provincia de Alajuela, Cd Quesada, Barrio San Antonio, 21001',
      latitude: 10.335223893019652,
      longitude: -84.43043177129887,
    },
  ];

  useEffect(() => {
    (async () => {
      // Solicitar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener el permiso de ubicación.');
        return;
      }
    })();
  }, []);

  const handleMarkerPress = async (taller) => {
    setSelectedWorkshop(taller.title);
    console.log(taller.title);
    try {
      await AsyncStorage.setItem('selectedWorkshopTitle', taller.title);
      await AsyncStorage.setItem('selectedWorkshopDescription', taller.description);
      console.log('Datos guardados en AsyncStorage');
    } catch (error) {
      console.log('Error al guardar los datos', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        {talleres.map((taller) => (
          <Marker
            key={taller.id}
            coordinate={{ latitude: taller.latitude, longitude: taller.longitude }}
            title={taller.title}
            description={taller.description}
            onPress={() => handleMarkerPress(taller)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
