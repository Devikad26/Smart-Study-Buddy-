import { useState, useEffect, useCallback } from 'react';
import { getTasks, getSubjects } from '../../services/taskService';
import { getDaysRemaining } from '../../utils/dates';

export function useUpcomingDeadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeadlines = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [taskList, subjectList] = await Promise.all([
        getTasks(),
        getSubjects(),
      ]);

      const tasks = Array.isArray(taskList) ? taskList : taskList?.tasks || [];
      const subjects = Array.isArray(subjectList) ? subjectList : subjectList?.subjects || [];

      const subjectMap = new Map();
      subjects.forEach((s) => {
        subjectMap.set(s._id || s.id, s);
      });

      // Gather upcoming deadlines: upcoming exams and high/medium priority tasks
      const items = [];

      // 1. Subject Exams
      subjects.forEach((subj) => {
        if (subj.examDate) {
          const days = getDaysRemaining(subj.examDate);
          if (days !== null && days >= 0) {
            items.push({
              id: `exam-${subj._id || subj.id}`,
              title: `${subj.name} Final Exam`,
              type: 'exam',
              targetDate: subj.examDate,
              daysLeft: days,
              subjectName: subj.name,
              subjectColor: subj.color || '#6366f1',
              priority: 'high',
            });
          }
        }
      });

      // 2. Upcoming tasks with dueDates
      tasks.forEach((t) => {
        if (!t.completed && t.dueDate) {
          const days = getDaysRemaining(t.dueDate);
          if (days !== null && days >= 0) {
            const subj = subjectMap.get(t.subjectId) || {};
            items.push({
              id: t._id || t.id,
              title: t.title,
              type: t.type || 'assignment',
              targetDate: t.dueDate,
              daysLeft: days,
              subjectName: subj.name || 'General',
              subjectColor: subj.color || '#6366f1',
              priority: t.priority || 'medium',
            });
          }
        }
      });

      // Sort by daysLeft ascending (closest deadlines first)
      items.sort((a, b) => a.daysLeft - b.daysLeft);

      setDeadlines(items.slice(0, 8)); // Display top 8 deadlines
    } catch (err) {
      setError(err.message || 'Failed to load upcoming deadlines');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeadlines();
  }, [fetchDeadlines]);

  return {
    data: deadlines,
    deadlines,
    loading,
    error,
    refetch: fetchDeadlines,
  };
}

export default useUpcomingDeadlines;

