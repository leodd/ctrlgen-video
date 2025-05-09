import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

interface TimeMarkersProps {
  duration: number;
  currentTime: number;
  zoom: number; // pixels per second
  onTimeChange: (time: number) => void;
  isDragging: boolean;
  setIsDragging: (drag: boolean) => void;
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  duration,
  currentTime,
  zoom,
  onTimeChange,
  isDragging,
  setIsDragging,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dragPosition = e.clientX - rect.left;
      const newTime = dragPosition / zoom;
      onTimeChange(Math.max(0, Math.min(duration, newTime)));
    }
  }, [isDragging, zoom, duration, onTimeChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              mt: -4,
              display: 'block',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
            }}
          >
            {time}s
          </Typography>
        </Box>
      );
    }), [duration, markerInterval, zoom]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: 32,
        bgcolor: 'background.default',
        borderRadius: 1,
        width: timelineWidth,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
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