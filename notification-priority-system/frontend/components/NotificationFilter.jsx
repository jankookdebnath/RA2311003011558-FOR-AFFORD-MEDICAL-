'use client';

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  Stack,
  Paper,
} from '@mui/material';
import { FilterList, Clear } from '@mui/icons-material';

export default function NotificationFilter({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onClearAll,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: 'white',
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <ToggleButtonGroup
            value={activeFilter}
            exclusive
            onChange={(e, newFilter) => {
              if (newFilter !== null) {
                onFilterChange(newFilter);
              }
            }}
            sx={{
              flexWrap: 'wrap',
              gap: 0.5,
            }}
          >
            <ToggleButton value="all" aria-label="all">
              All Notifications
            </ToggleButton>
            <ToggleButton value="priority" aria-label="priority">
              🔥 Priority
            </ToggleButton>
            <ToggleButton value="Placement" aria-label="placement">
              💼 Placement
            </ToggleButton>
            <ToggleButton value="Result" aria-label="result">
              📊 Result
            </ToggleButton>
            <ToggleButton value="Event" aria-label="event">
              📌 Event
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
            variant="outlined"
          />
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={onClearAll}
            color="error"
          >
            Clear
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
