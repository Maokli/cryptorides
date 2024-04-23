import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a new instance of the ApolloClient with a custom link
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
  cache: new InMemoryCache()
});

// Render the ToastContainer at the root of your application
// (This assumes that the ToastContainer is rendered in your root component)


// Export the ApolloClient instance
export default client;
