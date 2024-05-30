import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import logo from '../assets/images/logo.png';
import { isAuthenticated, handleLogout   } from '../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
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
              <NavLink to="/profile" style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Your Profile</NavLink>
              <button onClick={() =>{handleLogout(); navigate(`/`);}} style={{ color: '#FFFFFF', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20 }}>Logout</button></>

       
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