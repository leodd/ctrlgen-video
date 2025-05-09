import React, { useCallback, useRef, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { usePinch, useDrag } from '@use-gesture/react';
import TimeMarkers from './TimeMarkers';
import TrackArea from './TrackArea';
import { colors } from '../styles/colors';

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
    const containerRef = useRef<HTMLDivElement>(null);

    const bindPinch = usePinch(
        ({ movement: [scale], memo, last }) => {
            const initialZoom = memo ?? zoom;
            const newZoom = Math.max(5, Math.min(400, initialZoom * scale));
            onZoomChange(newZoom);
            return last ? undefined : initialZoom;
        },
        {
            rubberband: true,
            pointer: { touch: true },
            scaleBounds: { min: 0.1, max: 4 },
        }
    );

    const bindDrag = useDrag(
        ({ event, xy: [x, y], active }) => {
            event.preventDefault();
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Check if click is within scrollbar area (bottom 8px of the container)
                const isScrollbarClick = y > rect.bottom - 8;
                if (isScrollbarClick) {
                    return;
                }
                setIsDragging(active);
                const scrollLeft = containerRef.current.scrollLeft;
                const relativeX = x - rect.left + scrollLeft;
                const newTime = relativeX / zoom;
                onTimeChange(Math.max(0, Math.min(duration, newTime)));
            }
        },
        {
            pointer: { touch: true },
            filterTaps: true,
        }
    );

    const playheadPosition = currentTime * zoom;

    return (
        <Box
            ref={containerRef}
            {...bindPinch()}
            {...bindDrag()}
            sx={{
                overflowX: 'scroll',
                overflowY: 'hidden',
                bgcolor: colors.background.dark,
                touchAction: 'none',
                position: 'relative',
                '&::-webkit-scrollbar': {
                    height: '8px',
                    width: '0px',
                    backgroundColor: colors.background.dark,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: colors.neutral.darkest,
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: colors.neutral.dark,
                    },
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: colors.background.dark,
                },
            }}
        >
            <Box sx={{
                minWidth: 'max-content',
                position: 'relative',
            }}>
                <TrackArea
                    duration={duration}
                    zoom={zoom}
                    clips={clips}
                />
                <TimeMarkers
                    duration={duration}
                    zoom={zoom}
                />
                {/* Playhead */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 16,
                        width: 2,
                        bgcolor: colors.mint.main,
                        pointerEvents: 'none',
                        zIndex: 20,
                        transform: 'translateX(-50%)',
                        left: playheadPosition,
                    }}
                />
                {/* Playhead handle */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: 10,
                        height: 16,
                        border: '2px solid',
                        borderColor: colors.mint.main,
                        bgcolor: isDragging ? colors.mint.main : 'none',
                        pointerEvents: 'none',
                        borderRadius: '6px 6px 2px 2px',
                        transform: 'translateX(-50%)',
                        zIndex: 30,
                        bottom: 0,
                        left: playheadPosition,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                />
            </Box>
        </Box>
    );
};

export default React.memo(Timeline);