import React, { useState } from "react";
import MyHeader from "./components/header/header";
import MyFooter from "./components/footer/footer";
import PictureUpload from "./components/carRentForm/imageUpload";
import InputAdornment from "@mui/material/InputAdornment";

import axios from "axios";
import { Button, Grid, Container, Box, TextField } from "@mui/material";

const CarRentalForm = () => {
  const [carData, setCarData] = useState({
    picture1: null as File | null,
    picture2: null as File | null,
    picture3: null as File | null,
    picture4: null as File | null,
    title: "",
    carLocation: "",
    rentalPrice: "",
    downPayment: "",
    brand: "",
    color: "",
    fuelType: "",
    numberOfSeats: "",
  });

  const handlePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pictureName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setCarData({
        ...carData,
        [pictureName]: e.target.files[0],
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleNumericChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value)) && !value.includes("e")) {
      setCarData({
        ...carData,
        [name]: value,
      });
    }
  };

  const handleDiscard = (pictureName: string) => {
    setCarData({
      ...carData,
      [pictureName]: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ownerIdString = localStorage.getItem("ownerId");
    const token = localStorage.getItem("token");

    if (!ownerIdString || !token) {
      console.error("OwnerId or token is missing in local storage");
      return;
    }

    if (
      !carData.picture1 &&
      !carData.picture2 &&
      !carData.picture3 &&
      !carData.picture4
    ) {
      console.error("At least one image is required");
      return;
    }
    const ownerId = parseInt(ownerIdString);

    const query = `
    mutation CreateCar($input: CreateCarInput!) {
      createCar(createCarInput: $input) {
        id
        brand
        color
        downPayment
        fuelType
        location
        rentalPrice
        seatsNumber
        title
        owner {
          id
        }
      }
    }
    `;

    const variables = {
      input: {
        location: carData.carLocation,
        brand: carData.brand,
        color: carData.color,
        title: carData.title,
        rentalPrice: parseInt(carData.rentalPrice),
        downPayment: parseInt(carData.downPayment),
        seatsNumber: parseInt(carData.numberOfSeats),
        fuelType: carData.fuelType,
        ownerId: ownerId,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/graphql",
        {
          query,
          variables,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data && response.data.data.createCar) {
        console.log("Car created:", response.data.data.createCar);

        const uploadData = new FormData();
        if (carData.picture1) uploadData.append("files", carData.picture1);
        if (carData.picture2) uploadData.append("files", carData.picture2);
        if (carData.picture3) uploadData.append("files", carData.picture3);
        if (carData.picture4) uploadData.append("files", carData.picture4);
        uploadData.append("elementId", response.data.data.createCar.id);
        uploadData.append("elementType", "1");

        const ImageUploadResponse = await axios.post(
          "http://localhost:3000/upload",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setCarData({
          picture1: null,
          picture2: null,
          picture3: null,
          picture4: null,
          title: "",
          carLocation: "",
          rentalPrice: "",
          downPayment: "",
          brand: "",
          color: "",
          fuelType: "",
          numberOfSeats: "",
        });
      } else {
        console.error("Error creating car:", response.data.errors);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          p: 4,
          borderRadius: "borderRadius",
          boxShadow: 1,
          bgcolor: "background.paper",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <PictureUpload
                onChange={(e) => handlePictureChange(e, "picture1")}
                onDiscard={() => handleDiscard("picture1")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PictureUpload
                onChange={(e) => handlePictureChange(e, "picture2")}
                onDiscard={() => handleDiscard("picture2")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PictureUpload
                onChange={(e) => handlePictureChange(e, "picture3")}
                onDiscard={() => handleDiscard("picture3")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PictureUpload
                onChange={(e) => handlePictureChange(e, "picture4")}
                onDiscard={() => handleDiscard("picture4")}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                placeholder="Title"
                name="title"
                value={carData.title}
                onChange={handleChange}
                required
                fullWidth
                error={carData.title === ""}
                helperText={carData.title === "" ? "Title is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                placeholder="Brand"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                required
                fullWidth
                error={carData.brand === ""}
                helperText={carData.brand === "" ? "Brand is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rental Price"
                placeholder="Price/day"
                name="rentalPrice"
                value={carData.rentalPrice}
                onChange={handleNumericChange}
                required
                fullWidth
                type="number"
                error={Number(carData.rentalPrice) <= 0}
                helperText={
                  Number(carData.rentalPrice) <= 0
                    ? "Rental Price must be greater than 0"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">TND</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Car Location"
                placeholder="Car Location"
                name="carLocation"
                value={carData.carLocation}
                onChange={handleChange}
                required
                fullWidth
                error={carData.carLocation === ""}
                helperText={
                  carData.carLocation === "" ? "Car Location is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                placeholder="Color"
                name="color"
                value={carData.color}
                onChange={handleChange}
                required
                fullWidth
                error={carData.color === ""}
                helperText={carData.color === "" ? "Color is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Down Payment"
                placeholder="Down Payment"
                name="downPayment"
                value={carData.downPayment}
                onChange={handleNumericChange}
                required
                fullWidth
                type="number"
                error={Number(carData.downPayment) < 0}
                helperText={
                  Number(carData.downPayment) < 0
                    ? "Down Payment cannot be negative"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">TND</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fuel Type"
                placeholder="Fuel Type"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                required
                fullWidth
                error={carData.fuelType === ""}
                helperText={
                  carData.fuelType === "" ? "Fuel Type is required" : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Seats"
                placeholder="Number of Seats"
                name="numberOfSeats"
                value={carData.numberOfSeats}
                onChange={handleChange}
                required
                fullWidth
                type="number"
                error={Number(carData.numberOfSeats) <= 0}
                helperText={
                  Number(carData.numberOfSeats) <= 0
                    ? "Number of Seats must be greater than 0"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CarRentalForm;
