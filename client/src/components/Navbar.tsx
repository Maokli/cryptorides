// Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, MenuItem, Box } from '@mui/material';
import { Link } from 'react-scroll';
import logo from '../assets/images/logo.png';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" style={{ background: '#000000' }}>
      <Toolbar>
        <Link to="home" spy={true} smooth={true} offset={-70} duration={500} style={{ cursor: 'pointer', flexGrow: 1 }}>
          <img src={logo} alt="Crypto Rides Logo" style={{ height: 70 }} />
        </Link>
        <Box sx={{ display: 'flex' }}>
          <Link to="home" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer' }}>Home</Link>
          <Link to="fleet" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Vehicle fleet</Link>
          <Link to="about" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>About us</Link>
          <Link to="advantages" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Advantages</Link>
          <Link to="rental-conditions" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Rental conditions</Link>
          <Link to="reviews" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Reviews</Link>
          <Link to="news" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>News</Link>
          <Link to="contacts" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Contacts</Link>
          <Link to="login" spy={true} smooth={true} offset={-70} duration={500} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Login</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
