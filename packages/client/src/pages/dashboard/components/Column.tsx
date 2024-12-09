import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
}

interface ColumnProps {
  column: { id: string; name: string };
  tasks: Task[];
  onTaskMove: (taskId: string, newColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onTaskMove }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string }) => onTaskMove(item.id, column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef as unknown as React.MutableRefObject<HTMLDivElement>}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: isOver ? 'rgba(0, 128, 0, 0.2)' : '#f5f5f5',
          borderRadius: 2,
          boxShadow: 3,
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          transition: 'background-color 0.2s ease',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {column.name} ({tasks.length})
        </Typography>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            No tasks here
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Column;
