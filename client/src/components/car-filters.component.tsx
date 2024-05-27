import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Stack } from "@mui/material";
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

  const handleRadioSelectChanged = (event: React.MouseEvent, property: "location" | "color" | "brand") => {
    const newValue = (event.target as HTMLInputElement).value;
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

  return <Stack spacing={2} padding={3}>
          <FormControl>
          <FormLabel id="brand-radio-buttons-group">Brand</FormLabel>
          <RadioGroup
            aria-labelledby="brand-radio-buttons-group"
            name="brand-radio-buttons-group"
            value={filters.brand}
            onClick={(event) => handleRadioSelectChanged(event, "brand")}
          >
            {
              !isNullOrEmpty(brands) && brands.map(brand => {
                return <FormControlLabel value={brand} control={<Radio />} label={brand} />
              })
            }
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="location-radio-buttons-group">Location</FormLabel>
          <RadioGroup
            aria-labelledby="location-radio-buttons-group"
            name="location-radio-buttons-group"
            value={filters.location}
            onClick={(event) => handleRadioSelectChanged(event, "location")}
          >
            {
              !isNullOrEmpty(locations) && locations.map(location => {
                return <FormControlLabel value={location} control={<Radio />} label={location} />
              })
            }
          </RadioGroup>
        </FormControl>
        <FormControl margin="normal">
          <FormLabel id="color-radio-buttons-group">Color</FormLabel>
          <RadioGroup
            aria-labelledby="color-radio-buttons-group"
            name="color-radio-buttons-group"
            value={filters.color}
            onClick={(event) => handleRadioSelectChanged(event, "color")}
          >
            {
              !isNullOrEmpty(colors) && colors.map(color => {
                return <FormControlLabel value={color} control={<Radio />} label={color} />
              })
            }
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
          <FormLabel color="secondary" id="daily-rental-price-range">Down Payment Price Range</FormLabel>
            <Slider
              value={[filters.minDownPayment ?? 0, filters.maxDownPayment ?? 0]}
              onChange={(event, newValue) => handlePriceRangeChange(event, newValue, "Down Payment")}
              valueLabelDisplay="auto"
              max={maxDownPayment}
              getAriaValueText={(value) => `${value} TND`}
            />
        </FormControl>
      </Stack>
}