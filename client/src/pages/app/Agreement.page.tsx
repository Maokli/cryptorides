import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../components/sidebar'; 
import {Chat} from '../../components/chat';
const AgreementPage: React.FC = () => {
  return (
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flexGrow={1} display="flex" flexDirection="column">
          <Box flexGrow={1} padding={2}>
          <Chat  onLogout={() => {}} />
          </Box>
        </Box>
   </Box>
  );
};

export default AgreementPage;
