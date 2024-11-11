import React, { useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function mapcomponent() {
    const region: Region = {
        latitude: 10.328,    // Latitud de Ciudad Quesada
        longitude: -84.429,  // Longitud de Ciudad Quesada
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

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
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {/* Puedes agregar marcadores si lo deseas */}
                <Marker
                    coordinate={{ latitude: 10.328, longitude: -84.429 }}
                    title="Ciudad Quesada"
                    description="Costa Rica"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
  });