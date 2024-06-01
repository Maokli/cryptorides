import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../helpers/auth.helpers';
import WhiteNavbar from './WhiteNavbar';
import Navbar from './Navbar';
import { CarFilters } from '../models/car-filters.model';
import axios from '../helpers/axios.helpers';

const NavbarSwitcher: React.FC = () => {
  return isAuthenticated() ? (
    <WhiteNavbar  />
  ) : (
    <Navbar />
  );
};

export default NavbarSwitcher;
