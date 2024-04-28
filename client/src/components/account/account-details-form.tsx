
'use client';

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
import {UserData}  from '../../models/user.model';

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
  
  async function fetchUserData(token: string): Promise<any> {
    const response = await fetch('http://localhost:3000/userProfile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  }
  
  export function AccountDetailsForm(): React.JSX.Element {
    const [userData, setUserData] = useState<UserData | null>(null);
  
    useEffect(() => {
      // Fetch JWT token from local storage
      const authToken =  localStorage.getItem('authToken') || '';
  
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
    async function updateUserProfile(userData: UserData, authToken: string) {
        const response = await fetch('http://localhost:3000/updateUserProfile', {
            method: 'PUT', // Assuming you're updating user profile
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }
        return response.json();
    }
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken') || '';
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            if (userData) {
                await updateUserProfile(userData, authToken);
                // Optionally, you can show a success message or redirect the user
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
                  <OutlinedInput value={userData?.firstName || ''} label="First name" name="firstName"/>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput value={userData?.lastName || ''} label="Last name" name="lastName"/>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput value={userData?.email || ''} label="Email address" name="email" readOnly />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Phone number</InputLabel>
                  <OutlinedInput value={userData?.phone || ''} label="Phone number" name="phone" type="tel" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select label="State" name="state" variant="outlined" value={userData ? userData.state : ''}>
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
                  <OutlinedInput label="City" />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">Save details</Button>
          </CardActions>
        </Card>
      </form>
    );
  }