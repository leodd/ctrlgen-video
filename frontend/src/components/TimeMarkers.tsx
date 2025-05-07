import React from 'react';
import { Box, Typography } from '@mui/material';

interface TimeMarkersProps {
  duration: number;
  currentTime: number;
  zoom: number; // pixels per second
  onTimeChange: (time: number) => void;
  onPlayheadDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  setIsDragging: (drag: boolean) => void;
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  duration,
  currentTime,
  zoom,
  onTimeChange,
  onPlayheadDrag,
  isDragging,
  setIsDragging,
}) => {
  const timelineWidth = duration * zoom;
  const playheadPosition = currentTime * zoom;

  // Marker interval: more markers when zoomed in, fewer when zoomed out
  let markerInterval = 1;
  if (zoom < 30) markerInterval = 5;
  if (zoom < 10) markerInterval = 10;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = clickPosition / zoom;
    onTimeChange(Math.max(0, Math.min(duration, newTime)));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: 32,
        bgcolor: 'background.default',
        borderRadius: 1,
        width: timelineWidth,
      }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={onPlayheadDrag}
      onMouseLeave={() => setIsDragging(false)}
      onClick={handleClick}
    >
      {/* Time markers */}
      {Array.from({ length: Math.ceil(duration / markerInterval) + 1 }).map((_, i) => {
        const time = i * markerInterval;
        return (
          <Box
            key={time}
            sx={{
              position: 'absolute',
              height: '100%',
              borderLeft: 1,
              borderColor: 'divider',
              left: `${time * zoom}px`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mt: -4,
                display: 'block',
                whiteSpace: 'nowrap',
              }}
            >
              {time}s
            </Typography>
          </Box>
        );
      })}
      {/* Playhead dot */}
      <Box
        sx={{
          position: 'absolute',
          top: -4,
          width: 12,
          height: 12,
          bgcolor: 'error.main',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          zIndex: 20,
          left: playheadPosition,
        }}
      />
    </Box>
  );
};

export default TimeMarkers; 