import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";
import OwnerCarCard from "./owner-car-card.component";

export default function OwnerCarGrid(props: { cars: Car[] }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item>
        <Grid container spacing={2}>
          {props.cars.map((car) => (
            <Grid key={car.id} item>
              <OwnerCarCard car={car}></OwnerCarCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
