import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Typography } from '@mui/material';
import { isAuthenticated, setUserToken } from '../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess, notifyError } from '../helpers/toast.helpers';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      user {
        id
        email
        name
        FamilyName
        phoneNumber
      }
      access_token
    }
  }
`;

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [login, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email: formData.email, password: formData.password } });
      if (data && data.login && data.login.access_token) {
        setUserToken(data.login.access_token);
        navigate('/');
        notifySuccess(); 
      }
    } catch (error) {
      notifyError(); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>Login</Typography>
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
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Login
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
