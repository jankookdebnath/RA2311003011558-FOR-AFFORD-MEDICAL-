'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import NotificationCard from './NotificationCard';

export default function NotificationList({
  notifications,
  loading,
  error,
  onMarkAsViewed,
  onDelete,
  onFavorite,
}) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
        }}
      >
        <Info sx={{ fontSize: 48, color: '#999', mb: 1 }} />
        <Typography variant="h6" color="textSecondary">
          No notifications to display
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Try adjusting your filters or check back later
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
        Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
      </Typography>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsViewed={onMarkAsViewed}
          onDelete={onDelete}
          onFavorite={onFavorite}
        />
      ))}
    </Box>
  );
}
