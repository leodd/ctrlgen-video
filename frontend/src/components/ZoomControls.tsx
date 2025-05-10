import React from 'react';
import { Box, IconButton, Typography, Slider } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (newZoom: number) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoomChange }) => {
  const handleZoomChange = (_event: Event, newValue: number | number[]) => {
    onZoomChange(newValue as number);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pt: 1 }}>
      <IconButton
        size="small"
        onClick={() => onZoomChange(Math.max(5, zoom / 1.1))}
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
        onClick={() => onZoomChange(Math.min(400, zoom * 1.1))}
        color="primary"
      >
        <ZoomInIcon />
      </IconButton>
      <Typography variant="caption" color="text.secondary">
        {zoom.toFixed(0)} px/s
      </Typography>
    </Box>
  );
};

export default ZoomControls; 