'use client';

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Delete,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';
import { useState } from 'react';

const getPriorityColor = (type) => {
  const colors = {
    Placement: '#4caf50',
    Result: '#ff9800',
    Event: '#2196f3',
  };
  return colors[type] || '#757575';
};

const getPriorityBackgroundColor = (type) => {
  const colors = {
    Placement: '#e8f5e9',
    Result: '#fff3e0',
    Event: '#e3f2fd',
  };
  return colors[type] || '#f5f5f5';
};

export default function NotificationCard({
  notification,
  onMarkAsViewed,
  onDelete,
  onFavorite,
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleViewed = () => {
    onMarkAsViewed(notification.id);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(notification.id);
  };

  const handleDelete = () => {
    onDelete(notification.id);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: getPriorityBackgroundColor(notification.type),
        borderLeft: `5px solid ${getPriorityColor(notification.type)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
        },
        opacity: notification.viewed ? 0.7 : 1,
      }}
    >
      <CardHeader
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={notification.viewed ? 'Mark as unread' : 'Mark as read'}>
              <IconButton
                size="small"
                onClick={handleViewed}
                color={notification.viewed ? 'primary' : 'default'}
              >
                {notification.viewed ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Tooltip>
            <Tooltip title={isFavorited ? 'Remove favorite' : 'Add to favorites'}>
              <IconButton size="small" onClick={handleFavorite}>
                {isFavorited ? (
                  <Favorite sx={{ color: '#f44336' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={handleDelete} color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: notification.viewed ? 400 : 600,
              textDecoration: notification.viewed ? 'line-through' : 'none',
            }}
          >
            {notification.title || notification.message}
          </Typography>
        }
        subheader={formatDate(notification.timestamp)}
      />
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={notification.type}
            size="small"
            sx={{
              backgroundColor: getPriorityColor(notification.type),
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          {notification.priority_rank && (
            <Chip
              label={`Rank: #${notification.priority_rank}`}
              size="small"
              variant="outlined"
            />
          )}
          {notification.weight && (
            <Chip
              label={`Weight: ${notification.weight}`}
              size="small"
              variant="filled"
              sx={{
                backgroundColor: '#e0e0e0',
              }}
            />
          )}
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            lineHeight: 1.6,
            textDecoration: notification.viewed ? 'line-through' : 'none',
          }}
        >
          {notification.message || notification.description || 'No additional details'}
        </Typography>
      </CardContent>
    </Card>
  );
}
