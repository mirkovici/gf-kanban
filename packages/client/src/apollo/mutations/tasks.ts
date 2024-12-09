import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      userId
      columnId
    }
  }
`;

export const UPDATE_TASK_COLUMN = gql`
  mutation UpdateTaskColumn($taskId: ID!, $columnId: ID!) {
    updateTaskColumn(taskId: $taskId, columnId: $columnId) {
      id
      title
      column
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      success
      message
    }
  }
`;
