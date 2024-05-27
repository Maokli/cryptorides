import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import map from '../assets/images/map.png';

const CompanyContact: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', textAlign: 'left', mb: '20px', mt: '100px', ml: '30px', fontFamily: 'Montserrat-Regular' , fontSize: 30 , fontWeight: 'bold'}}>
        <Typography component="span" sx={{ color: '#0CC0DF', fontSize: 30 , fontWeight: 'bold', fontFamily : 'Montserrat-Regular'}}>CrytoRides</Typography><br/> Contact Information
      </Typography>
      
      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={6} >
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px' , ml :5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <LocationOnIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                Contact us using our company contact information for more information about our rental services
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <LocationOnIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                Centre Urbain Nord
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <PhoneIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                +216 58972451
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <PhoneIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                +216 7145863
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <EmailIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                info@CryptoRides.tn
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <AccessTimeIcon sx={{ color: '#0CC0DF', marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontFamily: 'Montserrat-Regular', color: 'white', textAlign: 'left', mb: '10px' }}>
                Mon-Fri: 9:00-18:00
                <br />
                Sat-Sun: by prior arrangement
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* Map */}
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' , mt : -10 }}>
            {/* Your map component goes here */}
            <img src={map} alt="Map" style={{ width: '80%', height: 'auto', borderRadius: '8px' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyContact;
