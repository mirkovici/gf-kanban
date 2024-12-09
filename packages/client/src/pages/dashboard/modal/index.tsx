import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import router from 'next/router';

interface User {
  id: number;
  username: string;
}

const NewTaskModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [description, setDescription] = useState('');
  const [selectedOwnerIds, setSelectedOwnerIds] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users when the modal opens
  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const authToken = localStorage.getItem('auth_token');

      if (!authToken) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      const data = await response.json();
      setUsers(data || []);
    } catch (err) {
      setError(
        (err as Error).message || 'An error occurred while fetching users.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerToggle = (ownerId: number) => {
    setSelectedOwnerIds(
      (prev) =>
        prev.includes(ownerId)
          ? prev.filter((id) => id !== ownerId) // Remove if already selected
          : [...prev, ownerId], // Add if not selected
    );
  };

  const handleSave = async () => {
    try {
      const authToken = localStorage.getItem('auth_token');

      if (!authToken) {
        router.push('/login');
        return;
      }
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          ownerIds: selectedOwnerIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save the task.');
      }

      console.log('Task saved successfully.');
      onClose(); // Close the modal after saving
    } catch (err) {
      console.error(
        (err as Error).message || 'An error occurred while saving the task.',
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            New Task
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Description Field */}
          <TextField
            label="Description"
            placeholder="Add a task description..."
            multiline
            minRows={3}
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Owners Field */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Assign Owners
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Box display="flex" gap={1} flexWrap="wrap">
                {users.map((user) => (
                  <Chip
                    key={user.id}
                    label={user.username}
                    onClick={() => handleOwnerToggle(user.id)}
                    color={
                      selectedOwnerIds.includes(user.id) ? 'primary' : 'default'
                    }
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!description.trim() || selectedOwnerIds.length === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskModal;
