import { ApolloClient, HttpLink, ApolloLink } from '@apollo/client';
import errorLink from './errorLink'; // Custom error link for handling errors
import cache from './cache'; // Custom cache configuration

// Define the HTTP link for communicating with the GraphQL server
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:4000/graphql', // Use environment variable or fallback to local URI
});

// Combine multiple Apollo links
const link = ApolloLink.from([
  errorLink, // Custom error handling
  httpLink, // HTTP link for GraphQL requests
]);

// Create the Apollo Client instance
const client = new ApolloClient({
  link,
  cache, // In-memory cache configuration
});

export default client;
