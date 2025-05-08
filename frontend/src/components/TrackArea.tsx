import React from 'react';
import { Box } from '@mui/material';

interface Clip {
  id: string;
  startTime: number;
  duration: number;
}

interface TrackAreaProps {
  duration: number;
  currentTime: number;
  zoom: number;
  clips: Clip[];
}

const TrackArea: React.FC<TrackAreaProps> = ({
  duration,
  currentTime,
  zoom,
  clips,
}) => {
  const timelineWidth = duration * zoom;
  const playheadPosition = currentTime * zoom;

  return (
    <Box sx={{ 
      position: 'relative', 
      height: 64, 
      width: timelineWidth
    }}>
      {/* Playhead bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: 'error.main',
          pointerEvents: 'none',
          zIndex: 10,
          transform: 'translateX(-50%)',
          left: playheadPosition
        }}
      />
      {/* Track */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'background.default',
          borderRadius: 1,
        }}
      >
        {/* Clips */}
        {clips.map((clip) => (
          <Box
            key={clip.id}
            sx={{
              position: 'absolute',
              height: 48,
              top: 8,
              bgcolor: 'primary.main',
              borderRadius: 1,
              cursor: 'pointer',
              left: clip.startTime * zoom,
              width: clip.duration * zoom,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TrackArea; 