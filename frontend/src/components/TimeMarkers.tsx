import React, { useCallback, useMemo } from 'react';
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
  // Memoize calculations
  const { timelineWidth, playheadPosition, markerInterval } = useMemo(() => ({
    timelineWidth: duration * zoom,
    playheadPosition: currentTime * zoom,
    markerInterval: zoom < 10 ? 10 : zoom < 30 ? 5 : 1
  }), [duration, zoom, currentTime]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = clickPosition / zoom;
    onTimeChange(Math.max(0, Math.min(duration, newTime)));
  }, [zoom, duration, onTimeChange]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  // Memoize markers array
  const markers = useMemo(() => 
    Array.from({ length: Math.ceil(duration / markerInterval) + 1 }).map((_, i) => {
      const time = i * markerInterval;
      return (
        <Box
          key={time}
          sx={{
            position: 'absolute',
            height: '100%',
            borderLeft: 1,
            borderColor: 'divider',
            left: time * zoom,
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
    }), [duration, markerInterval, zoom]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 32,
        bgcolor: 'background.default',
        borderRadius: 1,
        width: timelineWidth,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={onPlayheadDrag}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {markers}
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