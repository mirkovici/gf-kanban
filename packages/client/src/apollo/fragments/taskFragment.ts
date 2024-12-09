import { gql } from '@apollo/client';

export const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    title
    description
    userId
    columnId
  }
`;
