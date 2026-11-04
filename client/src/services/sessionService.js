import { apiClient, USE_MOCK } from './apiClient';
import { mockSessions } from './mockData';
import { getTodayDateString } from '../utils/dates';

// In-memory mock storage so sessions persist in mock mode during the session
let localMockSessions = [...mockSessions];

export async function createSession(sessionData) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newSession = {
      _id: `ses-${Date.now()}`,
      taskId: sessionData.taskId || null,
      subjectId: sessionData.subjectId || null,
      durationMin: Number(sessionData.durationMin) || 25,
      date: sessionData.date || getTodayDateString(),
      createdAt: new Date().toISOString(),
    };
    localMockSessions.unshift(newSession);
    return newSession;
  }

  return apiClient.post('/sessions', sessionData);
}

export async function getSessions(params = { range: 'week' }) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...localMockSessions];
  }

  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/sessions${query ? `?${query}` : ''}`);
}

export default {
  createSession,
  getSessions,
};

