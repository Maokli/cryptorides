import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Grid, Paper, Box } from '@mui/material'; 
import { isAuthenticated, setUserToken } from '../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../assets/images/loginImage.jpg';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar'; 
import { NavLink } from 'react-router-dom'; 
const LOGIN = gql`
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
`;

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email: formData.email, password: formData.password } });
      if (data && data.login && data.login.access_token) {
        setUserToken(data.login.access_token);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <Grid container spacing={0} sx={{ height: '100vh', alignItems: 'center' }}>
        {/* Left Side - Welcome Text */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', marginBottom: '50px', paddingLeft: '20px' }}>
          {/* Implement TypeAnimation component */}
          <TypeAnimation
            sequence={[
              'WELCOME TO CRYPTO RIDES',
              'CRYTORIDES THE BEST CAR RENTAL SERVICE WITH CONVINIENCE AND SECURITY The best conditions',
              'for renting a car from our company with delivery and a full insurance package',
              2000,
            ]}
            style={{
              fontFamily: 'Montserrat-Regular',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#ffffff',
              textAlign: 'center',
              textShadow: '0 0 5px #0B4F97, 0 0 25px #0575ee, 0 0 50px #0575ee, 0 0 200px #0575ee',
              animation: 'neon 1.5s infinite ease-in-out',
              maxWidth: '800px',
            }}
          />
          {/* Login Image */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '100px',
            }}
          >
            <img src={loginImage} alt="Login" style={{ maxWidth: '800px', maxHeight: '300px', borderRadius: '8px' }} />
          </Box>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#000000',
              borderColor: '#0575ee',
              padding: '20px',
            }}
          >
            <Paper sx={{ p: 2, backgroundColor: '#000000' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  fullWidth
                  required
                  sx={{
                    '& label': {
                      color: '#0575ee', // Change label color to blue
                    },
                    '& input': {
                      borderBottom: '2px solid #0575ee', // Add border just under the input
                      backgroundColor: '#000',
                      color: '#FFFFFF',
                      boxShadow: '0 0 10px #0575ee',
                    },
                    '& input:hover': {
                      borderColor: '#0575ee',
                      boxShadow: '0 0 10px #0575ee',
                    },
                    marginBottom: '30px', // Add space between input fields
                  }}
                />
                <TextField
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  fullWidth
                  required
                  sx={{
                    '& label': {
                      color: '#0575ee', // Change label color to blue
                    },
                    '& input': {
                      borderBottom: '2px solid #0575ee', // Add border just under the input
                      backgroundColor: '#000',
                      color: '#FFFFFF',
                      boxShadow: '0 0 5px #0575ee, 0 0 25px #0575ee, 0 0 50px #0575ee, 0 0 200px #0575ee',
                    },
                    '& input:hover': {
                      borderColor: '#0575ee',
                      boxShadow: '0 0 10px #0575ee',
                    },
                    marginButtom : '30px', // Add space between input fields
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                 
                  sx={{
                    marginTop: '120px',
                    marginBottom: '20px',
                    fontFamily: 'Roboto',
                    position: 'relative',
                    padding: '12px 36px',
                    margin: '10px 0',
                    color: '#0575ee',
                    fontSize: '1.4em',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    textTransform: 'uppercase',
                    backgroundColor: 'transparent',
                    border: '2px solid #0575ee',
                    '&:hover': {
                      backgroundColor: '#0575ee',
                      color: '#212121',
                      boxShadow: '0 0 5px #0575ee, 0 0 25px #0575ee, 0 0 50px #0575ee, 0 0 200px #0575ee',
                    },
                  }}
                >
                  Login
                </Button>
              </form>
              <NavLink to="/signup" style={{ color: '#0575ee', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', marginLeft: 20  , textAlign : 'center'}}>
                Don't have an account? Sign up
              </NavLink>
              <ToastContainer />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
