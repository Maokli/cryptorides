import React, { useEffect, useState } from 'react';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import CarGrid from './components/car-grid.component';
import { Car } from './models/car.model';
import { Route, Routes, redirect } from 'react-router-dom';
import { isAuthenticated } from './helpers/auth.helper';
import MainAppWrapper from './pages/app/mainApp.wrapper';
import NotFoundPage from './pages/shared/notFound.page';

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
      primary: '#1a202c',
      secondary: '#90a3bf'
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
      {/* Routes that will be active when user is not logged in*/}
      {
        !isLoggedIn && 
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>}/>
          <Route path='/login' element={<h1>Login Page</h1>}/>
          <Route path='/signup' element={<h1>Signup Page</h1>}/>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      }
      
      {/* Routes that will be active when user is logged in*/}
      {
        isLoggedIn && 
        <MainAppWrapper></MainAppWrapper>
      }

    </ThemeProvider>
  )
}

export default App;
