import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFonts } from 'expo-font';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/landing.jpg')}
        style={styles.backgroundImage}

      />
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.centeredView}>
            <Text style={{fontFamily : 'Montserrat-Regular', fontSize: 40}}>
              TRACK YOUR CAR WITH CRYPTORIDES
            </Text>
          </View>
        }
      >
        <LinearGradient
          colors={['#A6AADA', '#872955', '#4E4EB9']} // Dark red to blue to dark blue
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </MaskedView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.buttonText}>Track Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  maskedView: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : -400 , 
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
  button: {
    backgroundColor: 'black',
    borderColor: '#0575ee',
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: '#0575ee',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
