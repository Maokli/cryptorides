import React from 'react';
import Navbar from '../../components/Navbar';
import { ThemeProvider } from '@mui/system';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import landing from '../../assets/images/landing.png';
const LandingPage: React.FC = () => {
    return (

        <div>
            <Navbar />
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
                {/* Home Section */}
                <Box sx={{ height: '100px' }} /> {/* Adjust the height as needed */}
      <Container maxWidth="lg" sx={{ height: 'calc(100vh - 100px)' }}>
        {/* Home Section */}
        <Box id="home" sx={{ py: 4, top: 100, margin: 0, height: '100%' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            {/* Left Side - Description */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, backgroundColor: '#000000', height: '100%' }}>
                <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Montserrat', textTransform: 'uppercase', color: '#0CC0DF' }}>
                  CRYPTORIDES
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#FFFFFF', mb: 2 }}>
                  Your app to rent a car securely and using cryptocurrency
                </Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                  yes yes yes 
                </Typography>
              </Paper>
            </Grid>
            {/* Right Side - Image */}
            <Grid item xs={12} md={6} sx={{ position: 'relative', padding: 0, display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', height: '100%'  }}>
              <img src={landing} alt="Car" style={{ position: 'absolute', top: 0, right: 0, width: 800, height: '100vh', objectFit: 'cover' }} />
            </Grid>
          </Grid>
        </Box>
        </Container>
                    {/* Content for Home section */}
                {/* Vehicle Fleet Section */}
                <Box id="fleet" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Vehicle Fleet Section
                    </Typography>
                    {/* Content for Vehicle Fleet section */}
                </Box>

                {/* About Us Section */}
                <Box id="about" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        About Us Section
                    </Typography>
                    {/* Content for About Us section */}
                </Box>

                {/* Advantages Section */}
                <Box id="advantages" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Advantages Section
                    </Typography>
                    {/* Content for Advantages section */}
                </Box>

                {/* Rental Conditions Section */}
                <Box id="rental-conditions" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Rental Conditions Section
                    </Typography>
                    {/* Content for Rental Conditions section */}
                </Box>

                {/* Reviews Section */}
                <Box id="reviews" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Reviews Section
                    </Typography>
                    {/* Content for Reviews section */}
                </Box>

                {/* News Section */}
                <Box id="news" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        News Section
                    </Typography>
                    {/* Content for News section */}
                </Box>

                {/* Contacts Section */}
                <Box id="contacts" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Contacts Section
                    </Typography>
                    {/* Content for Contacts section */}
                </Box>

                {/* Login Section */}
                <Box id="login" sx={{ py: 4 }}>
                    <Typography variant="h2" gutterBottom>
                        Login Section
                    </Typography>
                    {/* Content for Login section */}
                </Box>
            </Container>
        </div>

    );
};

export default LandingPage;
