import { useEffect, useState } from 'react';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import  BrowseCarsPage  from './pages/app/browse-cars.page';
import { Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth.helpers';
import MainAppWrapper from './pages/app/mainApp.wrapper';
import LandingPage from './pages/app/LandingPage';
import AgreementPage from './pages/app/Agreement.page';
import NotFoundPage from './pages/shared/notFound.page';
import LoginForm  from  './components/loginForm';
import SignUpForm  from './components/signupForm';
import CarRentalConditions from './components/CarRentalConditions';
import Navbar  from './components/Navbar';
import { ApolloProvider } from "@apollo/react-hooks";
import client from './apolloclient'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCarForm from './pages/forms/addCar.form';
import './index.css'; 
import { Link } from 'react-scroll';
import BrowseUserCars from './pages/app/userCarsPage';

const theme = createTheme();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer /> {/* Add ToastContainer here */}
      <ApolloProvider client={client}>
      <Navbar /> 
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/signup' element={<SignUpForm/>}/>
          <Route path="/notfound" element={<NotFoundPage/>}></Route>
          <Route path="addCar" element={<AddCarForm/>}></Route>
          <Route path="/conditions" element={<CarRentalConditions/>}></Route>
          <Route path="/agreement" element={<AgreementPage/>}></Route>
        </Routes>
      </ApolloProvider>
      {isLoggedIn && <MainAppWrapper />}
    </ThemeProvider>
  )
}

export default App;
