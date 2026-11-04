import { create } from 'zustand';
import { createSession } from '../services/sessionService';
import { getTodayDateString, formatTimerSeconds } from '../utils/dates';

const STORAGE_KEY = 'studybuddy_timer_state_v2';

// Safe Web Audio chime generator
function playSoftChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // First bell tone (D5 ~587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.85);

    // Second harmonious bell tone (A5 ~880 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15);
    gain2.gain.setValueAtTime(0, now + 0.15);
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 1.25);
  } catch (e) {
    console.warn('Audio playback not permitted or supported:', e);
  }
}

// Request and dispatch browser notifications
function sendBrowserNotification(title, body) {
  try {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.svg',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          new Notification(title, { body, icon: '/favicon.svg' });
        }
      });
    }
  } catch (e) {
    console.warn('Notification failed:', e);
  }
}

const DEFAULT_DURATIONS = {
  focus: 25,
  short_break: 5,
  long_break: 15,
};

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const now = Date.now();

    // If it was running, recalculate remainingSeconds using endsAt
    if (parsed.status === 'running' && parsed.endsAt) {
      if (now >= parsed.endsAt) {
        // Expired while away
        return {
          ...parsed,
          status: 'idle',
          endsAt: null,
          remainingSeconds: 0,
        };
      } else {
        const remaining = Math.ceil((parsed.endsAt - now) / 1000);
        return {
          ...parsed,
          remainingSeconds: remaining,
        };
      }
    }
    return parsed;
  } catch {
    return null;
  }
}

const saved = loadPersistedState();

