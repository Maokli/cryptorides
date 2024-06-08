import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('', {
        query: `
          mutation Login($email: String!, $password: String!) {
            login(loginUserInput: { email: $email, password: $password }) {
              user {
                id
                email
                name
                FamilyName
                phoneNumber
              }
              access_token
            }
          }
        `,
        variables: { email, password },
      });

      const token = response.data.data.login.access_token;
      await AsyncStorage.setItem('token', token);

      Alert.alert('Login successful', 'You can Track Your cars Now', [
        { text: 'OK', onPress: () => navigation.navigate('Cars')},
      ]);
    } catch (error) {
      Alert.alert('Login failed', 'Please check your email and password and try again.');
    }
  };

  if (!fontsLoaded) {
    return null; // Render nothing until the fonts are loaded
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login.jpg')}
        style={styles.imageBackground}
      >
        <MaskedView
          style={styles.maskedView}
          maskElement={
            <View style={styles.centeredView}>
              <Text style={{fontSize: 40, fontFamily: 'Montserrat-Regular', marginTop: -50}}>
                Welcome!
              </Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#A6AADA', '#E41B1B', '#0A0A78']} // Dark red to blue to dark blue
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </MaskedView>
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#0575ee"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#0575ee"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: 360,
    height: 700,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -100, // Adjust this value based on your design
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#0575ee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#0575ee',
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50, // Adjust this value to position the button at the bottom
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderColor: '#0575ee',
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0575ee',
    fontWeight: 'bold',
  },
  maskedView: {
    flexDirection: 'row',
    height: 80,
    marginBottom: 100,
    marginTop: -300,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedText: {
    fontSize: 40,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  gradient: {
    flex: 1,
  },
});

export default LoginScreen;
