import React from 'react';
import { Box } from '@mui/material';
import { colors } from '../styles/colors';

interface Clip {
  id: string;
  startTime: number;
  duration: number;
}

interface TrackAreaProps {
  duration: number;
  zoom: number;
  clips: Clip[];
}

const TrackArea: React.FC<TrackAreaProps> = ({
  duration,
  zoom,
  clips,
}) => {
  const timelineWidth = duration * zoom;

  return (
    <Box sx={{ 
      position: 'relative', 
      height: 64, 
      width: timelineWidth
    }}>
      {/* Track */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: colors.background.dark,
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
              bgcolor: colors.primary.main,
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

export default React.memo(TrackArea); 