export const useTimerStore = create((set, get) => {
  const initialDurations = saved?.durations || DEFAULT_DURATIONS;
  const initialMode = saved?.mode || 'focus';
  const initialDurationSeconds = (initialDurations[initialMode] || 25) * 60;
  const initialRemaining = saved?.remainingSeconds ?? initialDurationSeconds;

  const persist = (partial) => {
    try {
      const state = { ...get(), ...partial };
      const toSave = {
        mode: state.mode,
        status: state.status,
        endsAt: state.endsAt,
        remainingSeconds: state.remainingSeconds,
        cyclesCompleted: state.cyclesCompleted,
        linkedTaskId: state.linkedTaskId,
        linkedSubjectId: state.linkedSubjectId,
        linkedTaskTitle: state.linkedTaskTitle,
        soundEnabled: state.soundEnabled,
        durations: state.durations,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to persist timer state', e);
    }
  };

  return {
    mode: initialMode, // 'focus' | 'short_break' | 'long_break'
    status: saved?.status === 'running' ? 'running' : 'idle', // 'idle' | 'running' | 'paused'
    endsAt: saved?.endsAt || null,
    durations: initialDurations,
    durationSeconds: initialDurationSeconds,
    remainingSeconds: initialRemaining,
    cyclesCompleted: saved?.cyclesCompleted || 0,
    linkedTaskId: saved?.linkedTaskId || null,
    linkedSubjectId: saved?.linkedSubjectId || null,
    linkedTaskTitle: saved?.linkedTaskTitle || null,
    soundEnabled: saved?.soundEnabled ?? true,
    announcement: '',

    setAnnouncement: (text) => set({ announcement: text }),

    toggleSound: () => {
      const soundEnabled = !get().soundEnabled;
      set({ soundEnabled });
      persist({ soundEnabled });
    },

    setLinkedTask: (task) => {
      const partial = task
        ? {
            linkedTaskId: task._id || task.id,
            linkedSubjectId: task.subjectId || null,
            linkedTaskTitle: task.title || '',
          }
        : {
            linkedTaskId: null,
            linkedSubjectId: null,
            linkedTaskTitle: null,
          };
      set(partial);
      persist(partial);
    },

    setDurations: (newDurations) => {
      const durations = { ...get().durations, ...newDurations };
      const currentMode = get().mode;
      const durationSeconds = (durations[currentMode] || 25) * 60;
      const partial = {
        durations,
        durationSeconds,
        remainingSeconds: get().status === 'idle' ? durationSeconds : get().remainingSeconds,
      };
      set(partial);
      persist(partial);
    },

    setMode: (newMode) => {
      const durations = get().durations;
      const durationSeconds = (durations[newMode] || 25) * 60;
      const partial = {
        mode: newMode,
        status: 'idle',
        endsAt: null,
        durationSeconds,
        remainingSeconds: durationSeconds,
        announcement: `Switched to ${newMode.replace('_', ' ')} mode (${durations[newMode]} minutes).`,
      };
      set(partial);
      persist(partial);
      document.title = 'StudyBuddy | Smart Study Planner & AI Tutor';
    },

    start: () => {
      const state = get();
      if (state.status === 'running') return;

      const remaining = state.remainingSeconds > 0 ? state.remainingSeconds : state.durationSeconds;
      const endsAt = Date.now() + remaining * 1000;
      const modeLabel = state.mode === 'focus' ? 'Focus session' : 'Break';

      const partial = {
        status: 'running',
        endsAt,
        remainingSeconds: remaining,
        announcement: `Timer started. ${modeLabel} for ${Math.ceil(remaining / 60)} minutes.`,
      };
      set(partial);
      persist(partial);

      // Request browser notification permission proactively if not asked
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    },

    pause: () => {
      const state = get();
      if (state.status !== 'running') return;

      const remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
      const partial = {
        status: 'paused',
        endsAt: null,
        remainingSeconds: remaining,
        announcement: 'Timer paused.',
      };
      set(partial);
      persist(partial);
      document.title = 'StudyBuddy | Paused';
    },

    resume: () => {
      get().start();
    },

    reset: () => {
      const state = get();
      const durationSeconds = (state.durations[state.mode] || 25) * 60;
      const partial = {
        status: 'idle',
        endsAt: null,
        durationSeconds,
        remainingSeconds: durationSeconds,
        announcement: 'Timer reset.',
      };
      set(partial);
      persist(partial);
      document.title = 'StudyBuddy | Smart Study Planner & AI Tutor';
    },

    skip: () => {
      const state = get();
      if (state.mode === 'focus') {
        const nextCycles = state.cyclesCompleted + 1;
        const nextMode = nextCycles % 4 === 0 ? 'long_break' : 'short_break';
        const nextDuration = (state.durations[nextMode] || 5) * 60;
        const partial = {
          mode: nextMode,
          status: 'idle',
          endsAt: null,
          cyclesCompleted: nextCycles,
          durationSeconds: nextDuration,
          remainingSeconds: nextDuration,
          announcement: `Skipped to ${nextMode.replace('_', ' ')}.`,
        };
        set(partial);
        persist(partial);
      } else {
        const focusDuration = (state.durations.focus || 25) * 60;
        const partial = {
          mode: 'focus',
          status: 'idle',
          endsAt: null,
          durationSeconds: focusDuration,
          remainingSeconds: focusDuration,
          announcement: 'Skipped break, starting focus.',
        };
        set(partial);
        persist(partial);
      }
      document.title = 'StudyBuddy | Smart Study Planner & AI Tutor';
    },

    tick: async () => {
      const state = get();
      if (state.status !== 'running' || !state.endsAt) return;

      const now = Date.now();
      const diffMs = state.endsAt - now;

      if (diffMs <= 0) {
        // Session Finished!
        await get().handleCompletion();
      } else {
        const remaining = Math.ceil(diffMs / 1000);
        set({ remainingSeconds: remaining });
        // Update document.title smoothly
        const modePrefix = state.mode === 'focus' ? 'Focus' : 'Break';
        document.title = `(${formatTimerSeconds(remaining)}) ${modePrefix} | StudyBuddy`;
      }
    },

    handleCompletion: async () => {
      const state = get();
      const wasFocus = state.mode === 'focus';

      if (state.soundEnabled) {
        playSoftChime();
      }

      if (wasFocus) {
        const completedCycles = state.cyclesCompleted + 1;
        const nextMode = completedCycles % 4 === 0 ? 'long_break' : 'short_break';
        const breakDurationMin = state.durations[nextMode];
        const nextDurationSeconds = breakDurationMin * 60;

        // Post session to backend/mock
        try {
          await createSession({
            taskId: state.linkedTaskId,
            subjectId: state.linkedSubjectId,
            durationMin: state.durations.focus,
            date: getTodayDateString(),
          });
        } catch (err) {
          console.warn('Failed to log completed session:', err);
        }

        sendBrowserNotification(
          '🎉 Focus Block Complete!',
          `Awesome job! Time for a ${breakDurationMin}-minute ${nextMode === 'long_break' ? 'long ' : ''}break.`
        );

        const partial = {
          mode: nextMode,
          status: 'idle',
          endsAt: null,
          cyclesCompleted: completedCycles,
          durationSeconds: nextDurationSeconds,
          remainingSeconds: nextDurationSeconds,
          announcement: `Focus session complete! You have earned a ${breakDurationMin} minute break.`,
        };
        set(partial);
        persist(partial);
        document.title = '🎉 Session Complete! | StudyBuddy';
      } else {
        const focusDurationMin = state.durations.focus;
        const focusDurationSeconds = focusDurationMin * 60;

        sendBrowserNotification(
          '🔔 Break Over!',
          `Ready for another study block? Let's stay focused!`
        );

        const partial = {
          mode: 'focus',
          status: 'idle',
          endsAt: null,
          durationSeconds: focusDurationSeconds,
          remainingSeconds: focusDurationSeconds,
          announcement: 'Break finished. Ready to begin your next focus session.',
        };
        set(partial);
        persist(partial);
        document.title = '🔔 Break Over | StudyBuddy';
      }
    },
  };
});

