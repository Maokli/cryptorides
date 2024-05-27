import * as React from 'react';
import Box from '@mui/material/Box';
import { Backdrop, Button, Card, CardActionArea, CardContent, Container, Fade, FormControl, Modal, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { Car } from '../models/car.model';
import axios from '../helpers/axios.helpers';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../services/account.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ConfirmationModal(props: {dateRanges: DateRange<Dayjs>, downPayment: number, rentalPrice: number, onRentalConfirmation: () => void}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    await props.onRentalConfirmation();
    setOpen(false);
  };

  const isConfirmationEnabled = (): boolean => {
    if(props.dateRanges == null)
      return false;
    
    return props.dateRanges[0]?.toDate() != null && props.dateRanges[1]?.toDate() != null;
  }

  const computeTotal = (): number => {
    const dateFrom = props.dateRanges[0]?.toDate();
    const dateTo = props.dateRanges[1]?.toDate();
    if(dateFrom != null && dateTo != null)
    {
      const diffInTIme = dateTo.getTime() - dateFrom.getTime();
      const numberOfDays = Math.round(diffInTIme / (1000 * 3600 * 24));

      return props.downPayment + numberOfDays * props.rentalPrice;
    }

    return NaN;
  }

  return (
    <React.Fragment>
      <Button variant="contained" color='primary' onClick={handleOpen} disabled={!isConfirmationEnabled()}>Confirm</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 1000 }}>
          {open && 
            <>
              <h2 id="child-modal-title">Confirm?</h2>
              <p id="child-modal-description">
                Your total comes out as: {computeTotal()} TND
              </p>
              <Button variant='contained' color='primary' onClick={handleClose}>I Confirm</Button>
            </>
          }
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function RentCarModal(props: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, car: Car}) {
  const handleClose = () => props.setOpen(false);
  const [dateRanges, setDateRanges] = useState(null as unknown as DateRange<Dayjs>)
  const navigate = useNavigate();

  const handleDateRangeChange = (newValue: DateRange<Dayjs>) => {
    setDateRanges(newValue)
  }

  const onRentalConfirmation = async () => {
    try {
      const query = `
      query ValidateRentalrequest($input: rentalRequestInput!) {
        validateRentalrequest(request: $input) {
          id
          fromdate
          todate
          status
          ownerId
          renterId
          createdAt
          car {id}
        }
      }
      `;

      const variables = {
        input: {
          carId: props.car.id,
          availabilityFrom: dateRanges[0]?.toDate(),
          availabilityTo: dateRanges[1]?.toDate(),
          ownerId: props.car.ownerId,
          renterId: parseInt(getUserIdFromToken() ?? "0")
        }
      };
      console.log(props.car)

      await axios.instance.post("",
        { query, variables },
      );

      // redirect to home page
      navigate("/browse");
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={{ ...style, width: 800 }}>
              <Stack direction={"row"} marginTop={2}>
                <FormControl margin   ="dense">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker 
                      name="availabilityPeriod"
                      localeText={{ start: 'Availabilty From', end: 'Availabilty TO' }}
                      onChange={handleDateRangeChange}
                      />
                    </LocalizationProvider>
                </FormControl>
              </Stack>
              <ConfirmationModal 
                dateRanges={dateRanges} 
                rentalPrice={props.car.rentalPrice} 
                downPayment={props.car.downPayment} 
                onRentalConfirmation={onRentalConfirmation}
              />
          </Box>
        </Fade>
      </Modal>
  );
}