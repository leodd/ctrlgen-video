import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { colors } from '../styles/colors';

interface TimeMarkersProps {
  duration: number;
  zoom: number; // pixels per second
  fps?: number; // frames per second, default to 30
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  duration,
  zoom,
  fps = 30,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get device pixel ratio
    const dpr = window.devicePixelRatio || 1;

    // Set canvas dimensions accounting for device pixel ratio
    const timelineWidth = duration * zoom;
    canvas.width = timelineWidth * dpr;
    canvas.height = 18 * dpr;

    // Scale the context to account for device pixel ratio
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Set styles
    ctx.strokeStyle = colors.neutral.darkest;
    ctx.fillStyle = colors.text.secondary;
    ctx.font = '600 10px "Helvetica", "JetBrains Mono", "Roboto Mono", monospace';
    ctx.textBaseline = 'top';

    // Calculate marker interval
    const markerInterval = zoom < 10 ? 10 : zoom < 30 ? 5 : 1;
    const numMarkers = Math.ceil(duration / markerInterval) + 1;

    // Calculate frame marker density based on zoom
    const frameMarkerDensity = (() => {
      const pixelsPerFrame = zoom / fps;
      if (pixelsPerFrame < 2) return 0; // Don't show frame markers when zoomed out
      if (pixelsPerFrame < 4) return 12; // Show every 12th frame
      if (pixelsPerFrame < 8) return 6; // Show every 6th frame
      if (pixelsPerFrame < 16) return 3; // Show every 3rd frame
      return 1; // Show every frame when zoomed in close
    })();

    // Draw markers and labels
    for (let i = 0; i < numMarkers; i++) {
      const time = i * markerInterval;
      const x = time * zoom;

      // Draw frame markers between time markers
      if (frameMarkerDensity > 0) {
        const framesInInterval = markerInterval * fps;
        const frameStep = frameMarkerDensity;
        
        for (let frame = 0; frame < framesInInterval; frame += frameStep) {
          const frameTime = time + frame / fps;
          const frameX = frameTime * zoom;
          
          // Skip if we're at the next time marker
          if (frameX >= (time + markerInterval) * zoom) break;
          
          // Draw shorter line for frame marker
          ctx.beginPath();
          ctx.moveTo(frameX, 0);
          ctx.lineTo(frameX, (canvas.height / dpr) / 2);
          ctx.strokeStyle = colors.neutral.darkest;
          ctx.stroke();
        }
      }

      // Draw vertical line
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / dpr);
      ctx.strokeStyle = colors.text.secondary;
      ctx.stroke();

      // Draw time label
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const timeLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      ctx.fillText(timeLabel, x + 4, 4);
    }
  }, [duration, zoom, theme.palette.divider, theme.palette.text.secondary, fps]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 18,
        bgcolor: colors.background.dark,
        width: duration * zoom,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default TimeMarkers; 