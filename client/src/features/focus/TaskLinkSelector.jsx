import React from 'react';
import { Link2, Check, BookOpen } from 'lucide-react';

export default function TaskLinkSelector({
  tasks = [],
  subjects = [],
  selectedTaskId = null,
  onSelectTask,
}) {
  const subjectMap = new Map();
  subjects.forEach((s) => {
    subjectMap.set(s._id || s.id, s);
  });

  const selectedTask = tasks.find((t) => (t._id || t.id) === selectedTaskId);
  const selectedSubject = selectedTask ? subjectMap.get(selectedTask.subjectId) : null;

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="task-link-select"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between"
      >
        <span className="flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
          Link Session to a Study Task
        </span>
        {selectedTask && (
          <span className="text-[11px] font-normal text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> Linked
          </span>
        )}
      </label>

      <div className="relative">
        <select
          id="task-link-select"
          value={selectedTaskId || ''}
          onChange={(e) => {
            const chosenId = e.target.value;
            if (!chosenId) {
              onSelectTask(null);
            } else {
              const taskObj = tasks.find((t) => (t._id || t.id) === chosenId);
              onSelectTask(taskObj || null);
            }
          }}
          className="w-full appearance-none rounded-xl bg-slate-900 border border-slate-700/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 cursor-pointer pr-10 shadow-sm"
        >
          <option value="">-- No specific task (Freeform Study) --</option>
          {tasks.map((task) => {
            const taskId = task._id || task.id;
            const subj = subjectMap.get(task.subjectId);
            return (
              <option key={taskId} value={taskId}>
                {subj ? `[${subj.name}] ` : ''}{task.title} {task.completed ? '(Completed)' : ''}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {selectedSubject && (
        <div className="flex items-center gap-2 mt-2 px-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: selectedSubject.color || '#6366f1' }}
            aria-hidden="true"
          />
          <span className="text-[11px] text-slate-400 truncate">
            Logging time under{' '}
            <strong className="text-slate-200 font-semibold">{selectedSubject.name}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

