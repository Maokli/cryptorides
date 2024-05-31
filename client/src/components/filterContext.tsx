import React, { createContext, useContext, useState } from 'react';
import { CarFilters } from '../models/car-filters.model';

// Define the type for the context
type FiltersContextType = {
  filters: CarFilters;
  setFilters: React.Dispatch<React.SetStateAction<CarFilters>>;
};

// Create the context with initial value undefined
const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

// Custom hook to consume the context
export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<CarFilters>({
    availabilityFrom: null,
    availabilityTo: null,
    minPrice: null,
    maxPrice: null,
    minDownPayment: null,
    maxDownPayment: null,
    search: null,
    location: null,
    color: null,
    brand: null,
  });

  // Value to be provided by the context
  const contextValue: FiltersContextType = {
    filters,
    setFilters,
  };

  // Provide the context value to the children
  return <FiltersContext.Provider value={contextValue}>{children}</FiltersContext.Provider>;
};
