import React, { useEffect, useRef } from 'react';
import { Box, useTheme, SxProps, Theme } from '@mui/material';
import { colors } from '../styles/colors';

interface TimeMarkersProps {
  duration: number;
  zoom: number; // pixels per second
  fps?: number; // frames per second, default to 30
  sx?: SxProps<Theme>;
  onClick?: (event: React.MouseEvent) => void;
}

const TimeMarkers: React.FC<TimeMarkersProps> = ({
  duration,
  zoom,
  fps = 30,
  sx,
  onClick,
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

    // Calculate marker interval based on zoom
    const getTimeMarkerInterval = (pixelsPerSecond: number): number => {
      const intervalThresholds = [
        { threshold: 10, interval: 10 },  // Every 10 seconds when very zoomed out
        { threshold: 30, interval: 5 },   // Every 5 seconds when zoomed out
        { threshold: 60, interval: 2 },   // Every 2 seconds when moderately zoomed
        { threshold: 120, interval: 1 },  // Every second when zoomed in
        { threshold: Infinity, interval: 0.5 } // Every half second when very zoomed in
      ];

      return intervalThresholds.find(t => pixelsPerSecond < t.threshold)?.interval ?? 0.5;
    };

    const markerInterval = getTimeMarkerInterval(zoom);
    const numMarkers = Math.ceil(duration / markerInterval) + 1;

    // Calculate frame marker density based on zoom
    const getFrameMarkerDensity = (pixelsPerSecond: number): number => {
      const densityThresholds = [
        { threshold: 2, density: 0 },    // Don't show frame markers when zoomed out
        { threshold: 4, density: 12 },   // Show every 12th frame
        { threshold: 8, density: 6 },    // Show every 6th frame
        { threshold: 16, density: 3 },   // Show every 3rd frame
        { threshold: Infinity, density: 1 } // Show every frame when zoomed in close
      ];

      const pixelsPerFrame = pixelsPerSecond / fps;
      return densityThresholds.find(t => pixelsPerFrame < t.threshold)?.density ?? 1;
    };

    const frameMarkerDensity = getFrameMarkerDensity(zoom);

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

      if (time % 1 === 0) {
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
    }
  }, [duration, zoom, theme.palette.divider, theme.palette.text.secondary, fps]);

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        height: 18,
        bgcolor: colors.background.dark,
        width: duration * zoom,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        ...sx
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