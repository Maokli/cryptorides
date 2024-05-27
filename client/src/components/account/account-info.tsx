import React, { useState, ChangeEvent, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PictureUpload from '../carRentForm/imageUpload'; // Import the PictureUpload component
import { userInfo } from 'os';
import {UserInfo}  from '../../models/user.model';
import {getUserToken} from '../../helpers/auth.helpers'



export function AccountInfo(): React.JSX.Element {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Function to extract user information from JWT token
  const extractUserInfoFromToken = (token: string): UserInfo | null => {
      try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
          const { firstname, lastname, avatar, state, city, walletID } = decodedToken; // Extracting user details
          return { firstname, lastname, avatar, state, city, walletID };
      } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
      }
  };

  useEffect(() => {
      // Fetch JWT token from local storage
      const authToken = getUserToken();

      if (authToken) {
          // Extract user information from JWT token
          const userInfo = extractUserInfoFromToken(authToken);
          setUser(userInfo);
      }
  }, []);

  // Handle profile picture change
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          // You can perform additional validation if needed
          const imageUrl = URL.createObjectURL(file);
          setProfilePicture(imageUrl);
      }
  };

  // Handle discarding profile picture
  const handleDiscardPicture = () => {
      setProfilePicture(null);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            {profilePicture ? (
              <Avatar src={profilePicture} sx={{ height: '80px', width: '80px' }} />
            ) : (
              <Avatar src={user?.avatar || ''} sx={{ height: '80px', width: '80px' }} /> // Use user?.avatar to avoid errors
            )}
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{`${user?.firstname || ''} ${user?.lastname || ''}`}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.city} {user?.state}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <PictureUpload onChange={handlePictureChange} onDiscard={handleDiscardPicture} />
      </CardActions>
    </Card>
  );
}
