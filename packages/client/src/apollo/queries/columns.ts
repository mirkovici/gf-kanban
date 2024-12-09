import { gql } from '@apollo/client';

export const GET_COLUMNS = gql`
  query getAllColumns {
    columns {
      id
      name
      tasks {
        id
        title
      }
    }
  }
`;
