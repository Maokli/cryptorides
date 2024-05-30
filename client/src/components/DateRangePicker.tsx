import * as React from 'react';
import { Box, Typography, MenuItem, Select } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { HiArrowsUpDown } from "react-icons/hi2";

const DateTimePickerValue = () => {
    const [pickupDate, setPickupDate] = React.useState<Dayjs | null>(dayjs());
    const [pickupTime, setPickupTime] = React.useState<Dayjs | null>(dayjs());
    const [dropoffDate, setDropoffDate] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
    const [dropoffTime, setDropoffTime] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
    const [pickupLocation, setPickupLocation] = React.useState('');
    const [dropoffLocation, setDropoffLocation] = React.useState('');

    const handlePickupDateChange = (date: Dayjs | null) => {
        setPickupDate(date);
    };

    const handlePickupTimeChange = (time: Dayjs | null) => {
        setPickupTime(time);
    };

    const handleDropoffDateChange = (date: Dayjs | null) => {
        setDropoffDate(date);
    };

    const handleDropoffTimeChange = (time: Dayjs | null) => {
        setDropoffTime(time);
    };

    const commonBoxStyles = {
        backgroundColor: 'white',
        borderRadius: '12px',
        p: '20px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        width: '600px',
        maxWidth: '100%',
    };

    const commonSelectStyles = {
        minWidth: 120,
        borderColor: 'transparent',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
        },
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    {/* Pick-Up Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={dotStyles} />
                        <Box sx={{ ...commonBoxStyles, display: 'flex', flexDirection: 'column', ml: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', color: '#0575ee', fontWeight: 'bold' , fontSize: '20px' }}>
                                Pick - Up
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Location</Typography>
                                    <Select
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                        displayEmpty
                                        sx={commonSelectStyles}
                                    >
                                        <MenuItem value="" disabled>Select your city</MenuItem>
                                        <MenuItem value="City1">City1</MenuItem>
                                        <MenuItem value="City2">City2</MenuItem>
                                    </Select>
                                </Box>
                                <Box sx={dividerStyles} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Date</Typography>
                                    <DatePicker
                                        value={pickupDate}
                                        onChange={handlePickupDateChange}
                                    />
                                </Box>
                                <Box sx={dividerStyles} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Time</Typography>
                                    <TimePicker
                                        value={pickupTime}
                                        onChange={handlePickupTimeChange}
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
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Location</Typography>
                                    <Select
                                        value={dropoffLocation}
                                        onChange={(e) => setDropoffLocation(e.target.value)}
                                        displayEmpty
                                        sx={commonSelectStyles}
                                    >
                                        <MenuItem value="" disabled>Select your city</MenuItem>
                                        <MenuItem value="City1">City1</MenuItem>
                                        <MenuItem value="City2">City2</MenuItem>
                                    </Select>
                                </Box>
                                <Box sx={dividerStyles} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1
                                }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Date</Typography>
                                    <DatePicker
                                        value={dropoffDate}
                                        onChange={handleDropoffDateChange}
                                    />
                                </Box>
                                <Box sx={dividerStyles} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography sx={{ fontFamily: 'Montserrat', color: 'black', fontWeight: 'bold' }}>Time</Typography>
                                    <TimePicker
                                        value={dropoffTime}
                                        onChange={handleDropoffTimeChange}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </LocalizationProvider >
        </Box >
    );
};

export default DateTimePickerValue;

