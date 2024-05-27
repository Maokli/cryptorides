import * as React from "react";
import Grid from "@mui/material/Grid";
import CarCard from "./car-card.component";
import { Car } from "../models/car.model";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { RentalRequest } from "../models/renatalrequest.model";
const images = [
    {
        url:
            'https://i.ytimg.com/vi/1HAACt8gmE0/maxresdefault.jpg',
    },
    {
        url:
            'https://fdm.dk/sites/default/files/d6images/07-bpv-toyotagt86-002.jpg',
    }, {
        url: '../'
    }
]
export default function RentalRequestsList(props: { rentalrequest: RentalRequest[], cars: Car[] }) {
    return (
        <>        
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {props.rentalrequest.map((rentalrequest) => (
                    <ListItem>
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
