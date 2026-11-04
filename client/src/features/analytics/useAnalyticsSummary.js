import { useState, useEffect, useCallback } from 'react';
import { getAnalyticsSummary } from '../../services/analyticsService';

export function useAnalyticsSummary() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const summary = await getAnalyticsSummary();
      setData(summary);
    } catch (err) {
      setError(err.message || 'Failed to load study analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    data,
    loading,
    error,
    refetch: fetchSummary,
  };
}

export default useAnalyticsSummary;

