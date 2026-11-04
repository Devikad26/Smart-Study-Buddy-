import { apiClient, USE_MOCK } from './apiClient';
import { getMockAnalyticsSummary } from './mockData';

export async function getAnalyticsSummary() {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return getMockAnalyticsSummary();
  }

  return apiClient.get('/analytics/summary');
}

export default {
  getAnalyticsSummary,
};

