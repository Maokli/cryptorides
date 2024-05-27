import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Grid,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "../../helpers/axios.helpers";
import PictureUpload from "../../components/carRentForm/imageUpload";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/backButton.component";

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

const UpdateCarForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const carId = parseInt(id ?? "");
  
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

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [updatedImages, setUpdatedImages] = useState({
    picture1: false,
    picture2: false,
    picture3: false,
    picture4: false,
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const token = localStorage.getItem("token");
      try {
        const query = `
        query car ($id: Int!)
        {
          car(id: $id) {
            id,
            location,
            brand,
            color,
            title,
            fuelType,
            seatsNumber,
            rentalPrice,
            downPayment,
            images {url}
          }
        }
      `;
        const variables = { id: carId };
        const response = await axios.instance.post(
          "http://localhost:3001/graphql",
          { query, variables },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.data) {
          const car = response.data.data.car;
          console.log("Car data:", car.images);
          setCarData({
            picture1: car.images[0] ? null : null,
            picture2: car.images[1] ? null : null,
            picture3: car.images[2] ? null : null,
            picture4: car,
            title: car.title,
            carLocation: car.location,
            rentalPrice: car.rentalPrice.toString(),
            downPayment: car.downPayment.toString(),
            brand: car.brand,
            color: car.color,
            fuelType: car.fuelType,
            numberOfSeats: car.seatsNumber,
          });
          setImageUrls(car.images.map((image: { url: string }) => image.url));
          
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    if (carId) fetchCarData();
  }, [carId]);

  const handlePictureChange = (
    e: ChangeEvent<HTMLInputElement>,
    pictureName: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setCarData({ ...carData, [pictureName]: e.target.files[0] });
      setUpdatedImages({ ...updatedImages, [pictureName]: true });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleNumericChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value)) && !value.includes("e")) {
      setCarData({ ...carData, [name]: value });
      setTouched({ ...touched, [name]: true });
    }
  };

  const handleDiscard = (pictureName: string, imageUrl?: string) => {
    setCarData({ ...carData, [pictureName]: null });
    if (imageUrl) {
      setDeletedImages([...deletedImages, imageUrl]);
      setImageUrls(imageUrls.filter((url) => url !== imageUrl));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing in local storage");
      return;
    }

    const query = `
    mutation UpdateCar($input: UpdateCarInput!) {
      updateCar(updateCarInput: $input) {
        id
        brand
        color
        downPayment
        fuelType
        location
        rentalPrice
        seatsNumber
        title
      }
    }
    `;

    const variables = {
      input: {
        id: carId,
        location: carData.carLocation,
        brand: carData.brand,
        color: carData.color,
        title: carData.title,
        rentalPrice: parseInt(carData.rentalPrice),
        downPayment: parseInt(carData.downPayment),
        seatsNumber: parseInt(carData.numberOfSeats),
        fuelType: carData.fuelType,
      },
    };

    try {
      const response = await axios.instance.post(
        "http://localhost:3001/graphql",
        { query, variables },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.data && response.data.data.updateCar) {
        console.log("Car updated:", response.data.data.updateCar);

        const uploadData = new FormData();
        if (updatedImages.picture1 && carData.picture1)
          uploadData.append("files", carData.picture1);
        if (updatedImages.picture2 && carData.picture2)
          uploadData.append("files", carData.picture2);
        if (updatedImages.picture3 && carData.picture3)
          uploadData.append("files", carData.picture3);
        if (updatedImages.picture4 && carData.picture4)
          uploadData.append("files", carData.picture4);
        uploadData.append("elementId", response.data.data.updateCar.id);
        uploadData.append("elementType", "1");

        const imageUploadResponse = await axios.instance.post(
          "http://localhost:3001/upload",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Images uploaded:", imageUploadResponse.data);

        if (deletedImages.length > 0) {
          const deleteImagePromises = deletedImages.map((imageUrl) =>
            axios.instance.delete(
              "http://localhost:3001/upload/deleteImages",
              { headers: { Authorization: `Bearer ${token}` }, data: { deletedImages } }
            )
          );

          await Promise.all(deleteImagePromises);
          console.log("Deleted images:", deletedImages);
          navigate("/publishedcars");
        }
      } else {
        console.error("Error updating car:", response.data.errors);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 4,
        borderRadius: "borderRadius",
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <BackButton to="/publishedCars"/>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {imageUrls.map((url, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <PictureUpload
                onChange={(e) => handlePictureChange(e, `picture${index + 1}`)}
                onDiscard={() => handleDiscard(`picture${index + 1}`, url)}
                imageUrl={url}
                required={false}
              />
            </Grid>
          ))}
          {[...Array(4 - imageUrls.length)].map((url, index) => (
            <Grid item xs={12} sm={6} key={index + imageUrls.length}>
              <PictureUpload
                onChange={(e) =>
                  handlePictureChange(
                    e,
                    `picture${index + imageUrls.length + 1}`
                  )
                }
                onDiscard={() =>
                  handleDiscard(`picture${index + imageUrls.length + 1}`)
                }
                imageUrl={url}
                required={true}
              />
            </Grid>
          ))}
          {[
            { label: "Title", name: "title" },
            { label: "Brand", name: "brand" },
            { label: "Rental Price", name: "rentalPrice", adornment: "$" },
            { label: "Down Payment", name: "downPayment", adornment: "$" },
            { label: "Location", name: "carLocation" },
            { label: "Color", name: "color" },
            { label: "Fuel Type", name: "fuelType" },
            { label: "Number of Seats", name: "numberOfSeats" },
          ].map(({ label, name, adornment }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                label={label}
                placeholder={label}
                name={name}
                value={carData[name as keyof CarData]}
                onChange={
                  name === "rentalPrice" ||
                  name === "downPayment" ||
                  name === "numberOfSeats"
                    ? handleNumericChange
                    : handleChange
                }
                onBlur={() => setTouched({ ...touched, [name]: true })}
                required
                fullWidth
                error={
                  touched[name as keyof typeof touched] &&
                  carData[name as keyof CarData] === ""
                }
                helperText={
                  touched[name as keyof typeof touched] &&
                  carData[name as keyof CarData] === ""
                    ? `${label} is required`
                    : ""
                }
                InputProps={{
                  startAdornment: adornment && (
                    <InputAdornment position="start">
                      {adornment}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Car
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateCarForm;
