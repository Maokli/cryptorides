import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { Car } from '../../models/car.model';
import { CarFilters } from '../../models/car-filters.model';
import CarFiltersComponent from '../../components/car-filters.component';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { getUserToken } from '../../helpers/auth.helpers';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const useDebouncedFilters = (filters: CarFilters, delay: number) => {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, delay]);

  return debouncedFilters;
};

function BrowseCarsPage() {
  const initialFilters: CarFilters = {
    availabilityFrom: null,
    availabilityTo: null,
    minPrice: null,
    maxPrice: null,
    minDownPayment: null,
    maxDownPayment: null,
    search: null,
    location: null,
    color: null,
    brand: null
  }
  const [filters, setFilters] = useState(initialFilters);
  const [cars, setCars] = useState([])

  // improves UX and perf as we don't fetch on each filter change
  // source: https://www.dhiwise.com/post/ultimate-guide-to-implementing-react-debounce-effectively
  const debouncedFilters = useDebouncedFilters(filters, 500);

  const getCarsWithFilters = async () => {
    const query = `
      query filteredCars ($filter: CarFilter)
      {
        filteredCars(filter: $filter) {
          id,
          location,
          brand,
          color,
          title,
          fuelType,
          seatsNumber,
          rentalPrice,
          downPayment,
          images {url}
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://localhost:3001/graphql",
        {
          query,
          variables: {filter: filters},
        },
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      setCars(response.data.data.filteredCars);
    }
    catch {
      console.log("error")
    }
  }

  useEffect(() => {
    getCarsWithFilters();
  }, [debouncedFilters]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5}>
        <CarFiltersComponent filters={filters} setFilters={setFilters} />
      </Grid>
      <Grid item xs={8}>
        <form>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              const newFilters = {...filters}
              newFilters.search = (e.target as HTMLInputElement).value;
              setFilters(newFilters);
            }}
            label="Enter a city name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </form>
        <CarGrid cars={cars}></CarGrid>
      </Grid>
    </Grid>
  );
}

export default BrowseCarsPage;
