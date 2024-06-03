import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";

export default function CarGrid(props: { cars: Car[], reloadTrigger?: boolean, setReloadTrigger?: React.Dispatch<React.SetStateAction<boolean>> }) {
  
  return (
    <Grid sx={{ flexGrow: 1 }} container alignSelf={"center"} justifySelf={"center"}>
        <Grid container columns={4} rowSpacing={2}>
          {props.cars.map((car) => (
            <Grid key={car.id} item xs md={1}>
              <CarCard car={car} reloadTrigger={props.reloadTrigger} setReloadTrigger={props.setReloadTrigger}></CarCard>
            </Grid>
          ))}
        </Grid>
    </Grid>
  );
}