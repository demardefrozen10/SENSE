# 🧠 S.E.N.S.E - Spatial Environment Navigation & Safety Engine

> **CTRL+HACK+DEL 2.0 Hackathon Project**
> A real-time AI-powered wearable that helps visually impaired users navigate the world using spatial audio, haptic feedback, and computer vision.

## Architecture

```
Webcam (C270) ──────► Raspberry Pi 4 (Brain) ◄────── Arduino (Reflexes)
                          ├── Thread A: MJPEG Stream → /video_feed
                          ├── Thread B: Distance Trigger → Gemini 2.0 Flash
                          ├── ElevenLabs TTS → USB Audio Output (~75ms)
                          ├── PySerial (115200) ← HC-SR04 Sensor Data
                          └── WebSocket → React Dashboard (customizable)
```

## Quick Start

### 1. Clone & Branch
```bash
git clone https://github.com/demardefrozen10/CTRL-HACK-DEL.git
cd CTRL-HACK-DEL
git checkout main
```

### 2. Install Dependencies (On Raspberry Pi)
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Ensure pyserial and opencv-python are installed
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```
GEMINI_API_KEY=your_gemini_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
SERIAL_PORT=/dev/ttyACM0  # Raspberry Pi USB Port for Arduino
CAMERA_INDEX=0            # Default for USB Webcam
INFERENCE_INTERVAL_MS=5000 # Cooldown to prevent API spam
```

### 4. Run the Brain
```bash
python3 main.py
```

## Hardware
- **Raspberry Pi 4** — Central Processing Unit
- **Logitech C270 Webcam** — 720p vision system
- **Arduino Nano** — Dedicated low-latency sensor controller (The Spinal Cord)
- **HC-SR04** — Ultrasonic distance sensor for immediate obstacle detection
- **Active Buzzer** - Multi-modal feedback (Variable frequency pulses based on proximity)
- **Power Bank** - Portable Power USB-C (3A Output)

## System Logic
1. **Arduino:** Handles immediate safety. It measures distance and triggers the buzzer pulses. It operates independently of the Pi to ensure zero-latency feedback.
2. **Raspberry Pi:** Captures raw video frames and streams them via WebSockets to the React Dashboard. The Dashboard maintains a real-time, multimodal session with the Gemini Live API. The AI watches the video feed and provides conversational audio guidance (e.g., "There is a path clearing to your left") directly to the user.

## API Endpoints
| Endpoint | Method | Description |
|---|---|---|
| `/video_feed` | GET | MJPEG stream (Sighted Ally View) |
| `/dashboard` | GET | Neon-on-black accessibility dashboard |
| `/ws` | WS | Real-time detections broadcast |
| `/health` | GET | System health and sensor status |

## Team
**Big 3** — CTRL+HACK+DEL 2.0
