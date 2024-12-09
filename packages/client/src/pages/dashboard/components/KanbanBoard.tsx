import React from 'react';
import { Box } from '@mui/material';
import Column from './Column';

interface Task {
  id: string;
  title: string;
  columnId: string;
}

interface ColumnData {
  tasks: Task[];
  id: string;
  name: string;
}

interface KanbanBoardProps {
  columns: ColumnData[];
  onTaskMove: (taskId: string, newColumnId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onTaskMove }) => {
  return (
    <Box display="flex" gap={2}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={column.tasks}
          onTaskMove={onTaskMove}
        />
      ))}
    </Box>
  );
};

export default KanbanBoard;
