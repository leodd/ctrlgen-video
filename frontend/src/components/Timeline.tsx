import React, { useState, useCallback, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import TimeMarkers from './TimeMarkers';
import TrackArea from './TrackArea';

interface Clip {
    id: string;
    startTime: number;
    duration: number;
}

interface TimelineProps {
    duration: number;
    currentTime: number;
    clips: Clip[];
    onTimeChange: (time: number) => void;
    zoom: number;
    onZoomChange: (newZoom: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
    duration,
    currentTime,
    clips,
    onTimeChange,
    zoom,
    onZoomChange,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    // Store animation frame request ID and pending zoom value
    const zoomRafId = useRef<number | null>(null);
    const pendingZoom = useRef<number | null>(null);

    // const requestZoomUpdate = (newZoom: number) => {
    //     pendingZoom.current = newZoom;
    //     if (zoomRafId.current === null) {
    //         zoomRafId.current = requestAnimationFrame(() => {
    //             if (pendingZoom.current !== null) {
    //                 onZoomChange(pendingZoom.current);
    //                 pendingZoom.current = null;
    //             }
    //             zoomRafId.current = null;
    //         });
    //     }
    // };

    // const handleWheel = useCallback((e: React.WheelEvent) => {
    //     if (e.ctrlKey || e.metaKey) {
    //         e.preventDefault();
    //         const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
    //         const newZoom = Math.max(5, Math.min(400, zoom * zoomFactor));
    //         requestZoomUpdate(newZoom);
    //     }
    // }, [zoom]);

    const handlePlayheadDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const rect = e.currentTarget.getBoundingClientRect();
            const dragPosition = e.clientX - rect.left;
            const newTime = dragPosition / zoom;
            onTimeChange(Math.max(0, Math.min(duration, newTime)));
        }
    }, [isDragging, zoom, duration, onTimeChange]);

    return (
        <Box
            sx={{
                overflowX: 'auto',
                bgcolor: 'background.default',
            }}
            // onWheel={handleWheel}
        >
            <Box sx={{
                minWidth: 'max-content',
                position: 'relative',
            }}>
                <TrackArea
                    duration={duration}
                    currentTime={currentTime}
                    zoom={zoom}
                    clips={clips}
                />
                <TimeMarkers
                    duration={duration}
                    currentTime={currentTime}
                    zoom={zoom}
                    onTimeChange={onTimeChange}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                />
            </Box>
        </Box>
    );
};

export default Timeline;