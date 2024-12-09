import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      userId
      columnId
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      title
      description
      userId
      columnId
    }
  }
`;
