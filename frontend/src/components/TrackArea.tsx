import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
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
  sx?: SxProps<Theme>;
  onClipClick?: (clipId: string) => void;
  selectedClipId?: string;
}

const TrackArea: React.FC<TrackAreaProps> = ({
  duration,
  zoom,
  clips,
  sx,
  onClipClick,
  selectedClipId,
}) => {
  const timelineWidth = duration * zoom;

  return (
    <Box sx={{ 
      position: 'relative', 
      height: 64, 
      width: timelineWidth,
      ...sx
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
            onClick={(e) => {
              e.stopPropagation();
              onClipClick?.(clip.id);
            }}
            sx={{
              position: 'absolute',
              height: 48,
              top: 8,
              bgcolor: selectedClipId === clip.id ? colors.primary.light : colors.primary.main,
              borderRadius: 1,
              cursor: 'pointer',
              left: clip.startTime * zoom,
              width: clip.duration * zoom,
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: colors.primary.light,
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(TrackArea); 