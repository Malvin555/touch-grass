# TouchGrass — Application Core

## 1. Overview

TouchGrass is a mobile outdoor exploration app built with Vue 3, Vite, Pinia, UnoCSS, and Capacitor. It encourages users to spend less time on their phones through short, achievable outdoor missions.

Users choose an activity and available time, complete a real-world mission, and record their discoveries. Selected activities use the camera and on-device AI image labeling to help verify discoveries.

**Core principle:** Use technology to get people away from technology.

## 2. Core Flow

```text
First Launch
     ↓
  Onboarding
     ↓
     Home
     ↓
Choose Activity + Available Time
     ↓
 Select a Mission
     ↓
   Go Outside
     ↓
Complete the Activity
     ↓
Capture Photo (when required)
     ↓
Native AI Image Labeling (Nature)
     ↓
Mission Verification
     ↓
Update Progress and Save Memories
     ↓
    Journal
```

The flow varies by activity. Nature uses AI-assisted photo verification, Explore saves captured discoveries, and Walk follows its own mission completion logic.

## 3. Activities and Missions

| Activity | Purpose                                           | Main Flow                                        |
| -------- | ------------------------------------------------- | ------------------------------------------------ |
| Walk     | Walk and notice the surroundings                  | Complete the selected walking mission            |
| Nature   | Discover plants and natural objects               | Capture a photo and use AI-assisted verification |
| Explore  | Discover unfamiliar places and interesting things | Capture and save an Explore discovery            |

Available durations: **30 minutes, 1 hour, or 2 hours**.

Missions are predefined and selected by application logic based on activity, duration, and difficulty. AI is not required to generate missions.

Mission rules, completion decisions, and reward calculations are controlled by the application rather than the image-labeling model.

## 4. Camera and Native AI

Some missions require a photo; others do not.

TouchGrass uses a camera composable for camera capture and a dedicated image-compression service to resize captured photos before processing or saving them.

### Image capture flow

```text
Camera Preview
     ↓
Capture Photo
     ↓
Image Compression
     ↓
Activity-Specific Handling
     ├── Nature → Native AI Verification
     └── Explore → Save Discovery
```

### Native image-labeling pipeline

```text
Captured Photo
     ↓
LocalVisionService
     ↓
Capacitor ML Kit Image Labeling
     ↓
Native ML Kit Runtime
     ↓
Labels + Confidence Scores
     ↓
Mission Verification Rules
     ↓
Accept or Reject Photo
```

The implementation uses:

- `@capacitor-mlkit/image-labeling` for native image labeling.
- `@capacitor/filesystem` to prepare captured images as local files.
- Capacitor platform detection to restrict AI image labeling to the native app.

The service rejects browser-only execution because the current AI integration requires a native platform.

### Photo preparation

Captured images may be provided as base64 data URLs. The service removes the data URL prefix, writes the image to the device's cache directory, and passes the resulting local file URI to the native image-labeling plugin.

Blob URLs and HTTP URLs are rejected because the current implementation expects a local device image file.

### Classification result

The image-labeling service returns the highest-confidence label, its confidence score, and the complete sorted label list.

```ts
interface ClassificationLabel {
  text: string
  confidence: number
}

interface ClassificationResult {
  label: string
  confidence: number
  labels: ClassificationLabel[]
}
```

The service requests labels with a confidence threshold of zero and sorts the results in descending confidence order. Mission verification applies its own rules to determine whether a prediction is relevant.

AI image labeling is supporting evidence, not guaranteed proof of mission completion. General image labels cannot reliably establish every mission requirement, such as the number of distinct objects in a photo.

**Platform limitation:** The current AI service requires the native Capacitor app. Browser-based preview does not provide the same AI functionality. Offline behavior must be validated on the packaged Android app and its installed ML Kit runtime.

## 5. Image Compression

The image-compression service uses the browser Canvas API to resize and encode photos.

Current settings:

| Setting                 | Value             |
| ----------------------- | ----------------- |
| Maximum image dimension | 1024 pixels       |
| Output format           | JPEG              |
| JPEG quality            | 0.7               |
| Encoding                | `canvas.toBlob()` |
| Returned representation | Base64 data URL   |

The image is resized proportionally without enlarging smaller images.

Compression is intended to reduce image size and memory usage, especially on low-end Android devices. Actual processing time depends on the device and the original photo dimensions.

The current capture flow waits for compression to finish before continuing to verification or saving an Explore discovery.

A possible future optimization is to store photos as device files and retain their paths instead of keeping large base64 strings in application state.

## 6. Mission Verification and Outcomes

Mission verification is handled by application logic using activity state and, where applicable, AI classification results.

The Nature verification flow distinguishes between:

- **Successful verification:** Save the discovery, award the appropriate progress, and continue to the Journal.
- **Invalid photo:** Allow another attempt within the configured attempt limit.
- **Permanent failure:** End the mission without saving a successful completion or awarding its completion points.
- **Technical error:** Allow recovery without treating an inference or processing error as an invalid photo.

The AI service only returns classification results. It does not independently award points or decide every aspect of mission completion.

Explore has a separate flow that saves a captured photo as an Explore memory and marks the activity complete. Walk uses its own mission completion logic.

## 7. Progress and Persistence

Pinia manages shared state for onboarding, activities, and user progress.

The application stores and displays progress such as:

- Total points
- Streak information
- Completed days
- Saved discovery memories
- Activity-specific mission state

