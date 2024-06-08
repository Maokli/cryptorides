import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Car = {
  id: string;
  location: string;
  brand: string;
  color: string;
  title: string;
  fuelType: string;
  rentalPrice: number;
  downPayment: number;
  images: { url: string }[];
};

type CarListScreenNavigationProp = {
  navigation: {
    navigate: (screen: string, params: { id: string }) => void;
  };
};

const CarListScreen: React.FC<CarListScreenNavigationProp> = ({ navigation }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post('', {
        query: `
          query GetUserCars {
            userCars {
              id,
              location,
              brand,
              color,
              title,
              fuelType,
              rentalPrice,
              downPayment,
              images { url }
            }
          }
        `,
      });

      setCars(response.data.data.userCars);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch cars');
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarPress = (id: string) => {
    console.log("Car id is:", id);
    navigation.navigate('CarMap', { id });
  };

  const renderCar = ({ item }: { item: Car }) => (
    <TouchableOpacity onPress={() => handleCarPress(item.id)}>
      <View style={styles.carContainer}>
        <ImageBackground
          source={{ uri: item.images[0].url }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
        />
        <Text style={styles.carTitle}>{item.title}</Text>
        <Text style={styles.carDetails}>{`${item.brand} - ${item.color} - ${item.fuelType}`}</Text>
        <Text style={styles.carDetails}>{`Location: ${item.location}`}</Text>
        <Text style={styles.carDetails}>{`Price: $${item.rentalPrice} - Down Payment: $${item.downPayment}`}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cars}
      keyExtractor={item => item.id}
      renderItem={renderCar}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  listContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  carContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E5DDDD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0575ee',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  carTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#1E1E1E',
    fontFamily: 'Montserrat-Regular',
  },
  carDetails: {
    fontSize: 14,
    color: '#1E1E1E',
    fontFamily: 'Montserrat-Regular',
  },
});

export default CarListScreen;
