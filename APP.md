# 🌱 TouchGrass

TouchGrass is a **mobile-first Android APK** built to encourage users to spend less time on screens and more time outside.

Users choose an activity and available time, receive a short outdoor mission, complete it in the real world, and optionally use the camera to verify their discovery with local AI.

Example:

```text
Choose: Nature
Time: 30 min
        ↓
Mission: "Find a real leaf"
        ↓
Go outside
        ↓
Take photo
        ↓
On-device AI → "Likely a leaf — 94%"
        ↓
Mission complete → +20 XP
```

The core experience works **offline**. No account, cloud AI API, or backend is required.

---

## Core

### 🎯 Mission System

Predefined missions selected based on:

- Activity: Walk / Nature / Exercise / Explore
- Available time: 30 min / 1 hour / 2 hours
- Difficulty
- XP reward

Normal application logic handles mission selection and progression.

### 📷 Real-World Verification

Some missions require a photo.

```text
Camera → Image → Local AI → Result → Mission verification
```

AI is used specifically for recognizing real-world objects such as:

- Leaf
- Flower
- Tree
- Rock
- Plant

### 🤖 On-Device AI

A small vision model runs directly on the Android device.

```text
Vue
 ↓
Capacitor Plugin
 ↓
Native Android
 ↓
AI Runtime
 ↓
Lightweight Vision Model
 ↓
Classification Result
```

No HTTP request or API key is required.

### ⭐ Progress

Local progress includes:

- XP
- Level
- Completed missions
- Outdoor time
- Discoveries

Stored locally on the device.

---

## Architecture

```text
                    TouchGrass APK
                         │
                  Vue 3 Application
                         │
                     Capacitor
                         │
          ┌──────────────┴──────────────┐
          │                             │
     App Logic                      Local AI
          │                             │
   Missions / XP                  Vision Model
   Progress / Storage             AI Runtime
          │                             │
          └──────────────┬──────────────┘
                         ↓
                   Android Device
```

### AI Flow

```text
Camera
  ↓
Image
  ↓
LocalVisionService
  ↓
Capacitor Native Plugin
  ↓
Android AI Runtime
  ↓
Vision Model
  ↓
Object + Confidence
  ↓
Mission Verification
```

---

## Stack

| Area       | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Vue 3                               |
| Language   | TypeScript                          |
| Build      | Vite                                |
| Routing    | Vue Router                          |
| State      | Pinia                               |
| Styling    | UNO CSS                             |
| Mobile     | Capacitor                           |
| Camera     | Capacitor Camera                    |
| Storage    | localStorage / IndexedDB            |
| AI         | Lightweight on-device vision model  |
| AI Runtime | Mobile runtime such as ONNX Runtime |
| Native AI  | Capacitor Android plugin            |

---

## Project Principle

**Use technology to get people away from technology.**

The phone provides the mission and verifies the real-world activity, then the user puts the phone away and goes outside.
