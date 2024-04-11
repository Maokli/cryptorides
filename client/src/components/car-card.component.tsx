import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Carousel from './carousel.component';
import { Button, Icon, Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const images = [
  {
    url:
      'https://www.turbo.fr/sites/default/files/migration/test/field_image/000000005301416.jpg',
  },
  {
    url:
      'https://fdm.dk/sites/default/files/d6images/07-bpv-toyotagt86-002.jpg',
  },
  {
    url:
      'https://www.topspeed.sk/userfiles/articles/10-12/11605/1481385478-toyota.gt86.jpg',
  },
  {
    url:
      'https://editorial.pxcrush.net/carsales/general/editorial/161214_toyota_86_gt_ii_01-j01q.jpg?width=1024&height=682',
  },
];

export default function CarCard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Toyota GT-86"
      />
      <CardMedia>
      <Carousel images={images}></Carousel>
      </CardMedia>
      <CardContent>
        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-around">
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Icon>
              <Typography color="text.secondary">
                <PlaceIcon></PlaceIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                Ariana
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
            <Icon>
              <Typography color="text.secondary">
                <PeopleIcon></PeopleIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                4 People
            </Typography>
          </Stack>
          <Stack spacing={0.5} direction="row" alignItems="center" color="secondary">
            <Icon>
              <Typography color="text.secondary">
                <LocalGasStationIcon></LocalGasStationIcon>
              </Typography>
            </Icon>
            <Typography color="text.secondary">
                Gas
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
      <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between">
        <Stack direction="column" alignItems="start">
          <Typography color="text.primary" variant='h5' fontWeight="900" gutterBottom>
            155 TND/
            <Typography component="span" color="text.secondary" variant='h6' gutterBottom>day</Typography>
          </Typography>
          <Typography color="text.primary" variant='subtitle1' fontWeight="900" gutterBottom>
            3600 TND 
            <Typography component="span" color="text.secondary" variant='subtitle1' gutterBottom> deposit</Typography>
          </Typography>
        </Stack>
        <Button variant='contained'>View Details</Button>
      </Stack>
      </CardActions>
    </Card>
  );
}