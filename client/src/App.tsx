import { useEffect, useState } from 'react';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth.helpers';
import MainAppWrapper from './pages/app/mainApp.wrapper';
import LandingPage from './pages/app/LandingPage';
import AgreementPage from './pages/app/Agreement.page';
import NotFoundPage from './pages/shared/notFound.page';
import LoginForm from './components/loginForm';
import SignUpForm from './components/signupForm';
import CarRentalConditions from './components/CarRentalConditions';
import { ApolloProvider } from "@apollo/react-hooks";
import client from './apolloclient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCarForm from './pages/forms/addCar.form';
import NavbarSwitcher from './components/NavbarSwitcher';
import { FiltersProvider } from './components/filterContext'; // Import FiltersProvider
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3563e9',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {

    }
  },
  typography: {
    allVariants: {
      color: "#1a202c"
    }
  }
});

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer /> {/* Add ToastContainer here */}
      <ApolloProvider client={client}>
        <FiltersProvider>
          <NavbarSwitcher />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path="/notfound" element={<NotFoundPage />}></Route>
            <Route path="/addCar" element={<AddCarForm />}></Route>
            <Route path="/conditions" element={<CarRentalConditions />}></Route>
            <Route path="/agreement" element={<AgreementPage />}></Route>
          </Routes>
          {isLoggedIn && <MainAppWrapper />}
        </FiltersProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App;
