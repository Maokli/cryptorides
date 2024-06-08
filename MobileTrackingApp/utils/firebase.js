import  firebase  from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
  const firebaseConfig = {
    apiKey: "AIzaSyCpy2M-lOsKDQOZEPqLg_S7P2nMvhdEwyE",
    authDomain: "cryptoright.firebaseapp.com",
    databaseURL: "https://cryptoright-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cryptoright",
    storageBucket: "cryptoright.appspot.com",
    messagingSenderId: "673540053580",
    appId: "1:673540053580:web:3062cb51494237a2ba32e9",
    measurementId: "G-9VG3QS1GYL"
  };



firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db ; 
