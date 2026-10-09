# TouchGrass — Application Core

## 1. Overview

TouchGrass is a mobile-first outdoor exploration app built with Vue 3 and Capacitor. It encourages users to spend less time on their phones through short, achievable outdoor missions.

Users choose an activity and available time, complete a real-world mission, and optionally use the camera and local AI to classify their discoveries.

**Core principle:** Use technology to get people away from technology.

## 2. Core Flow

```text
Choose Activity + Available Time
              ↓
       Select a Mission
              ↓
          Go Outside
              ↓
       Complete Mission
              ↓
    Photo + Local AI (optional)
              ↓
      Verify and Earn XP
              ↓
       Update Progress
```

## 3. Activities and Missions

| Activity | Purpose                               |
| -------- | ------------------------------------- |
| Walk     | Walk and notice the surroundings      |
| Nature   | Discover plants and natural objects   |
| Explore  | Discover unfamiliar places and things |

Available durations: **30 minutes, 1 hour, or 2 hours**.

Missions are predefined and selected by application logic based on activity, duration, and difficulty. AI is not needed to generate missions.

## 4. Camera and Local AI

Some missions require a photo; others do not.

```text
Camera Preview → Capture Image → LocalVisionService
    → TensorFlow.js → MobileNet → Label + Confidence
    → Mission Verification
```

TensorFlow.js runs inside the application's WebView using a supported WebGL or WASM backend. Model and runtime assets must be available locally for offline inference.

```ts
interface ClassificationResult {
  label: string
  confidence: number
}
```

Mission rules evaluate predictions against expected recognition targets. Classification is supporting evidence, not guaranteed proof of completion. MobileNet may require label mapping or fine-tuning for specific mission categories.

Photos and predictions remain on-device unless the user explicitly chooses otherwise.

## 5. Progress and Persistence

Store progress locally using `localStorage` for simple data or IndexedDB for larger records.

Track:

- Total XP and level
- Completed missions and mission history
- Outdoor time
- Nature discoveries

Progress and rewards are managed by application logic, not AI.

## 6. Architecture

```text
Vue 3 + TypeScript
├── Presentation: Pages, UI Components, SVGs
├── Application Logic: Missions, Verification, XP
├── Services: Camera, Local AI, Persistence
├── State: Pinia Stores
└── Device Runtime: Capacitor + Android
    └── WebView: TensorFlow.js + MobileNet
```

## 7. Target Project Structure

_This is the intended structure, not a claim that every file already exists._

```text
touch-grass/
├── public/
│   ├── assets/icons/
│   └── models/mobilenet/
├── src/
│   ├── assets/css/
│   ├── components/
│   │   ├── ui/
│   │   ├── camera/
│   │   └── mission/
│   ├── composables/
│   ├── constants/
│   ├── data/missions.ts
│   ├── pages/
│   ├── router/
│   ├── services/
│   │   ├── camera.ts
│   │   ├── localVision.ts
│   │   └── storage.ts
│   ├── stores/
│   ├── types/
│   ├── App.vue
│   └── main.ts
├── android/
├── capacitor.config.ts
├── index.html
├── vite.config.ts
├── uno.config.ts
├── package.json
└── APP.md
```

| Directory        | Responsibility                              |
| ---------------- | ------------------------------------------- |
| `components/`    | Reusable UI, camera, and mission components |
| `composables/`   | Reusable Vue behavior                       |
| `data/`          | Predefined mission definitions              |
| `pages/`         | Route-level screens                         |
| `services/`      | Camera, inference, and storage operations   |
| `stores/`        | Shared mission and progress state           |
| `types/`         | Domain and TypeScript interfaces            |
| `public/models/` | Locally bundled AI model assets             |

Reconcile this target with the existing files before moving or renaming anything.

## 8. Technology Stack

- **UI:** Vue 3, TypeScript, UnoCSS
- **Build and routing:** Vite, Vue Router
- **State:** Pinia
- **Android:** Capacitor
- **Camera:** Capacitor Community Camera Preview
- **Local AI:** TensorFlow.js + MobileNet
- **Persistence:** localStorage / IndexedDB

## 9. Guiding Principle

TouchGrass should make outdoor activities easier to start, not give users another reason to stay on their phones. It provides a mission, supports discovery, records progress, and then gets out of the way.
