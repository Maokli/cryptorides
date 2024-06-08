import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import db from '../utils/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
// Define the type for your navigation stack parameters
type RootStackParamList = {
  CarMap: { id: string };
};
type CarMapScreenRouteProp = RouteProp<RootStackParamList, 'CarMap'>;
type Props = NativeStackScreenProps<RootStackParamList, 'CarMap'>;

const CarMapScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [carLocations, setCarLocations] = useState<Array<{ latitude: number; longitude: number }> | null>(null);

  useEffect(() => {
    const fetchCarLocations = async () => {
      try {
        const locationDocs = await db 
          .collection('cars')
          .doc(id)
          .collection('locations')
          .orderBy('createdAt', 'desc')
          .limit(3)
          .get();

        if (!locationDocs.empty) {
          const locations = locationDocs.docs.map(doc => {
            const data = doc.data();
            const geoPoint = data.location;
            return {
              latitude: geoPoint.latitude,
              longitude: geoPoint.longitude,
            };
          });
          setCarLocations(locations.reverse());  // Reverse to have the oldest location first
        } else {
          Alert.alert('Error', 'No location data found for this car.');
        }
      } catch (error) {
        console.error('Error fetching car locations:', error);
        Alert.alert('Error', 'Failed to fetch car locations.');
      }
    };

    fetchCarLocations();
  }, [id]);

  if (!carLocations) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: carLocations[0].latitude,
          longitude: carLocations[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {carLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={`Location ${index + 1}`}
            description={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
          />
        ))}
        <Polyline
          coordinates={carLocations}
          strokeColor="#FF0000" // Red line
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

export default CarMapScreen;
