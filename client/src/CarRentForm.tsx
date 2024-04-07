import React, { useState } from "react";
import MyHeader from "./components/header/header";
import MyFooter from "./components/footer/footer";
import LabeledInput from "./components/carRentForm/inputField";
import PictureUpload from "./components/carRentForm/imageUpload";
import axios from 'axios';

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

  const handleDiscard = (pictureName: string) => {
    setCarData({
      ...carData,
      [pictureName]: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/cars', carData);
      console.log('Car created:', response.data.car);
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
      });
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <MyHeader />
      <div className="bg-gray-200 p-4 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          {/* PictureUpload components */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                  <PictureUpload
                    onChange={(e) => handlePictureChange(e, "picture1")}
                    onDiscard={() => handleDiscard("picture1")}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <PictureUpload
                    onChange={(e) => handlePictureChange(e, "picture2")}
                    onDiscard={() => handleDiscard("picture2")}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                  <PictureUpload
                    onChange={(e) => handlePictureChange(e, "picture3")}
                    onDiscard={() => handleDiscard("picture3")}
                  />
                </div>
                <div className="flex justify-center">
                  <PictureUpload
                    onChange={(e) => handlePictureChange(e, "picture4")}
                    onDiscard={() => handleDiscard("picture4")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div>
                  <LabeledInput
                    label="Title"
                    placeholder="Title"
                    name="title"
                    value={carData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <LabeledInput
                    label="Brand"
                    placeholder="Brand"
                    name="brand"
                    value={carData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <LabeledInput
                    label="Rental Price"
                    placeholder="Price/day"
                    name="rentalPrice"
                    value={carData.rentalPrice}
                    onChange={handleChange}
                    required
                    numeric
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <LabeledInput
                    label="Car Location"
                    placeholder="Car Location"
                    name="carLocation"
                    value={carData.carLocation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <LabeledInput
                    label="Color"
                    placeholder="Color"
                    name="color"
                    value={carData.color}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <LabeledInput
                    label="Down Payment"
                    placeholder="Down Payment"
                    name="downPayment"
                    value={carData.downPayment}
                    onChange={handleChange}
                    required
                    numeric
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <MyFooter />
    </div>
  );
};

export default CarRentalForm;
