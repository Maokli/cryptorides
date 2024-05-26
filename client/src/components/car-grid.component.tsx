import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";

export default function CarGrid(props: { cars: Car[] }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item>
        <Grid container spacing={2}>
          {props.cars.map((car) => (
            <Grid key={car.id} item>
              <CarCard car={car}></CarCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
