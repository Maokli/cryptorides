import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Box } from '@mui/material';

const BackButton = ({ to = "/browse" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to);
  };

  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
      <Button onClick={handleBack} variant="outlined">
        <ArrowBackIosIcon /> Back
      </Button>
    </Box>
  );
};

export default BackButton;