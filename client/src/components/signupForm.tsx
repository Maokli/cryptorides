import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Typography } from '@mui/material';

const SIGN_UP = gql`
  mutation SignUp($input: SignUpUserInput!) {
    signup(SignUpUserInput: $input) {
      id
      email
      name
      FamilyName
      phoneNumber
    }
  }
`;

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    familyName: '',
    phoneNumber: '',
  });
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the signUp mutation with the form data
      await signUp({ variables: { input: formData } });
    } catch (error) {
      // If there's an error during sign-up, handle it
      console.error('Error signing up:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      <TextField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        label="Email"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        label="Password"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        label="Name"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="text"
        name="familyName"
        value={formData.familyName}
        onChange={handleChange}
        label="Family Name"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        label="Phone Number"
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>Sign Up</Button>
      {error && <Typography variant="body1" color="error">{error.message}</Typography>}
    </form>
  );
};

export default SignUpForm;
