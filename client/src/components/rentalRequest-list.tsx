import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { RentalRequest } from "../models/renatalrequest.model";

export default function RentalRequestsList(props: { rentalrequest: RentalRequest[] }) {
    if (props.rentalrequest.length === 0) {
        return (
            <Typography variant="h3" color="textSecondary" align="center">
                You didn't make any requests yet.
            </Typography>
        );
    }

    return (
        <>       
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {props.rentalrequest.map((rentalrequest) => (
                    <ListItem key={rentalrequest.id}>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src={rentalrequest.car.images[0].url}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={rentalrequest.car.brand}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >

                                    </Typography>
                                    {" —From " + rentalrequest.fromdate + " to " + rentalrequest.todate }
                                </React.Fragment>
                            }
                        />
                        <Divider variant="inset" component="li" />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
