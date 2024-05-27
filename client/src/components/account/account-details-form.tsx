import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { UserData } from '../../models/user.model';
import axios from '../../helpers/axios.helpers';
import { getUserToken } from '../../helpers/auth.helpers'
import { SelectChangeEvent } from '@mui/material/Select';

const states = [
  { value: 'ariana', label: 'Ariana' },
  { value: 'beja', label: 'Beja' },
  { value: 'ben-arous', label: 'Ben Arous' },
  { value: 'bizerte', label: 'Bizerte' },
  { value: 'gabes', label: 'Gabes' },
  { value: 'gafsa', label: 'Gafsa' },
  { value: 'jendouba', label: 'Jendouba' },
  { value: 'kairouan', label: 'Kairouan' },
  { value: 'kasserine', label: 'Kasserine' },
  { value: 'kebili', label: 'Kebili' },
  { value: 'kef', label: 'Kef' },
  { value: 'mahdia', label: 'Mahdia' },
  { value: 'manouba', label: 'Manouba' },
  { value: 'medenine', label: 'Medenine' },
  { value: 'monastir', label: 'Monastir' },
  { value: 'nabeul', label: 'Nabeul' },
  { value: 'sfax', label: 'Sfax' },
  { value: 'sidi-bouzid', label: 'Sidi Bouzid' },
  { value: 'siliana', label: 'Siliana' },
  { value: 'sousse', label: 'Sousse' },
  { value: 'tataouine', label: 'Tataouine' },
  { value: 'tozeur', label: 'Tozeur' },
  { value: 'tunis', label: 'Tunis' },
  { value: 'zaghouan', label: 'Zaghouan' }
] as const;


const GET_USER_PROFILE_QUERY = `
  query {
    userProfile {
      id
      firstName
      lastName
      email
      phone
      state
      walletID
    }
  }
`;

const UPDATE_USER_PROFILE_MUTATION = `
  mutation UpdateUserProfile($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      firstName
      lastName
      email
      phone
      state
      walletID
    }
  }
`;

async function fetchUserData(token: string): Promise<any> {
  try {
    const response = await axios.instance.post('http://localhost:3001/graphql', {
      query: GET_USER_PROFILE_QUERY,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.userProfile;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
}


export function AccountDetailsForm(): React.JSX.Element {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const authToken = getUserToken() || '';

    const fetchUser = async () => {
      try {
        const userData = await fetchUserData(authToken);
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (authToken) {
      fetchUser();
    }
  }, []);

  async function updateUserProfile(userData: UserData, authToken: string): Promise<any> {
    try {
      const response = await axios.instance.post('http://localhost:3001/graphql', {
        query: UPDATE_USER_PROFILE_MUTATION,
        variables: {
          input: userData,
        },
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.data.updateUserProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => (prevUserData ? { ...prevUserData, [name]: value } : null));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) =>
      prevUserData ? { ...prevUserData, [name as string]: value } : null
    );
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const authToken = getUserToken() || '';
      if (!authToken) {
        throw new Error('Authentication token not found');
      }
      if (userData) {
        await updateUserProfile(userData, authToken);
      } else {
        throw new Error('User data is not available');
      }

    } catch (error) {
      console.error('Error updating user profile:', error);

    }
  };


  return (
      <form
        onSubmit={handleFormSubmit}
      >
        <Card>
          <CardHeader title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput
                    value={userData?.firstName || ''}
                    label="First name"
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput
                    value={userData?.lastName || ''}
                    label="Last name"
                    name="lastName"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput
                    value={userData?.email || ''}
                    label="Email address"
                    name="email"
                    readOnly
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Phone number</InputLabel>
                  <OutlinedInput
                    value={userData?.phone || ''}
                    label="Phone number"
                    name="phone"
                    type="tel"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    label="State"
                    name="state"
                    variant="outlined"
                    value={userData?.state || ''}
                    onChange={handleSelectChange}
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <OutlinedInput
                    label="City"
                    name="city"
                    value={userData?.city || ''}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-start' }}>
            <Button variant="contained" type="submit">Save details</Button>
          </CardActions>
        </Card>
      </form>
  );
}