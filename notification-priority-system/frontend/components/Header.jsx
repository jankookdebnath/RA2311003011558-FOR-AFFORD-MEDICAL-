'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Notifications,
  Settings,
  Refresh,
} from '@mui/icons-material';
import { useState } from 'react';

export default function Header({
  unreadCount,
  onRefresh,
  priorityCount,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ mb: 3 }}>
      <Toolbar>
        <Notifications sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: 0.5,
          }}
        >
          Priority Inbox
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Typography variant="body2">
                {unreadCount} New
              </Typography>
            </Box>
          </Badge>

          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            🔥 {priorityCount} Priority
          </Typography>

          <IconButton
            color="inherit"
            onClick={onRefresh}
            title="Refresh notifications"
          >
            <Refresh />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            title="Settings"
          >
            <Settings />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Preferences
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Help
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
