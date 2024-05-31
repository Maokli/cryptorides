import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import footerLogo from '../../assets/images/WhiteLogo.png';  // Ensure the path is correct

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '60px 20px', // Increased padding for larger footer and added padding on sides
          marginTop: '100px', // Added space above the footer
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Grid container justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} sm={3} textAlign="center">
            <Box component="img" src={footerLogo} alt="Cryptorides Logo" sx={{ maxWidth: '150px' }} />
            <Typography variant="body2" sx={{ color: 'grey', marginTop: '10px', fontSize: '12px' }}>
              Our vision is to provide convenience and help increase your sales business.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" sx={{ color: 'black', marginBottom: '10px' }}>
                  <Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>About</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>How it works</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Featured</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Partnership</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Business Relation</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ color: 'black', marginBottom: '10px' }}>
                  <Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Community</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Events</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Blog</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Podcast</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Invite a friend</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" sx={{ color: 'black', marginBottom: '10px' }}>
                  <Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Socials</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Discord</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Instagram</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Twitter</Link>
                </Typography>
                <Typography variant="body2">
                  <Link href="#" sx={{ color: 'grey', textDecoration: 'none' }}>Facebook</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ marginTop: '40px', borderTop: '1px solid lightgray', paddingTop: '20px' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '0 20px' }}>
            <Grid item xs={12} sm={6} textAlign="left">
              <Typography variant="body2" sx={{ color: 'black' }}>
                ©2022 Cryptorides. All rights reserved
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign="right">
              <Typography variant="body2" sx={{ color: 'black' }}>
                <Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Privacy & Policy</Link> | <Link href="#" sx={{ color: 'black', textDecoration: 'none' }}>Terms & Conditions</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
