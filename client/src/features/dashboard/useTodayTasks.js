import { useState, useEffect, useCallback } from 'react';
import { getTasks, getSubjects, toggleTaskComplete } from '../../services/taskService';
import { getTodayDateString } from '../../utils/dates';

export function useTodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = getTodayDateString();
      const [taskList, subjectList] = await Promise.all([
        getTasks({ date: today }),
        getSubjects(),
      ]);

      const normalizedTasks = Array.isArray(taskList)
        ? taskList
        : taskList?.tasks || [];
      const normalizedSubjects = Array.isArray(subjectList)
        ? subjectList
        : subjectList?.subjects || [];

      setTasks(normalizedTasks);
      setSubjects(normalizedSubjects);
    } catch (err) {
      setError(err.message || 'Failed to load today\'s tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Optimistic update with rollback on error
  const handleToggleComplete = async (taskId) => {
    const previousTasks = [...tasks];
    // Optimistic toggle
    setTasks((current) =>
      current.map((t) =>
        (t._id || t.id) === taskId ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const updated = await toggleTaskComplete(taskId);
      // Synchronize with returned value if available
      if (updated && typeof updated.completed === 'boolean') {
        setTasks((current) =>
          current.map((t) =>
            (t._id || t.id) === taskId ? { ...t, completed: updated.completed } : t
          )
        );
      }
    } catch (err) {
      // Rollback on failure!
      console.error('Failed to toggle task, rolling back:', err);
      setTasks(previousTasks);
      throw err;
    }
  };

  return {
    tasks,
    subjects,
    loading,
    error,
    refetch: fetchTasks,
    toggleComplete: handleToggleComplete,
  };
}

export default useTodayTasks;

