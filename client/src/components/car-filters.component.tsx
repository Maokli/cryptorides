import React, { useEffect, useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Stack } from "@mui/material";
import { CarFilters } from "../models/car-filters.model";
import axios from "../helpers/axios.helpers";
import { isNullOrEmpty } from "../helpers/string.helpers";

interface CarFiltersComponentProps {
  filters: CarFilters;
  setFilters: React.Dispatch<React.SetStateAction<CarFilters>>;
}

const CarFiltersComponent: React.FC<CarFiltersComponentProps> = ({ filters, setFilters }) => {
  const [colors, setColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [maxDailyRentalPrice, setMaxDailyRentalPrice] = useState<number>(0);
  const [maxDownPayment, setMaxDownPayment] = useState<number>(0);

  // Fetch available filter options from the server
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
      const response = await axios.instance.post("", { query });
      const { brands, colors, locations, maxDownPayment, maxDailyRentalPrice } = response.data.data.availableFilters;

      setBrands(brands);
      setColors(colors);
      setLocations(locations);
      setMaxDownPayment(maxDownPayment);
      setMaxDailyRentalPrice(maxDailyRentalPrice);

      // Initialize filters with max values
      setFilters((prevFilters) => ({
        ...prevFilters,
        maxDownPayment,
        maxPrice: maxDailyRentalPrice,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAvailableFilterOptions();
  }, []);

  // Handle radio button changes
  const handleRadioSelectChanged = (event: React.ChangeEvent<HTMLInputElement>, property: keyof CarFilters) => {
    const newValue = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [property]: newValue === prevFilters[property] ? null : newValue,
    }));
  };

  // Handle slider changes
  const handlePriceRangeChange = (event: Event, newValue: number | number[], property: "Daily Rental" | "Down Payment") => {
    const [min, max] = newValue as number[];
    setFilters((prevFilters) => ({
      ...prevFilters,
      [`min${property}`]: min,
      [`max${property}`]: max,
    }));
  };

  return (
    <Stack spacing={2} padding={3}>
      <FormControl>
        <FormLabel id="brand-radio-buttons-group">Brand</FormLabel>
        <RadioGroup
          aria-labelledby="brand-radio-buttons-group"
          name="brand-radio-buttons-group"
          value={filters.brand}
          onChange={(event) => handleRadioSelectChanged(event, "brand")}
        >
          {!isNullOrEmpty(brands) && brands.map((brand) => (
            <FormControlLabel key={brand} value={brand} control={<Radio />} label={brand} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="location-radio-buttons-group">Location</FormLabel>
        <RadioGroup
          aria-labelledby="location-radio-buttons-group"
          name="location-radio-buttons-group"
          value={filters.location}
          onChange={(event) => handleRadioSelectChanged(event, "location")}
        >
          {!isNullOrEmpty(locations) && locations.map((location) => (
            <FormControlLabel key={location} value={location} control={<Radio />} label={location} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl margin="normal">
        <FormLabel id="color-radio-buttons-group">Color</FormLabel>
        <RadioGroup
          aria-labelledby="color-radio-buttons-group"
          name="color-radio-buttons-group"
          value={filters.color}
          onChange={(event) => handleRadioSelectChanged(event, "color")}
        >
          {!isNullOrEmpty(colors) && colors.map((color) => (
            <FormControlLabel key={color} value={color} control={<Radio />} label={color} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="daily-rental-price-range">Daily Rental Price Range</FormLabel>
        <Slider
          value={[filters.minPrice ?? 0, filters.maxPrice ?? 0]}
          onChange={(event, newValue) => handlePriceRangeChange(event, newValue, "Daily Rental")}
          valueLabelDisplay="auto"
          max={maxDailyRentalPrice}
          getAriaValueText={(value) => `${value} TND`}
        />
      </FormControl>

      <FormControl>
        <FormLabel id="down-payment-price-range">Down Payment Price Range</FormLabel>
        <Slider
          value={[filters.minDownPayment ?? 0, filters.maxDownPayment ?? 0]}
          onChange={(event, newValue) => handlePriceRangeChange(event, newValue, "Down Payment")}
          valueLabelDisplay="auto"
          max={maxDownPayment}
          getAriaValueText={(value) => `${value} TND`}
        />
      </FormControl>
    </Stack>
  );
};

export default CarFiltersComponent;
