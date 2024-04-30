import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { RiContractFill } from "react-icons/ri";
import { FaRegIdCard } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";

const CarRentalConditions: React.FC = () => {
  return (
    <Box sx={{ mt: '20px', fontFamily: 'Montserrat-Regular' }}>
      <Box sx={{ textAlign: 'left', ml: 15, mb: '30px' }}>
        <Typography variant="subtitle1" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat-Regular', fontSize: '30px', mb: '5px' }}>
          Car rental conditions
        </Typography>
        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: '25px', mb: '20px' }}>
          at Drive Easy
        </Typography>
        <Typography sx={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: '15px', mb: '20px' }}>
          A detailed description of the conditions and rules <br /> for renting a car in our company:
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px',mt : '10px' , alignItems: 'center' }}>
        <Card sx={{ width: 300, borderRadius: '8px', backgroundColor: '#1E1E1E', mr: '10px', ml: '20px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '10px' }}>
              <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#0CC0DF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <RiContractFill size={20} color="white" />
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat-Regular', fontSize: '15px', mb: '10px', textAlign: 'center' }}>
              REQUIREMENTS FOR THE TENANT
            </Typography>
            <Typography sx={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: '12px', textAlign: 'center' }}>
              Age from 23 years
              <br />
              Driving experience from 2 years
            </Typography>
          </CardContent>
        </Card>
        <Typography sx={{ color: '#1E1E1E', fontFamily: 'Montserrat-Regular', mt: '30px', mx: '10px', fontSize: '12px' }}>-------------------</Typography>
        <Card sx={{ width: 300, borderRadius: '8px', backgroundColor: '#1E1E1E', mr: '10px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '10px' }}>
              <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#0CC0DF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaRegIdCard size={20} color="white" />
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat-Regular', fontSize: '15px', mb: '10px', textAlign: 'center' }}>
              NECESSARY DOCUMENTS
            </Typography>
            <Typography sx={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: '12px', textAlign: 'center' }}>
              Passport
              <br />
              Identification code
              <br />
              Driver's license
            </Typography>
          </CardContent>
        </Card>
        <Typography sx={{ color: '#1E1E1E', fontFamily: 'Montserrat-Regular', mt: '30px', mx: '10px', fontSize: '12px' }}>-------------------</Typography>
        <Card sx={{ width: 300, borderRadius: '8px', backgroundColor: '#1E1E1E', ml: '10px', mr: '20px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: '10px' }}>
              <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#0CC0DF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaBitcoin size={20} color="white" />
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ color: '#0CC0DF', fontFamily: 'Montserrat-Regular', fontSize: '15px', mb: '10px', textAlign: 'center' }}>
              PLEDGE AMOUNT
            </Typography>
            <Typography sx={{ color: 'white', fontFamily: 'Montserrat-Regular', fontSize: '12px', textAlign: 'center' }}>
              CryptoMoney 
              </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CarRentalConditions;
