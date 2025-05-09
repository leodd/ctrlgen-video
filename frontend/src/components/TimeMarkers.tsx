import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../styles/colors';

interface TimeMarkersProps {
  duration: number;
  zoom: number; // pixels per second
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  duration,
  zoom,
}) => {
  // Memoize calculations
  const { timelineWidth, markerInterval } = useMemo(() => ({
    timelineWidth: duration * zoom,
    markerInterval: zoom < 10 ? 10 : zoom < 30 ? 5 : 1
  }), [duration, zoom]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Memoize markers array
  const markers = useMemo(() => 
    Array.from({ length: Math.ceil(duration / markerInterval) + 1 }).map((_, i) => {
      const time = i * markerInterval;
      return (
        <Box
          key={time}
          sx={{
            height: '100%',
            borderLeft: 1,
            borderColor: 'divider',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          >
            {formatTime(time)}
          </Typography>
        </Box>
      );
    }), [markerInterval, formatTime]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 18,
        bgcolor: colors.background.dark,
        width: timelineWidth,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {markers}
    </Box>
  );
};

export default TimeMarkers; 