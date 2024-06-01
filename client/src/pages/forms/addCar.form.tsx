import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Grid,
  Container,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "../../helpers/axios.helpers";
import { getIdFromToken, getUserToken } from "../../helpers/auth.helpers";
import PictureUpload from "../../components/carRentForm/imageUpload";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  failedToIdentifyCar,
  noImageIsSelected,
  notifyCarCreationFailure,
} from "../../helpers/toast.helpers";

interface CarData {
  picture1: File | null;
  picture2: File | null;
  picture3: File | null;
  picture4: File | null;
  title: string;
  carLocation: string;
  rentalPrice: string;
  downPayment: string;
  brand: string;
  color: string;
  fuelType: string;
  numberOfSeats: string;
}

const AddCarForm = () => {
  const [carData, setCarData] = useState<CarData>({
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

  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    title: false,
    carLocation: false,
    rentalPrice: false,
    downPayment: false,
    brand: false,
    color: false,
    fuelType: false,
    numberOfSeats: false,
  });

  const handlePictureChange = (
    e: ChangeEvent<HTMLInputElement>,
    pictureName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setCarData({
        ...carData,
        [pictureName]: e.target.files[0],
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleNumericChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value)) && !value.includes("e")) {
      setCarData({
        ...carData,
        [name]: value,
      });
      setTouched({
        ...touched,
        [name]: true,
      });
    }
  };

  const handleDiscard = (pictureName: string) => {
    setCarData({
      ...carData,
      [pictureName]: null,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getUserToken();
    if (!token) {
      console.error("Token is missing in local storage");
      return;
    }
    const ownerIdString = getIdFromToken(token);

    if (!ownerIdString) {
      console.error("OwnerId  missing in local storage");
      
      return;
    }

    const images = [
      carData.picture1,
      carData.picture2,
      carData.picture3,
      carData.picture4,
    ].filter(Boolean);

    if (images.length === 0) {
      noImageIsSelected();
      return;
    }

    // Verify that all images are cars
    for (const image of images) {
      const aiResponse = await axios.instance.post(
        "https://cryptoridesprediction-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/2ba1f1ab-1903-48cd-b52d-56e82b28f440/classify/iterations/CarPrediction/image",
        image,
        {
          headers: {
            "Prediction-Key": "294e1c1b06b44292a168cca286b2435e",
            "Content-Type": "application/octet-stream",
          },
        }
      );

      const predictions = aiResponse.data.predictions;

      if (!predictions) {
        console.error("No predictions returned from AI.");
        return;
      }

      const isCar = predictions.some(
        (prediction: any) =>
          prediction.tagName === "Vehicle" && prediction.probability > 0.75
      );
      if (!isCar) {
        failedToIdentifyCar();
        return;
      }
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
      const response = await axios.instance.post("", {
        query,
        variables,
      });

      if (response.data.data && response.data.data.createCar) {
        const uploadData = new FormData();
        if (carData.picture1) uploadData.append("files", carData.picture1);
        if (carData.picture2) uploadData.append("files", carData.picture2);
        if (carData.picture3) uploadData.append("files", carData.picture3);
        if (carData.picture4) uploadData.append("files", carData.picture4);
        uploadData.append("elementId", response.data.data.createCar.id);
        uploadData.append("elementType", "1");

        const ImageUploadResponse = await axios.instance.post(
          "http://localhost:3001/upload",
          uploadData,
          {
            headers: {
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

        setTouched({
          title: false,
          carLocation: false,
          rentalPrice: false,
          downPayment: false,
          brand: false,
          color: false,
          fuelType: false,
          numberOfSeats: false,
        });
      } else {
        notifyCarCreationFailure();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    navigate("/browse");
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
                onBlur={() => setTouched({ ...touched, title: true })}
                required
                fullWidth
                error={touched.title && carData.title === ""}
                helperText={
                  touched.title && carData.title === ""
                    ? "Title is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                placeholder="Brand"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, brand: true })}
                required
                fullWidth
                error={touched.brand && carData.brand === ""}
                helperText={
                  touched.brand && carData.brand === ""
                    ? "Brand is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rental Price"
                placeholder="Price/day"
                name="rentalPrice"
                value={carData.rentalPrice}
                onChange={handleNumericChange}
                onBlur={() => setTouched({ ...touched, rentalPrice: true })}
                required
                fullWidth
                type="number"
                error={touched.rentalPrice && Number(carData.rentalPrice) <= 0}
                helperText={
                  touched.rentalPrice && Number(carData.rentalPrice) <= 0
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
                onBlur={() => setTouched({ ...touched, carLocation: true })}
                required
                fullWidth
                error={touched.carLocation && carData.carLocation === ""}
                helperText={
                  touched.carLocation && carData.carLocation === ""
                    ? "Car Location is required"
                    : ""
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
                onBlur={() => setTouched({ ...touched, color: true })}
                required
                fullWidth
                error={touched.color && carData.color === ""}
                helperText={
                  touched.color && carData.color === ""
                    ? "Color is required"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Down Payment"
                placeholder="Down Payment"
                name="downPayment"
                value={carData.downPayment}
                onChange={handleNumericChange}
                onBlur={() => setTouched({ ...touched, downPayment: true })}
                required
                fullWidth
                type="number"
                error={touched.downPayment && Number(carData.downPayment) < 0}
                helperText={
                  touched.downPayment && Number(carData.downPayment) < 0
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
                select
                label="Fuel Type"
                placeholder="Fuel Type"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, fuelType: true })}
                required
                fullWidth
                error={touched.fuelType && carData.fuelType === ""}
                helperText={
                  touched.fuelType && carData.fuelType === ""
                    ? "Fuel Type is required"
                    : ""
                }
              >
                <MenuItem value="Gas">Gas</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Seats"
                placeholder="Number of Seats"
                name="numberOfSeats"
                value={carData.numberOfSeats}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, numberOfSeats: true })}
                required
                fullWidth
                type="number"
                error={
                  touched.numberOfSeats && Number(carData.numberOfSeats) <= 0
                }
                helperText={
                  touched.numberOfSeats && Number(carData.numberOfSeats) <= 0
                    ? "Number of Seats must be greater than 0"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleBack} variant="outlined">
              <ArrowBackIosIcon></ArrowBackIosIcon> Back
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default AddCarForm;
