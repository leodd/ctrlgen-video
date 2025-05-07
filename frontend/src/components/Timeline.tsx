import React, { useState } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import TimeMarkers from './TimeMarkers';
import TrackArea from './TrackArea';

interface Clip {
  id: string;
  startTime: number;
  duration: number;
}

interface TimelineProps {
  duration: number;
  currentTime: number;
  clips: Clip[];
  onTimeChange: (time: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  duration,
  currentTime,
  clips,
  onTimeChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(40); // pixels per second

  const handlePlayheadDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dragPosition = e.clientX - rect.left;
      const newTime = dragPosition / zoom;
      onTimeChange(Math.max(0, Math.min(duration, newTime)));
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 30,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      {/* Zoom controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pt: 1 }}>
        <IconButton
          size="small"
          onClick={() => setZoom((z) => Math.max(5, z / 1.25))}
          color="primary"
        >
          <ZoomOutIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          Zoom
        </Typography>
        <IconButton
          size="small"
          onClick={() => setZoom((z) => Math.min(400, z * 1.25))}
          color="primary"
        >
          <ZoomInIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {zoom.toFixed(0)} px/s
        </Typography>
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 'max-content', position: 'relative' }}>
          <TrackArea
            duration={duration}
            currentTime={currentTime}
            zoom={zoom}
            clips={clips}
          />
          <TimeMarkers
            duration={duration}
            currentTime={currentTime}
            zoom={zoom}
            onTimeChange={onTimeChange}
            onPlayheadDrag={handlePlayheadDrag}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Timeline; 