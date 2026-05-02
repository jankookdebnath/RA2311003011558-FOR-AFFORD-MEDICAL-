'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  LinearProgress,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import Header from '../components/Header';
import NotificationFilter from '../components/NotificationFilter';
import NotificationList from '../components/NotificationList';

// Mock data - In production, this would come from your API
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'Placement',
    title: 'Placement Offer - TechCorp',
    message: 'Congratulations! You have been selected for a software engineer position at TechCorp with a CTC of 12 LPA.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority_rank: 1,
    weight: 3,
    viewed: false,
  },
  {
    id: '2',
    type: 'Result',
    title: 'CS101 Exam Results Published',
    message: 'Your CS101 exam has been graded. Score: 92/100. View detailed feedback in your student portal.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    priority_rank: 2,
    weight: 2,
    viewed: false,
  },
  {
    id: '3',
    type: 'Result',
    title: 'Assignment 5 Graded',
    message: 'Your Data Structures assignment has been evaluated. Grade: A. Check comments for feedback.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    priority_rank: 3,
    weight: 2,
    viewed: true,
  },
  {
    id: '4',
    type: 'Event',
    title: 'Library Extended Hours',
    message: 'The library will remain open until 10 PM during the exam season. Study materials are available at the reference desk.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    priority_rank: 4,
    weight: 1,
    viewed: false,
  },
  {
    id: '5',
    type: 'Placement',
    title: 'Interview Scheduled - CloudTech',
    message: 'Your technical interview with CloudTech is scheduled for May 15, 2026 at 2:00 PM. Link will be sent 30 minutes before.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    priority_rank: 5,
    weight: 3,
    viewed: false,
  },
  {
    id: '6',
    type: 'Event',
    title: 'Mid-semester Feedback Survey',
    message: 'Please fill out the course feedback survey to help us improve your learning experience. Takes 5 minutes.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority_rank: 6,
    weight: 1,
    viewed: true,
  },
  {
    id: '7',
    type: 'Result',
    title: 'Project Submission Received',
    message: 'Your Web Development project has been submitted successfully. Evaluation will be completed by May 10.',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    priority_rank: 7,
    weight: 2,
    viewed: false,
  },
  {
    id: '8',
    type: 'Event',
    title: 'Internship Opportunity - DataCorp',
    message: 'DataCorp is hiring interns for summer 2026. Apply by May 20. Link: careers.datacorp.com/internships',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    priority_rank: 8,
    weight: 1,
    viewed: false,
  },
];

export default function Home() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filteredNotifications, setFilteredNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('priority');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Filter and search notifications
  useEffect(() => {
    let filtered = notifications;

    // Apply filter by type
    if (activeFilter === 'priority') {
      // Get top 10 by weight
      filtered = notifications
        .sort((a, b) => (b.weight || 0) - (a.weight || 0))
        .slice(0, 10);
    } else if (activeFilter !== 'all') {
      filtered = notifications.filter((n) => n.type === activeFilter);
    }

    // Apply search
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, activeFilter, searchTerm]);

  const handleMarkAsViewed = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: !n.viewed } : n))
    );
    showSnackbar('Notification status updated', 'success');
  }, []);

  const handleDelete = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showSnackbar('Notification deleted', 'success');
  }, []);

  const handleFavorite = useCallback((id) => {
    showSnackbar('Added to favorites', 'info');
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        showSnackbar('Notifications refreshed', 'success');
      }, 1000);
    } catch (err) {
      setError('Failed to refresh notifications');
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
      showSnackbar('All notifications cleared', 'info');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const unreadCount = notifications.filter((n) => !n.viewed).length;
  const priorityCount = notifications.filter((n) => n.weight === 3).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        unreadCount={unreadCount}
        onRefresh={handleRefresh}
        priorityCount={priorityCount}
      />

      {loading && <LinearProgress />}

      <Container maxWidth="lg" sx={{ py: 3, flex: 1 }}>
        {/* Statistics Cards */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Paper
            sx={{
              p: 2,
              flex: 1,
              backgroundColor: '#e8f5e9',
              borderLeft: '4px solid #4caf50',
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Placements
            </Typography>
            <Typography variant="h4" sx={{ color: '#4caf50' }}>
              {notifications.filter((n) => n.type === 'Placement').length}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              flex: 1,
              backgroundColor: '#fff3e0',
              borderLeft: '4px solid #ff9800',
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Results
            </Typography>
            <Typography variant="h4" sx={{ color: '#ff9800' }}>
              {notifications.filter((n) => n.type === 'Result').length}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              flex: 1,
              backgroundColor: '#e3f2fd',
              borderLeft: '4px solid #2196f3',
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Events
            </Typography>
            <Typography variant="h4" sx={{ color: '#2196f3' }}>
              {notifications.filter((n) => n.type === 'Event').length}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              flex: 1,
              backgroundColor: '#f3e5f5',
              borderLeft: '4px solid #9c27b0',
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Unread
            </Typography>
            <Typography variant="h4" sx={{ color: '#9c27b0' }}>
              {unreadCount}
            </Typography>
          </Paper>
        </Stack>

        {/* Filter Section */}
        <NotificationFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearAll={handleClearAll}
        />

        {/* Notifications List */}
        <NotificationList
          notifications={filteredNotifications}
          loading={loading}
          error={error}
          onMarkAsViewed={handleMarkAsViewed}
          onDelete={handleDelete}
          onFavorite={handleFavorite}
        />
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
