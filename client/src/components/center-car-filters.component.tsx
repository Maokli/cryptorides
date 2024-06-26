import * as React from 'react';
import { CarFilters } from '../models/car-filters.model';
import { Box, Typography } from '@mui/material';
import { DatePicker, DateRange, LocalizationProvider, TimePicker } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { HiArrowsUpDown } from 'react-icons/hi2';

export default function CenterCarFiltersComponent(props: {filters: CarFilters, setFilters: React.Dispatch<React.SetStateAction<CarFilters>>}) {

  const handlePickupDateChange = (date: Dayjs | null) => {
    const newFilters = {...props.filters};
    newFilters.availabilityFrom = date?.toDate() ??  null;
    props.setFilters(newFilters);
  }

  const handleDropoffDateChange = (date: Dayjs | null) => {
    const newFilters = {...props.filters};
    newFilters.availabilityTo = date?.toDate() ??  null;
    props.setFilters(newFilters);
  }

  const commonBoxStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    p: '20px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    width: '600px',
    maxWidth: '100%',
  };

  const dividerStyles = {
      width: '1px',
      backgroundColor: '#e0e0e0',
      alignSelf: 'stretch',
      mx: 1,
  };

  const dotStyles = {
      position: 'absolute',
      top: '50%',
      left: '-15px',
      transform: 'translateY(-50%)',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#0575ee',
  };

  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                  {/* Pick-Up Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={dotStyles} />
                      <Box sx={{ ...commonBoxStyles, display: 'flex', flexDirection: 'column', ml: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', color: '#0575ee', fontWeight: 'bold', fontSize: '20px' }}>
                              Pick - Up
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Date</Typography>
                                  {/* Increased size of date input */}
                                  <DatePicker
                                      disablePast
                                      value={dayjs(props.filters.availabilityFrom)}
                                      onChange={handlePickupDateChange}
                                  />
                              </Box>
                              <Box sx={dividerStyles} />
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Time</Typography>
                                  {/* Increased size of time input */}
                                  <TimePicker
                                      value={dayjs(props.filters.availabilityFrom)}
                                      onChange={handlePickupDateChange}
                                  />
                              </Box>
                          </Box>
                        </Box>
                  </Box>

                  <Box sx={{
                      backgroundColor: '#0575ee',
                      color: '#212121',
                      borderRadius: '12px',
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '50px',
                      height: '50px',
                      marginTop: '50px',
                  }}>
                      <HiArrowsUpDown style={{ fontSize: '20px' }} />
                  </Box>

                  {/* Drop-Off Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={dotStyles} />
                      <Box sx={{ ...commonBoxStyles, display: 'flex', flexDirection: 'column', ml: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', color: '#0575ee', fontWeight: 'bold', fontSize: '20px' }}>
                              Drop - Off
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' , textAlign :'center' }}>Date</Typography>
                                  {/* Increased size of date input */}
                                  <DatePicker
                                      value={dayjs(props.filters.availabilityTo)}
                                      onChange={handleDropoffDateChange}
                                  />
                              </Box>
                              <Box sx={dividerStyles} />
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Time</Typography>
                                  {/* Increased size of time input */}
                                  <TimePicker
                                      value={dayjs(props.filters.availabilityTo)}
                                      onChange={handleDropoffDateChange}
                                  />
                              </Box>
                          </Box>
                      </Box>
                  </Box>
              </Box>
          </LocalizationProvider>
      </Box>
  );
}