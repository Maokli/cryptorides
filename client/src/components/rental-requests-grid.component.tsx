import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";
import { rentalRequestDto } from "../models/rental-request.model";
import RentalRequestCard from "./rental-requests-card.component";

export default function RentalRequestGrid(props: { rentalRequests: rentalRequestDto[] }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item>
        <Grid container spacing={2}>
          {props.rentalRequests.map((rentalRequest) => (
            <Grid key={rentalRequest.id} item>
              <RentalRequestCard rentalRequest={rentalRequest}></RentalRequestCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
