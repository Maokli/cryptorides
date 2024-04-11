import { registerEnumType } from "@nestjs/graphql";

export enum fuelType {
  Gas = "Gas",
  Diesel = "Diesel",
  Electric = "Electric",
}

registerEnumType(fuelType, { name: "FuelType" });
