import React, { useState, useCallback } from 'react';
import { Box, IconButton, Typography, Paper, Slider } from '@mui/material';
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

  const updateZoom = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const handlePlayheadDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dragPosition = e.clientX - rect.left;
      const newTime = dragPosition / zoom;
      onTimeChange(Math.max(0, Math.min(duration, newTime)));
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only handle zoom when Ctrl/Cmd key is pressed
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
      updateZoom(Math.max(5, Math.min(400, zoom * zoomFactor)));
    }
  };

  const handleZoomChange = (_event: Event, newValue: number | number[]) => {
    updateZoom(newValue as number);
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
          onClick={() => updateZoom(Math.max(5, zoom / 1.1))}
          color="primary"
        >
          <ZoomOutIcon />
        </IconButton>
        <Box sx={{ width: 200, mx: 2 }}>
          <Slider
            value={zoom}
            onChange={handleZoomChange}
            min={5}
            max={400}
            step={1}
            aria-label="Zoom level"
            size="small"
          />
        </Box>
        <IconButton
          size="small"
          onClick={() => updateZoom(Math.min(400, zoom * 1.1))}
          color="primary"
        >
          <ZoomInIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {zoom} px/s
        </Typography>
      </Box>
      <Box 
        sx={{ 
          overflowX: 'auto',
        }}
        onWheel={handleWheel}
      >
        <Box sx={{ 
          minWidth: 'max-content', 
          position: 'relative',
        }}>
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