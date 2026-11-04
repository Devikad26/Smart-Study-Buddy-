import { apiClient, USE_MOCK } from './apiClient';
import { mockTasks, mockSubjects } from './mockData';

let localMockTasks = [...mockTasks];

export async function getTasks(params = {}) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let filtered = [...localMockTasks];
    if (params.date) {
      filtered = filtered.filter((t) => t.scheduledDate === params.date);
    }
    return filtered;
  }

  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/tasks${query ? `?${query}` : ''}`);
}

export async function getSubjects() {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return [...mockSubjects];
  }

  return apiClient.get('/subjects');
}

export async function toggleTaskComplete(taskId) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const taskIndex = localMockTasks.findIndex((t) => (t._id || t.id) === taskId);
    if (taskIndex === -1) {
      throw new Error(`Task ${taskId} not found`);
    }
    const current = localMockTasks[taskIndex];
    const updated = { ...current, completed: !current.completed };
    localMockTasks[taskIndex] = updated;
    return updated;
  }

  return apiClient.patch(`/tasks/${taskId}/complete`);
}

export default {
  getTasks,
  getSubjects,
  toggleTaskComplete,
};
