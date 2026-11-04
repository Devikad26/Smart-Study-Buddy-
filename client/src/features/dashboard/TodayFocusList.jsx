import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Timer,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function TodayFocusList({
  tasks = [],
  subjects = [],
  onToggleComplete,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const [toggleError, setToggleError] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  const subjectMap = new Map();
  subjects.forEach((s) => {
    subjectMap.set(s._id || s.id, s);
  });

  const handleToggle = async (taskId) => {
    setToggleError(null);
    setPendingId(taskId);
    try {
      await onToggleComplete(taskId);
    } catch (err) {
      setToggleError(`Could not update task. Changes were rolled back.`);
      setTimeout(() => setToggleError(null), 4000);
    } finally {
      setPendingId(null);
    }
  };

  const handleQuickStart = (task) => {
    navigate('/focus', {
      state: {
        taskId: task._id || task.id,
        subjectId: task.subjectId,
        taskTitle: task.title,
      },
    });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" aria-hidden="true" />
            Today's Focus
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Key study tasks scheduled for today. Complete them or start a focused Pomodoro.
          </p>
        </div>
        <Link
          to="/planner"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 focus:outline-none focus-visible:underline"
        >
          View Planner <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {toggleError && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
          <span>{toggleError}</span>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="py-10 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-slate-200">No tasks scheduled for today</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            You're all caught up! You can generate a smart revision plan or add a new study goal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/planner')}
            >
              Open Smart Planner
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/focus')}
            >
              Start Freeform Timer
            </Button>
          </div>
        </div>
      ) : (
        <ul className="space-y-3" aria-label="Today's study tasks list">
          {tasks.map((task) => {
            const taskId = task._id || task.id;
            const subject = subjectMap.get(task.subjectId) || {
              name: 'General',
              color: '#6366f1',
            };
            const isCompleted = Boolean(task.completed);
            const isPending = pendingId === taskId;

            const priorityStyles = {
              high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
              medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            }[task.priority || 'medium'];

            return (
              <li
                key={taskId}
                className={`group flex items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all duration-150 ${
                  isCompleted
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700/80 hover:bg-slate-800/40 shadow-sm'
                }`}
              >
                {/* Left: Checkbox + Title + Meta */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isCompleted}
                    aria-label={`Mark "${task.title}" as ${isCompleted ? 'incomplete' : 'complete'}`}
                    disabled={isPending}
                    onClick={() => handleToggle(taskId)}
                    className="mt-0.5 sm:mt-0 p-1 text-slate-400 hover:text-indigo-400 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer disabled:cursor-wait"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isCompleted
                          ? 'line-through text-slate-400'
                          : 'text-slate-100 group-hover:text-indigo-200'
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {/* Subject Dot + Name */}
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: subject.color }}
                          aria-hidden="true"
                        />
                        <span className="truncate max-w-[120px] sm:max-w-none">
                          {subject.name}
                        </span>
                      </span>

                      {/* Priority Badge */}
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${priorityStyles}`}
                      >
                        {task.priority || 'medium'}
                      </span>

                      {/* Type Badge */}
                      <span className="text-[10px] text-slate-400 capitalize hidden sm:inline-block">
                        • {task.type || 'study'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick-Start Pomodoro Button */}
                {!isCompleted && (
                  <button
                    type="button"
                    onClick={() => handleQuickStart(task)}
                    title={`Start Pomodoro for ${task.title}`}
                    aria-label={`Start Pomodoro session for "${task.title}"`}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <Timer className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="hidden md:inline">Focus</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

