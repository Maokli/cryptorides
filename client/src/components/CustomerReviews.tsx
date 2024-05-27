import * as React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import mercedes from '../assets/images/mercedes.png';
import yassmine from '../assets/images/yassmine.jpg';

const CustomerReview: React.FC = () => {
  const name = "Yassmine Riahi";
  const review = "Very satisfied with CryptoRides's services. I rented a car from them for a week, everything was done quickly and professionally. The car was in excellent condition and fully corresponded to the description on the website.";
  const Userimage = yassmine;
  const carimage = mercedes;

  return (
    <Box>
      <Typography variant="h5" sx={{ color: 'white', textAlign: 'left', mb: '100px', mt: '150px', ml: '100px', fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>
        Customer reviews about <br/> <span style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' , color : '#0CC0DF' }}>CryptoRides</span>
      </Typography>
      <Card sx={{ maxWidth: 1200, mx: 'auto', backgroundColor: '#1E1E1E', borderRadius: '8px', display: 'flex', maxHeight: 300 , boxShadow: '0px 0px 10px 0px white' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mt: 0}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '10px' }}>
              <Avatar src={Userimage} sx={{ marginRight: '10px' }} />
              <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: 'white' }}>{name}</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontFamily: 'Montserrat', fontSize: '16px', color: 'white' }}>{review}</Typography>
          </Box>
          <img src={carimage} alt="Car" style={{ width: '300px', height: 'auto', borderRadius: '8px', marginLeft: '20px' }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomerReview;
