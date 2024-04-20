import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}DT`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([10, 1000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={10} 
        max={1000} 
      />
    </Box>
  );
}