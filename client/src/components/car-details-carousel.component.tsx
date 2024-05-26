// src/components/CarDetailsCarousel.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Image } from '../models/image.model';

const CarDetailsCarousel = (props: {images: Image[]}) => {
    const [mainImage, setMainImage] = useState(props.images[0].url);

    const isMainImage = (image: Image) => image.url == mainImage;

    return (
        <Card sx={{borderRadius: 2, boxShadow: 3, padding: 1 }}>
            <CardContent>
                <CardMedia
                    component="img"
                    image={mainImage}
                    alt="Main car image"
                    sx={{ borderRadius: 2,
                          overflow: 'hidden',
                          width: '100%',
                          objectFit: 'cover',
                            maxWidth: 500,
                            maxHeight: 300}}
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {props.images.map((image, i) => (
                        <Grid item xs={4} key={i} 
                        padding={isMainImage(image) ? 0.5 : 0}
                        sx={{border: isMainImage(image) ? {border: "solid", borderColor: "#3563e9", borderRadius: 4} : {border: 0}}}>
                            <CardMedia
                                component="img"
                                height="80"
                                image={image.url}
                                alt={image.url}
                                onClick={() => setMainImage(image.url)}
                                sx={{ cursor: 'pointer', borderRadius: 2 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CarDetailsCarousel;
