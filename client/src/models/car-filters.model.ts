
export interface CarFilters {
  availabilityFrom: Date | null;

  availabilityTo: Date | null;

  minPrice: number | null;

  maxPrice: number | null;

  minDownPayment: number | null;

  maxDownPayment: number | null;

  search: string | null;

  location: string | null;

  color: string | null;

  brand: string | null;
}
