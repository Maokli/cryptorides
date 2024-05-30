import * as React from 'react';
import { useEffect, useState, ChangeEvent } from 'react';
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
import { getUserToken } from '../../helpers/auth.helpers'
import { getUserIdFromToken } from '../../services/account.service'
import axios from '../../helpers/axios.helpers';
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



const UPDATE_USER_PROFILE_MUTATION = `
mutation UpdateUserProfile($input: UpdateUserInput!) {
    updateUserProfile(Input: $input, id :number!) {
      id
      firstName: name
      lastName: FamilyName
      email
      phone: phoneNumber
    }
  }
`;


  
  // GraphQL query to get user by ID
  const GET_USER_BY_ID = `
    query GetUserByID($id: String!) {
      user(id: $id) {
        id
        firstName: name
        lastName: FamilyName
        email
        phone: phoneNumber
      }
    }
  `;
  
  // Function to fetch user data
  async function fetchUserData(): Promise<UserData> {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error('Failed to get user ID from token');
      }
      // Ensure userId is a string
        const userIdString = userId.toString();
      const response = await axios.instance.post('', {
        query: GET_USER_BY_ID,
        variables: { id: userIdString },
      });
  
      console.log('Full response:', response);
  
      if (!response.data || !response.data.data || !response.data.data.user) {
        console.error('Unexpected response format:', response);
        throw new Error('Failed to fetch user data: Unexpected response format');
      }
  
      const user = response.data.data.user;
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }
  async function updateUserProfile(Data: UserData, token: string): Promise<UserData> {
    try {
      const userId = getUserIdFromToken();
      const userData={
        id:Number(userId),
        name:Data.firstName,
        FamilyName: Data.lastName,
        email:Data.email,
        phoneNumber:Data.phone
      }

      const response = await axios.instance.post('', {
        query: UPDATE_USER_PROFILE_MUTATION,
        variables: {
          input: userData,
          id:userId
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(token)
  
      console.log(response);
      return response.data.data.updateUserProfile;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }
  export function AccountDetailsForm(): React.JSX.Element {
    const [userData, setUserData] = useState<UserData>({
      firstName: '',
      lastName: '',
      email: '',
      phone: NaN,
    });
  
    useEffect(() => {
      const authToken = getUserToken() || '';
  
      const fetchUser = async () => {
        try {
          const fetchedUserData = await fetchUserData();
          setUserData(fetchedUserData);
          console.log(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      if (authToken) {
        fetchUser();
      }
    }, []);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
    
  
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const authToken = getUserToken() || '';
        if (!authToken) {
          throw new Error('Authentication token not found');
        }
        console.log(userData);
        
        
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