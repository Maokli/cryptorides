import React, { useState } from 'react';
import { isAuthenticated } from '../helpers/auth.helpers';
import WhiteNavbar from './WhiteNavbar';
import Navbar from './Navbar';
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

  return isAuthenticated() ? (
    <WhiteNavbar filters={filters} setFilters={setFilters} onApplyFilters={() => {}} />
  ) : (
    <Navbar />
  );
};

export default NavbarSwitcher;
