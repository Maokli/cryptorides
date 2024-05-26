import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/sidebar'; // Adjust the import path as necessary

const AgreementPage: React.FC = () => {
  return (
   
      
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flexGrow={1} display="flex" flexDirection="column">
      
          <Box flexGrow={1} padding={2}>
            {/* Your other page content goes here */}
          </Box>
        </Box>
   </Box>
  );
};

export default AgreementPage;
