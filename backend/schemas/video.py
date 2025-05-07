"""Video processing schemas for the CtrlGen Video API."""

from enum import Enum
from typing import List, Optional, Union
from pydantic import BaseModel, Field


class ResourceType(str, Enum):
    """Types of resources that can be used in video rendering."""
    VIDEO = "video"
    IMAGE = "image"
    AUDIO = "audio"
    TEXT = "text"


class Resource(BaseModel):
    """A resource that can be used in video rendering."""
    id: str = Field(..., description="Unique identifier for the resource")
    type: ResourceType = Field(..., description="Type of the resource")
    path: str = Field(..., description="Path to the resource file")
    start_time: Optional[float] = Field(None, description="Start time in seconds for this resource")
    duration: Optional[float] = Field(None, description="Duration in seconds for this resource")
    position: Optional[tuple[int, int]] = Field(None, description="Position (x, y) for this resource")
    size: Optional[tuple[int, int]] = Field(None, description="Size (width, height) for this resource")
    opacity: Optional[float] = Field(1.0, description="Opacity of the resource (0.0 to 1.0)")
    z_index: Optional[int] = Field(0, description="Layer order of the resource (higher numbers are on top)")


class EffectType(str, Enum):
    """Types of effects that can be applied to resources."""
    FADE_IN = "fade_in"
    FADE_OUT = "fade_out"
    SCALE = "scale"
    ROTATE = "rotate"
    BLUR = "blur"
    BRIGHTNESS = "brightness"
    CONTRAST = "contrast"
    SATURATION = "saturation"
    CROP = "crop"
    SPEED = "speed"


class Effect(BaseModel):
    """An effect to be applied to a resource."""
    type: EffectType = Field(..., description="Type of effect to apply")
    resource_id: str = Field(..., description="ID of the resource to apply the effect to")
    start_time: float = Field(..., description="Start time of the effect in seconds")
    duration: float = Field(..., description="Duration of the effect in seconds")
    parameters: dict = Field(default_factory=dict, description="Effect-specific parameters")


class TransitionType(str, Enum):
    """Types of transitions between resources."""
    CUT = "cut"
    FADE = "fade"
    DISSOLVE = "dissolve"
    WIPE = "wipe"
    SLIDE = "slide"


class Transition(BaseModel):
    """A transition between resources."""
    type: TransitionType = Field(..., description="Type of transition")
    from_resource_id: str = Field(..., description="ID of the resource to transition from")
    to_resource_id: str = Field(..., description="ID of the resource to transition to")
    start_time: float = Field(..., description="Start time of the transition in seconds")
    duration: float = Field(..., description="Duration of the transition in seconds")
    parameters: dict = Field(default_factory=dict, description="Transition-specific parameters")


class RenderVideoRequest(BaseModel):
    """Request model for video rendering."""
    resources: List[Resource] = Field(..., description="List of resources to use in the video")
    effects: List[Effect] = Field(default_factory=list, description="List of effects to apply")
    transitions: List[Transition] = Field(default_factory=list, description="List of transitions between resources")
    output_path: str = Field(..., description="Path where the rendered video will be saved")
    width: int = Field(1920, description="Output video width")
    height: int = Field(1080, description="Output video height")
    fps: float = Field(30.0, description="Output video frame rate")
    duration: Optional[float] = Field(None, description="Total duration of the output video")


class RenderVideoResponse(BaseModel):
    """Response model for video rendering."""
    success: bool
    message: str
    output_path: Optional[str] = None
    duration: Optional[float] = None
    size: Optional[tuple[int, int]] = None
    error: Optional[str] = None


class ProcessVideoRequest(BaseModel):
    """Request model for video processing."""
    input_path: str
    output_path: str


class ProcessVideoResponse(BaseModel):
    """Response model for video processing."""
    success: bool
    message: str


class RescaleVideoRequest(BaseModel):
    """Request model for video rescaling."""
    input_path: str
    output_path: str
    width: int
    height: int


class RescaleVideoResponse(BaseModel):
    """Response model for video rescaling."""
    success: bool
    message: str
    new_dimensions: tuple[int, int] | None = None
