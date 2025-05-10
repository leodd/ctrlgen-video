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

    const handleTimeMarkersClick = (event: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollLeft = containerRef.current.scrollLeft;
        const x = event.clientX;
        const relativeX = x - rect.left + scrollLeft;
        const newTime = relativeX / zoom;
        onTimeChange(Math.max(0, Math.min(duration, newTime)));
    };

    const bindDrag = useDrag(
        ({ event, movement: [mx], first, active, memo = null, xy: [x, y], last }) => {
            event.preventDefault();
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const scrollLeft = containerRef.current.scrollLeft;

            if (first) {
                const isPlayheadClick = Math.abs(x - (playheadPosition + rect.left - scrollLeft)) < 10; // 10px threshold for playhead
                const mode = isPlayheadClick ? 'playhead' : 'scroll';
                return { mode, startX: x, initialScroll: scrollLeft };
            }

            if (!memo) return;
            const { mode, startX, initialScroll } = memo;

            if (mode === 'playhead') {
                setIsDragging(active);
                const relativeX = x - rect.left + scrollLeft;
                const newTime = relativeX / zoom;
                onTimeChange(Math.max(0, Math.min(duration, newTime)));
            } else if (mode === 'scroll') {
                containerRef.current.scrollLeft = initialScroll - (x - startX);
            }

            return memo;
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
                overflowX: 'auto',
                overflowY: 'hidden',
                bgcolor: colors.background.dark,
                touchAction: 'none',
                position: 'relative',
                scrollbarWidth: 'none',  /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
                '&::-webkit-scrollbar': {  /* Chrome, Safari and Opera */
                    display: 'none'
                }
            }}
        >
            <Box sx={{
                position: 'relative',
            }}>
                <TrackArea
                    duration={duration}
                    zoom={zoom}
                    clips={clips}
                    sx={{
                        cursor: 'grab',
                        '&:active': {
                            cursor: 'grabbing'
                        }
                    }}
                />
                <TimeMarkers
                    duration={duration}
                    zoom={zoom}
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={handleTimeMarkersClick}
                />
                {/* Playhead */}
                <Box
                    data-playhead
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 16,
                        width: 2,
                        bgcolor: colors.mint.main,
                        zIndex: 20,
                        transform: 'translateX(-50%)',
                        left: playheadPosition,
                        cursor: 'ew-resize',
                    }}
                />
                {/* Playhead handle */}
                <Box
                    data-playhead
                    sx={{
                        position: 'absolute',
                        width: 10,
                        height: 16,
                        border: '2px solid',
                        borderColor: colors.mint.main,
                        bgcolor: isDragging ? colors.mint.main : 'none',
                        borderRadius: '6px 6px 2px 2px',
                        transform: 'translateX(-50%)',
                        zIndex: 30,
                        bottom: 0,
                        left: playheadPosition,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        cursor: 'ew-resize',
                    }}
                />
            </Box>
        </Box>
    );
};

export default React.memo(Timeline);