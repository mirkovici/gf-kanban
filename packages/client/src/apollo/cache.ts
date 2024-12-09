import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tasks: {
          merge(existing = [], incoming) {
            return incoming; // Simple replacement, customize if needed
          },
        },
      },
    },
  },
});

export default cache;
