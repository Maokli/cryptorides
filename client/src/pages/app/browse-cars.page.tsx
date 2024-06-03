import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { CarFilters } from '../../models/car-filters.model';
import { Grid , Box } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import browse from '../../assets/images/browse.png';
import { useFilters } from '../../components/filterContext';
import CarFiltersComponent from '../../components/car-filters.component';
import CenterCarFiltersComponent from '../../components/center-car-filters.component';
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

const BrowseCarsPage = () => {
  const { filters, setFilters } = useFilters();
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
      const response = await axios.instance.post("",
        {
          query,
          variables: { filter: filters },
        }
      );

      setCars(response.data.data.filteredCars);
    } catch {
      console.log("error");
    }

  }

  useEffect(() => {
    getCarsWithFilters();
  }, [debouncedFilters]);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} sx={{backgroundColor: "white",  boxShadow: 2}}>
        <CarFiltersComponent filters={filters} setFilters={setFilters} />
      </Grid>
      <Grid item xs={8} md={9}>
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
              <img src={browse} alt="Browse Cars" style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>
            <Grid item margin={2}>
              <CenterCarFiltersComponent filters={filters} setFilters={setFilters} />
            </Grid>
        </Grid>
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
          <CarGrid cars={cars}></CarGrid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BrowseCarsPage;
