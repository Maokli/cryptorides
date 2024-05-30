import React, { useState, ChangeEvent, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PictureUpload from '../carRentForm/imageUpload'; 
import {UserInfo}  from '../../models/user.model';

import { getUserToken } from '../../helpers/auth.helpers'
import { getUserIdFromToken } from '../../services/account.service'
import axios from '../../helpers/axios.helpers';

const GET_USER_BY_ID = `
    query GetUserByID($id: String!) {
      user(id: $id) {
        firstName: name
        lastName: FamilyName
        WalletID
      }
    }
  `;
  
  // Function to fetch user data
  async function fetchUserData(): Promise<UserInfo> {
    try {
      // Decode the token to get the user ID
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
      const user = response.data.data.user;
      return {
        avatar: "",
        firstname: user.firstName,
        lastname: user.lastName,
        walletID: user.WalletID
      }; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }

export function AccountInfo(): React.JSX.Element {
  const [user, setUser] = useState<UserInfo>({
    avatar:"",
    firstname: "",
    lastname: "",
    walletID: ""
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

 
  useEffect(() => {
    const authToken = getUserToken() || '';

    const fetchUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (authToken) {
      fetchUser();
    }
  }, []);

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfilePicture(imageUrl);
      }
  };

  const handleDiscardPicture = () => {
      setProfilePicture(null);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            {profilePicture ? (
              <Avatar src={profilePicture} sx={{ height: '20vh', width: '10vw' }} />
            ) : (
              <Avatar src={user?.avatar || ''} sx={{ height: '20vh', width: '10vw' }} /> 
            )}
          </div>
          <Stack spacing={5} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">{`${user?.firstname || ''} ${user?.lastname || ''}`}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.walletID}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center',padding: '8px' }}>
        <PictureUpload onChange={handlePictureChange} onDiscard={handleDiscardPicture} />
      </CardActions>
    </Card>
  );
}