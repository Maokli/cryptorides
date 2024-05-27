import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Grid, Paper, Box,  } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImage from '../assets/images/loginImage.jpg';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../components/Navbar';

const SIGN_UP = gql`
  mutation SignUp($input: SignUpUserInput!) {
    signup(SignUpUserInput: $input) {
      id
      email
      name
      FamilyName
      phoneNumber
    }
  }
`;

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    
  });
  const [signUp, { loading, error }] = useMutation(SIGN_UP);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ variables: { input: formData } });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ height: '100vh', alignItems: 'center' }}>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', marginBottom: '50px', paddingLeft: '20px' }}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '100px',
            }}
          >
            <img src={loginImage} alt="Signup" style={{ maxWidth: '800px', maxHeight: '300px', borderRadius: '8px' }} />
          </Box>
        </Grid>

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
              <form onSubmit={handleSubmit}  >
                <Grid container spacing={2} sx = {{marginTop : 5 , backgroundColor: '1E1E1E' , borderRadius: '8px' , borderColor: '929293'}}>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      label="Name"
                      fullWidth
                      required
                      sx={{
                        '& label': {
                          color: '#0575ee',
                        },
                        '& input': {
                          borderBottom: '2px solid #0575ee',
                          backgroundColor: '#000',
                          color: '#FFFFFF',
                          boxShadow: '0 0 10px #0575ee',
                        },
                        '& input:hover': {
                          borderColor: '#0575ee',
                          boxShadow: '0 0 10px #0575ee',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleChange}
                      label="Family Name"
                      fullWidth
                      required
                      sx={{
                        '& label': {
                          color: '#0575ee',
                        },
                        '& input': {
                          borderBottom: '2px solid #0575ee',
                          backgroundColor: '#000',
                          color: '#FFFFFF',
                          boxShadow: '0 0 10px #0575ee',
                        },
                        '& input:hover': {
                          borderColor: '#0575ee',
                          boxShadow: '0 0 10px #0575ee',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                          color: '#0575ee',
                        },
                        '& input': {
                          borderBottom: '2px solid #0575ee',
                          backgroundColor: '#000',
                          color: '#FFFFFF',
                          boxShadow: '0 0 10px #0575ee',
                        },
                        '& input:hover': {
                          borderColor: '#0575ee',
                          boxShadow: '0 0 10px #0575ee',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      label="Phone Number"
                      fullWidth
                      required
                      sx={{
                        '& label': {
                          color: '#0575ee',
                        },
                        '& input': {
                          borderBottom: '2px solid #0575ee',
                          backgroundColor: '#000',
                          color: '#FFFFFF',
                          boxShadow: '0 0 10px #0575ee',
                        },
                        '& input:hover': {
                          borderColor: '#0575ee',
                          boxShadow: '0 0 10px #0575ee',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                          color: '#0575ee',
                        },
                        '& input': {
                          borderBottom: '2px solid #0575ee',
                          backgroundColor: '#000',
                          color: '#FFFFFF',
                          boxShadow: '0 0 5px #0575ee, 0 0 25px #0575ee, 0 0 50px #0575ee, 0 0 200px #0575ee',
                        },
                        '& input:hover': {
                          borderColor: '#0575ee',
                          boxShadow: '0 0 10px #0575ee',
                        },
                      }}
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{
                    marginTop: '20px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto',
                    position: 'relative',
                    padding: '12px 36px',
                    color: '#0575ee',
                    fontSize: '1.4em',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    textTransform: 'uppercase',
                    backgroundColor: 'transparent',
                    border: '2px solid #0575ee',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: '#0575ee',
                      color: '#212121',
                      boxShadow: '0 0 5px #0575ee, 0 0 25px #0575ee, 0 0 50px #0575ee, 0 0 200px #0575ee',
                    },
                  }}
                >
                  Sign Up
                </Button>

              </form>
              <ToastContainer />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpForm;
