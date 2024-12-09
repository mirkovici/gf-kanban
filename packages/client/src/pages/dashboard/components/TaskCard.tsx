import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Task {
  id: string;
  title: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef as unknown as React.MutableRefObject<HTMLDivElement>}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        transition: 'opacity 0.2s ease',
      }}
    >
      <Card
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Typography variant="body1" fontWeight="bold">
              {task.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
