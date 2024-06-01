import * as React from 'react';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { HiArrowsUpDown } from "react-icons/hi2";
import { useFilters } from './filterContext';
import { useEffect } from 'react';

const DateTimePickerValue = () => {
    const [pickupDate, setPickupDate] = React.useState<Dayjs | null>(dayjs());
    const [pickupTime, setPickupTime] = React.useState<Dayjs | null>(dayjs());
    const [dropoffDate, setDropoffDate] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
    const [dropoffTime, setDropoffTime] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
    const { filters, setFilters } = useFilters();
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

    
};

export default DateTimePickerValue;
