import * as React from "react";
import { Button, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import { RentalRequest } from "../models/renatalrequest.model";
import { useNavigate } from "react-router-dom";

export default function RentalRequestsList(props: { rentalrequest: RentalRequest[] }) {

    const navigate = useNavigate();

    if (props.rentalrequest.length === 0) {
        return (
            <Typography variant="h6" color="textSecondary" align="center">
                There aren't any requests yet.
            </Typography>
        );
    }

    const handleNavigate = (id: number) => {
        navigate(`/agreement/${id.toString()}`);
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.rentalrequest.map((rentalrequest) => (
                <React.Fragment key={rentalrequest.id}>
                    <ListItem>
                        <ListItemText
                            primary={rentalrequest.car.brand}
                            secondary={`From ${rentalrequest.fromdate} to ${rentalrequest.todate}`}
                        />
                        <ListItemSecondaryAction>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleNavigate(rentalrequest.id)}
                            >
                                View details
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}
