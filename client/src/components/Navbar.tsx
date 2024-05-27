import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import logo from '../assets/images/logo.png';
import { isAuthenticated, handleLogout   } from '../helpers/auth.helpers';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" style={{ background: '#000000' }}>
      <Toolbar>
        <Link  to="home" spy={true} smooth={true} offset={-70} duration={500} style={{ cursor: 'pointer', flexGrow: 1 }}>
          <img src={logo} alt="Crypto Rides Logo" style={{ height: 70 }} />
        </Link >
        <Box sx={{ display: 'flex' }}>
          <NavLink to="/"  style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Home</NavLink>
          <NavLink to="/browse" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Cars</NavLink>
         {isAuthenticated() ? (
            <>
              <NavLink to="/publishedrequest" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Your Requests</NavLink>
              <NavLink to="/publishedcars" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Your Cars</NavLink>
              <button onClick={handleLogout} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Logout</button></>
       
      ) : (
            <>
                <NavLink to="/login" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Login</NavLink>
                <NavLink to="/signup" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Sign Up</NavLink></>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;