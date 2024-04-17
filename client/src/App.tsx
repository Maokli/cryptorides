import React from 'react';
import './App.css';
import CarRentalForm from './CarRentForm';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import CarGrid from './components/car-list-page';
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
  return (
    
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: 'lightgrey', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CarRentalForm />

      </div>
    </ThemeProvider>
  );
}

export default App;
