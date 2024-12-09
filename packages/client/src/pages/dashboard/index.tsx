import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Typography } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';
import { GET_COLUMNS } from '@/apollo/queries/columns';
import { UPDATE_TASK_COLUMN } from '@/apollo/mutations/tasks';

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface Column {
  id: string;
  name: string;
  tasks: Task[]; // Nested tasks field in the column
}

const Dashboard: React.FC = () => {
  const {
    data: columnsData,
    loading: columnsLoading,
    error: columnsError,
  } = useQuery(GET_COLUMNS);

  const [updateTaskColumn] = useMutation(UPDATE_TASK_COLUMN);

  const [columns, setColumns] = useState<Column[]>([]);

  // Update columns and tasks when fetched
  useEffect(() => {
    if (columnsData && columnsData.columns) {
      setColumns(columnsData.columns);
    }
  }, [columnsData]);

  // Handle moving tasks between columns
  const handleTaskMove = async (taskId: string, newColumnId: string) => {
    try {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === taskId ? { ...task, columnId: newColumnId } : task,
          ),
        })),
      );

      await updateTaskColumn({
        variables: { taskId, columnId: newColumnId },
      });
    } catch (error) {
      console.error('Failed to update task columnId:', error);
    }
  };

  if (columnsLoading) return <Typography>Loading...</Typography>;
  if (columnsError)
    return (
      <Typography>Error loading columns: {columnsError.message}</Typography>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          padding: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Kanban Board
        </Typography>
        <KanbanBoard columns={columns} onTaskMove={handleTaskMove} />
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