The Progress store manages progress and memory records, while the Nature and Explore stores maintain activity-specific state.

Onboarding completion is persisted through `localStorage`, allowing returning users to skip the introductory flow.

Progress and memories should persist across app restarts using the storage mechanisms implemented by the stores. `localStorage` is suitable for small metadata records; IndexedDB or filesystem-backed storage is more suitable for larger photo collections.

The current camera and Explore flow uses compressed base64 photo data. The native AI service temporarily writes base64 photos to the device cache when preparing them for image labeling.

Progress and rewards are managed by application logic, not AI.

## 8. Sound Effects

TouchGrass includes a reusable `useSound()` composable for mission feedback.

Expected assets:

```text
public/
└── assets/
    └── sounds/
        ├── mission-success.mp3
        └── mission-failed.mp3
```

The composable exposes `playSound()` to play success or failure sounds.

Sounds should be triggered when an activity's result is finalized:

- **Success:** Play when the activity successfully completes.
- **Failure:** Play when the mission reaches its permanent failed state.

The Journal should not replay sounds merely because it opens. Each activity should trigger its sound from its actual completion or failure handler to avoid duplicate or missed playback.

## 9. Journal and Memories

The Journal summarizes the user's progress and saved discoveries.

It displays:

- Points
- Streak information
- Completed-day indicators
- Recent discovery memories
- Navigation to the full memories collection
- A shortcut to find another adventure

Successful discoveries are saved through the Progress store and displayed in the Journal.

Failed missions should not create successful completion records or award completion points. Previous memories remain available even if a later mission fails.

The Journal is a presentation layer. It displays store state instead of independently deciding whether a mission succeeded.

## 10. Architecture

```text
Vue 3 + Vite + UnoCSS
├── Presentation
│   ├── Pages
│   ├── UI Components
│   └── SVG Components
├── Application Logic
│   ├── Mission Selection
│   ├── Mission Completion
│   ├── Verification Rules
│   └── Reward Calculation
├── Composables
│   ├── Camera
│   ├── Navigation
│   └── Sound Effects
├── Services
│   ├── Camera Integration
│   ├── Image Compression
│   ├── Local Vision
│   └── Persistence
├── Pinia Stores
│   ├── Onboarding
│   ├── Nature
│   ├── Explore
│   └── Progress
└── Device Runtime
    └── Capacitor + Android
        └── Native ML Kit Image Labeling
```

The app uses a client-side architecture. A backend is not required for the core mission, camera, local image-labeling, or progress flows.

## 11. Target Project Structure

This is a conceptual structure, not a claim that every listed file exists. Reconcile it with the current repository before moving or renaming anything.

```text
touch-grass/
├── public/
│   └── assets/
│       ├── icons/
│       └── sounds/
├── src/
│   ├── assets/
│   │   └── css/
│   ├── components/
│   │   ├── ui/
│   │   ├── camera/
│   │   ├── mission/
│   │   └── svg/
│   ├── composables/
│   ├── constants/
│   ├── data/
│   ├── pages/
│   ├── router/
│   ├── services/
│   │   ├── imageCompression.js
│   │   ├── localVision.js
│   │   └── storage.js
│   ├── stores/
│   │   ├── onboarding.js
│   │   ├── nature.js
│   │   ├── explore.js
│   │   └── progress.js
│   ├── utils/
│   ├── App.vue
│   └── main.js
├── android/
├── capacitor.config.*
├── index.html
├── vite.config.*
├── uno.config.*
├── package.json
└── APP.md
```

| Directory        | Responsibility                                    |
| ---------------- | ------------------------------------------------- |
| `components/`    | Reusable UI, camera, mission, and SVG components  |
| `composables/`   | Reusable Vue behavior                             |
| `data/`          | Predefined mission definitions                    |
| `pages/`         | Route-level screens                               |
| `router/`        | Route definitions and navigation guards           |
| `services/`      | Camera, image compression, native AI, and storage |
| `stores/`        | Onboarding, activity state, and progress          |
| `utils/`         | Shared utilities such as date formatting          |
| `public/assets/` | Static icons, sounds, and other public assets     |

## 12. Technology Stack

- **UI:** Vue 3, UnoCSS
- **Build:** Vite
- **Routing:** Vue Router
- **State management:** Pinia
- **Android runtime:** Capacitor
- **Camera:** Capacitor camera integration and browser camera preview
- **Native image labeling:** `@capacitor-mlkit/image-labeling`
- **Filesystem integration:** `@capacitor/filesystem`
- **Image processing:** Canvas API, `canvas.toBlob()`, JPEG encoding
- **Onboarding persistence:** `localStorage`
- **Progress persistence:** Local storage or other mechanisms implemented by the stores
- **Audio:** Browser audio playback through the reusable sound composable

**AI implementation note:** TouchGrass uses native ML Kit Image Labeling through Capacitor. It does not use TensorFlow.js or MobileNet directly in the WebView.

## 13. Offline-First Requirements

TouchGrass is designed to work without requiring a backend for its core functionality.

Offline support requires:

- Bundling application assets locally.
- Ensuring the installed native ML Kit image-labeling integration works without network access.
- Keeping mission rules and reward calculations on-device.
- Avoiding mandatory remote requests during mission completion.
- Handling camera permissions and unavailable hardware gracefully.
- Testing the packaged Android app without an internet connection.

**The app succeeds when the user spends more time outside, not more time using the app.**
