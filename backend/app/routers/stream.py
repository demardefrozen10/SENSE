"""Video streaming API endpoints."""
from __future__ import annotations

import time

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse

from ..services import frame_buffer, ws_manager

router = APIRouter(prefix="/stream", tags=["stream"])


def mjpeg_generator():
    """Yield JPEG frames at ~30 FPS as multipart stream."""
    interval = 1.0 / 30.0
    waited_once = False
    
    while True:
        jpg_bytes = frame_buffer.get_jpeg(quality=80)
        if jpg_bytes is not None:
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + jpg_bytes + b"\r\n"
            )
            waited_once = False
        else:
            # Wait a bit longer if no frame yet
            if not waited_once:
                print("[Stream] Waiting for first frame...")
                waited_once = True
            time.sleep(0.1)
            continue
        time.sleep(interval)


@router.get("/video")
def video_feed():
    """MJPEG video stream endpoint."""
    return StreamingResponse(
        mjpeg_generator(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )


@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    """WebSocket endpoint for real-time analysis updates."""
    await ws_manager.connect(ws)
    try:
        while True:
            # Keep connection alive
            await ws.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(ws)
