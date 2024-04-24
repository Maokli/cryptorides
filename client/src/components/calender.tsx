import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

const wilayasOfTunisia = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba',
    'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine',
    'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine',
    'Tozeur', 'Tunis', 'Zaghouan'
];

export default function DateTimePickerValue() {
    const [pickupDate, setPickupDate] = React.useState<Dayjs | null>(dayjs());
    const [returnDate, setReturnDate] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));

    const handlePickupDateChange = (date: Dayjs | null) => {
        setPickupDate(date);
    };

    const handleReturnDateChange = (date: Dayjs | null) => {
        setReturnDate(date);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '-20px' , BorderColor : 'white' , }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ backgroundColor: '#0E0C0D', borderRadius: '12px', p: '20px', width: '1400px', height: '200px', display: 'flex', flexDirection: 'row', alignItems: 'center' , boxShadow: '0px 0px 10px 0px white' , mt : '-10px'  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%' }}>
                        <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: '20px' }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', color: 'white', fontSize: 15, mb: '10px' }}>
                                Pick up date
                            </Typography>
                            <DesktopDateTimePicker
                                value={pickupDate}
                                onChange={handleReturnDateChange} 
                                sx={{
                     
                                    '& .MuiSvgIcon-root': {
                                        fill: '#0CC0DF', 
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '18px',
                                        backgroundColor: '#1E1E1E',
                                        borderColor: '#1E1E1E',
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        fontSize: '16px',
                                        '&:hover': {
                                            borderColor: '#0CC0DF',
                                        },
                                        '&.Mui-focused': {
                                            borderColor: '#0CC0DF',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 'auto' }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', color: 'white', fontSize: 15, mb: '10px' , textAlign : 'center'}}>
                                Return date
                            </Typography>
                            <DesktopDateTimePicker
                                value={returnDate}
                                onChange={handleReturnDateChange} 
                                sx={{
                     
                                    '& .MuiSvgIcon-root': {
                                        fill: '#0CC0DF', 
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '18px',
                                        backgroundColor: '#1E1E1E',
                                        borderColor: '#1E1E1E',
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        fontSize: '16px',
                                        '&:hover': {
                                            borderColor: '#0CC0DF',
                                        },
                                        '&.Mui-focused': {
                                            borderColor: '#0CC0DF',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%', margin: 'auto', mb :'40px' }}>
                    <select
                           style={{
                                borderRadius: '18px',
                                borderColor: '#1E1E1E',
                                color: 'white',
                                fontFamily: 'Montserrat',
                                fontSize: '16px',
                                
                                backgroundColor: '#1E1E1E',
                                width: '250px',
                                height: '60px',
                                textAlign: 'center',
                            }}
                        >
                            <option value="" disabled hidden>Select Location</option>
                            {wilayasOfTunisia.map((wilaya) => (
                                <option key={wilaya} value={wilaya} >{wilaya}</option>
                            ))}
                        </select>
                        <Button variant="contained" sx={{ borderRadius: '18px',
                                       
                                        borderColor: '#1E1E1E',
                                        color: 'white',
                                        fontFamily: 'Montserrat',
                                        fontSize: '16px',
                                        '&:hover': {
                                            borderColor: '#2B5F68',
                                        },
                                        backgroundColor: '#0CC0DF',BorderRadius: '18px', width: '250px', height : '60px' }}>
                            PICK UP A CAR
                        </Button>
                    </Box>
                </Box>
            </LocalizationProvider>
        </Box>
    );
}
