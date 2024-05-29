import React, { useState } from 'react';
import Navbar from './Navbar';
import WhiteNavbar from './WhiteNavbar';
import { isAuthenticated } from '../helpers/auth.helpers';
import { CarFilters } from '../models/car-filters.model';

const NavbarSwitcher: React.FC = () => {
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

  return isAuthenticated() ? <WhiteNavbar filters={filters} setFilters={setFilters} /> : <Navbar />;
};

export default NavbarSwitcher;
