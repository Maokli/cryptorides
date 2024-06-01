import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Waiting', 'Approved', 'Paid'];

const statusToStep = {
  Waiting: 0,
  Approved: 1,
  Paid: 2,
  Cancelled: 1, 
};

interface RequestStatusStepperProps {
  currentStatus: 'Waiting' | 'Approved' | 'Paid' | 'Cancelled';
}

const RequestStatusStepper: React.FC<RequestStatusStepperProps> = ({ currentStatus }) => {
  const activeStep = currentStatus === 'Cancelled' ? 1 : statusToStep[currentStatus];
  const isStepFailed = currentStatus === 'Cancelled';

  return (
    <Box sx={{ width: '72%', paddingTop: '1em', paddingBottom: '1.5em' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed && index === 1) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Cancelled
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default RequestStatusStepper;
