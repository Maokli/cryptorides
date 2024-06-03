import React, { useEffect, useState } from "react";
import CarGrid from "../../components/car-grid.component";
import { Box, Grid, Typography } from "@mui/material";
import axios from "../../helpers/axios.helpers";
import browse from "../../assets/images/browse.png";

function LikedCarsPage() {
    const [cars, setCars] = useState([])
    const [reloadTrigger, setReloadTrigger] = useState(false);
  
    const getLikedCars = async () => {
      const query = `
    query {
        LikedCars {
            id , 
            location , 
            brand , 
            color , 
            title , 
            fuelType , 
            rentalPrice , 
            downPayment,
            images {url}
        }
      }
      `;
  
      try {
        const response = await axios.instance.post("", {
          query,
          variables: {},
        });
  
        setCars(response.data.data.LikedCars);
      } catch {
        console.log("error");
      }
    };
  
    useEffect(() => {
      getLikedCars();
    }, [reloadTrigger]);

    return (
        <Grid container spacing={5}>
          <Grid item xs={4} md={9}>
            <Grid container justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginX: '30px' }}>
                <Typography variant="h4" sx={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold', textTransform: 'uppercase', color: '#0CC0DF', textAlign: 'center' }}>Liked Cars</Typography>
              </Box>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
              </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <CarGrid cars={cars} reloadTrigger={reloadTrigger} setReloadTrigger={setReloadTrigger}></CarGrid>
            </Grid>
          </Grid>
        </Grid>
      );
}

export default LikedCarsPage;