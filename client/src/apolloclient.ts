import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getUserToken} from './helpers/auth.helpers'; 

const client = new ApolloClient({
  link: onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        // Show toast for GraphQL errors
        toast.error(`GraphQL Error: ${message}`);
      });
    }
    if (networkError) {
      // Show toast for network errors
      toast.error(`Network Error: ${networkError.message}`);
    }
  }).concat(createHttpLink({ uri: 'http://localhost:3001/graphql' })),
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${getUserToken()}` // Include the token in the request headers
  }
});

export default client;
