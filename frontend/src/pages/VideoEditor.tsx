import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import VideoPlayer from '../components/VideoPlayer';
import Timeline from '../components/Timeline';
import ZoomControls from '../components/ZoomControls';

const VideoEditor: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [zoom, setZoom] = useState(40);
  const [clips, setClips] = useState([
    {
      id: '1',
      startTime: 2,
      duration: 5,
    },
    {
      id: '2',
      startTime: 8,
      duration: 3,
    },
  ]);

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 3,
        pb: 40,
      }}
    >
      <Box sx={{ maxWidth: '7xl', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Video Editor
        </Typography>
        
        {/* Video Player */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <VideoPlayer
            videoUrl="https://example.com/sample-video.mp4"
          />
        </Paper>

        {/* Tools Panel */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            Tools
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Add Clip
            </Button>
            <Button variant="contained" color="primary">
              Split Clip
            </Button>
            <Button variant="contained" color="primary">
              Delete Clip
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* Fixed Bottom Controls */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 30,
        }}
      >
        {/* Timeline */}
        <Timeline
          duration={duration || 30}
          currentTime={currentTime}
          clips={clips}
          onTimeChange={handleTimeChange}
          zoom={zoom}
          onZoomChange={handleZoomChange}
        />
        {/* Zoom Controls */}
        <Paper
          elevation={8}
          sx={{
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <ZoomControls zoom={zoom} onZoomChange={handleZoomChange} />
        </Paper>
      </Box>
    </Box>
  );
};

export default VideoEditor; 