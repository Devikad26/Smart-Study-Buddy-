# StudyBuddy Frontend — Member D Documentation

This frontend client is built with **React 18 + Vite**, **Tailwind CSS (v4)**, **React Router**, **Zustand**, **Recharts**, and **Axios**.

## Member D Scope & Modules

| Module / Path | File Ownership | Description |
| :--- | :--- | :--- |
| **Dashboard** (`/` & `/dashboard`) | `pages/Dashboard.jsx`, `features/dashboard/*` | Daily greeting, study streak badge, "Today's Focus" with optimistic checkbox rollback, circular progress ring, upcoming deadlines with exam countdown chips, quick-start Pomodoro. |
| **Pomodoro Timer** (`/focus` & `/timer`) | `pages/Focus.jsx`, `features/focus/*`, `store/timerStore.js` | Timestamp-based (`endsAt`) background-accurate timer, 25/5/15m modes, audio synthesizer chime, browser notifications, document title ticker, session logging to backend. |
| **Study Analytics** (`/analytics`) | `pages/Analytics.jsx`, `features/analytics/*` | Weekly consistency bar chart (week/month toggle), hours-per-subject donut chart, syllabus progress bars, KPI summary cards, accessible screen-reader tables. |
| **Streaks & Dates** | `utils/streaks.js`, `utils/dates.js`, `utils/streaks.test.js` | Pure function streak calculator handling timezone boundaries, zero-session breaks, and the "today not yet done" grace period. 100% test coverage with Vitest. |
| **Theme System** | `store/themeStore.js`, `components/ui/ThemeToggle.jsx`, `index.html` | Class-based dark mode (`.dark`), zero-flash inline script in `<head>`, design tokens via CSS variables, prefers-reduced-motion support. |
| **Services & Demo Data** | `services/apiClient.js`, `services/mockData.js`, `services/demoSeedData.json` | Axios service layer with JWT auth interceptor, `USE_MOCK` flag, 25 tasks across 14 days, 3 weeks of sessions, backend seed handoff. |

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the `client/` folder:
```env
# Set to 'true' to use the offline mock data module (no backend required)
# Set to 'false' to communicate with the Express MongoDB API
VITE_USE_MOCK=true

# API Base URL (defaults to /api which proxies to http://localhost:5001)
VITE_API_URL=/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Unit Tests (Vitest)
```bash
npm test
```

### 5. Production Build & Bundle Inspection
```bash
npm run build
```

---

## Architectural Highlights

- **Accurate Timer**: Timer state is based on target timestamp (`endsAt`), not `setInterval` tick accumulation. When tabs are throttled or closed, remaining time is recalculated accurately on resume or page reload.
- **Optimistic UI with Rollback**: Completing tasks on the dashboard updates the checkbox immediately. If the API fails, the state rolls back to the previous snapshot with an alert.
- **Accessibility (a11y)**:
  - Visible focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-500`).
  - Polite `aria-live` announcements on timer start/stop/break transitions (preventing second-by-second spam).
  - Accessible hidden tables (`sr-only`) mirror all Recharts visualizations for screen readers.
  - Semantic `role="progressbar"`, `role="checkbox"`, and `role="tablist"` elements.
  - Respects user `prefers-reduced-motion` settings.
- **Backend Seed Dataset**:
  The complete demo dataset is exported at [`client/src/services/demoSeedData.json`](./src/services/demoSeedData.json) for Member B to ingest directly into MongoDB seed scripts.
