import React, { useEffect, useState } from 'react';
import CarGrid from '../../components/car-grid.component';
import { CarFilters } from '../../models/car-filters.model';
import WhiteNavbar from '../../components/WhiteNavbar';
import { Grid , Box } from '@mui/material';
import axios from '../../helpers/axios.helpers';
import browse from '../../assets/images/browse.png';
import CarFiltersComponent from '../../components/center-car-filters.component';
import DateTimePickerValue from '../../components/DateRangePicker';

const BrowseCarsPage = () => {
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
  };

  const [filters, setFilters] = useState<CarFilters>(initialFilters);
  const [cars, setCars] = useState([]);

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
  };

  useEffect(() => {
    getCarsWithFilters();
  }, [filters]);

  const handleApplyFilters = () => {
    getCarsWithFilters(); // Update cars when filters applied
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <img src={browse} alt="Browse Cars" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <DateTimePickerValue />
        <Box sx = {{ margin : 'auto' , marginTop: '20px' }}>
        <CarGrid cars={cars} />
        </Box>
      </Grid>
    </div>
  );
}

export default BrowseCarsPage;
