import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Stack, Typography } from "@mui/material";
import { CarFilters } from "../models/car-filters.model";
import React, { useEffect, useState } from "react";
import { isNullOrEmpty } from "../helpers/string.helpers";
import { getUserToken } from "../helpers/auth.helpers";
import axios from "../helpers/axios.helpers";


export default function CarFiltersComponent(props: {filters: CarFilters, setFilters: React.Dispatch<React.SetStateAction<CarFilters>>}) {
  const filters = props.filters;
  const setFilters = props.setFilters;
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [locations, setLocaltions] = useState([]);
  const [maxDailyRentalPrice, setMaxDailyRentalPrice] = useState(0);
  const [maxDownPayment, setMaxDownPayment] = useState(0);

  const getAvailableFilterOptions = async () => {
    const query = `
    query availableFilters {
      availableFilters {
        brands,
        colors,
        locations,
        maxDownPayment,
        maxDailyRentalPrice
      }
    }
    `;

    try {
      const response = await axios.instance.post("",
        {
          query,
        }
      );

      setBrands(response.data.data.availableFilters.brands);
      setColors(response.data.data.availableFilters.colors);
      setLocaltions(response.data.data.availableFilters.locations);
      setMaxDownPayment(response.data.data.availableFilters.maxDownPayment);
      setMaxDailyRentalPrice(response.data.data.availableFilters.maxDailyRentalPrice);

      // set filters to max
      const newFilters = {...filters};
      newFilters.maxDownPayment = response.data.data.availableFilters.maxDownPayment;
      newFilters.maxPrice = response.data.data.availableFilters.maxDailyRentalPrice;
      setFilters(newFilters);
    }
    catch (e) {
      console.error(e)
    }
  }
  
  useEffect(() => {
    getAvailableFilterOptions();
  }, [])

  const handleRadioSelectChanged = (event: React.ChangeEvent<HTMLInputElement>, property: "location" | "color" | "brand") => {
    const newValue = event.target.value;
    console.log(newValue)
    console.log(filters[property])
    const newFilters = {...filters}
    if (newValue === filters[property]) {
      newFilters[property] = null; // uncheck
    } else {
      newFilters[property] = newValue;
    }
  
    setFilters(newFilters);
  };
  

  const handlePriceRangeChange = (event: Event, newValue: number | number[], property: "Daily Rental" | "Down Payment") => {
    const newFilters = {...filters};
    const newValueArray = newValue as number[];

    if(property === "Daily Rental") {
      newFilters.minPrice = newValueArray[0];
      newFilters.maxPrice = newValueArray[1];
    }
    else if (property === "Down Payment") {
      newFilters.minDownPayment = newValueArray[0];
      newFilters.maxDownPayment = newValueArray[1];
    }

    setFilters(newFilters);
  };
  return (
    <Stack spacing={2} padding={3} sx={{ fontFamily: 'Roboto', backgroundColor: 'black', color: 'white'  , width : '250px'}} >
      <Typography variant="h6" sx={{ fontFamily: 'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF', marginTop: '10px', marginBottom: '5px' }}>Filters</Typography>
      <FormControl sx={{ backgroundColor: '#0e0c0d', padding: '20px', borderRadius: '8px' , borderBlockColor: '#5D5B5B' }}>
        <Typography variant="subtitle1" sx={{ fontFamily:  'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF' }}>Brand</Typography>
        <RadioGroup
          name="brand-radio-buttons-group"
          value={filters.brand}
          onChange={(event) => handleRadioSelectChanged(event, "brand")}
        >
          {!isNullOrEmpty(brands) && brands.map((brand: string) => (
            <FormControlLabel key={brand} value={brand} control={<Radio />} label={brand.toUpperCase()} sx={{ color: 'white', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ backgroundColor: '#0e0c0d', padding: '20px', borderRadius: '8px' , borderBlockColor: '#5D5B5B' }}>
        <Typography variant="subtitle1" sx={{ fontFamily: 'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF' }}>Location</Typography>
        <RadioGroup
          name="location-radio-buttons-group"
          value={filters.location}
          onChange={(event) => handleRadioSelectChanged(event, "location")}
        >
          {!isNullOrEmpty(locations) && locations.map((location: string) => (
            <FormControlLabel key={location} value={location} control={<Radio />} label={location.toUpperCase()} sx={{ color: 'white', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ backgroundColor: '#0e0c0d', padding: '20px', borderRadius: '8px' , borderBlockColor: '#5D5B5B' }}>
        <Typography variant="subtitle1" sx={{ fontFamily: 'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF' }}>Color</Typography>
        <RadioGroup
          name="color-radio-buttons-group"
          value={filters.color}
          onChange={(event) => handleRadioSelectChanged(event, "color")}
        >
          {!isNullOrEmpty(colors) && colors.map((color: string) => (
            <FormControlLabel key={color} value={color} control={<Radio />} label={color.toUpperCase()} sx={{ color: 'white', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ backgroundColor: '#0e0c0d', padding: '20px', borderRadius: '8px' , borderBlockColor: '#5D5B5B' }}>
        <Typography variant="subtitle1" sx={{ fontFamily: 'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF' }}>Daily Rental Price Range</Typography>
        <Slider
          value={[filters.minPrice ?? 0, filters.maxPrice ?? 0]}
          onChange={(event, newValue) => handlePriceRangeChange(event, newValue, "Daily Rental")}
          valueLabelDisplay="auto"
          max={maxDailyRentalPrice}
          getAriaValueText={(value) => `${value} TND`}
          sx={{ color: 'white' }}
        />
      </FormControl>
      <FormControl sx={{ backgroundColor: '#0e0c0d', padding: '20px', borderRadius: '8px' , borderBlockColor: '#5D5B5B' }}>
        <Typography variant="subtitle1" sx={{ fontFamily: 'Verdana', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF' }}>Down Payment Price Range</Typography>
        <Slider
          value={[filters.minDownPayment ?? 0, filters.maxDownPayment ?? 0]}
          onChange={(event, newValue) => handlePriceRangeChange(event, newValue, "Down Payment")}
          valueLabelDisplay="auto"
          max={maxDownPayment}
          getAriaValueText={(value) => `${value} TND`}
          sx={{ color: 'white' }}
          />
          </FormControl>
          </Stack>
          );
          }