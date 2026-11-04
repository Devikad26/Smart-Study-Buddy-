import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

export default function TimerSettingsModal({
  isOpen,
  onClose,
  durations = { focus: 25, short_break: 5, long_break: 15 },
  onSave,
}) {
  const [focusMin, setFocusMin] = useState(durations.focus || 25);
  const [shortBreakMin, setShortBreakMin] = useState(durations.short_break || 5);
  const [longBreakMin, setLongBreakMin] = useState(durations.long_break || 15);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      focus: Math.max(1, Math.min(120, Number(focusMin) || 25)),
      short_break: Math.max(1, Math.min(60, Number(shortBreakMin) || 5)),
      long_break: Math.max(1, Math.min(60, Number(longBreakMin) || 15)),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pomodoro Timer Settings">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="focus-duration"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Focus Duration (minutes)
          </label>
          <input
            id="focus-duration"
            type="number"
            min="1"
            max="120"
            value={focusMin}
            onChange={(e) => setFocusMin(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="short-break-duration"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Short Break Duration (minutes)
          </label>
          <input
            id="short-break-duration"
            type="number"
            min="1"
            max="60"
            value={shortBreakMin}
            onChange={(e) => setShortBreakMin(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="long-break-duration"
            className="block text-xs font-semibold text-slate-300 mb-1"
          >
            Long Break Duration (minutes)
          </label>
          <input
            id="long-break-duration"
            type="number"
            min="1"
            max="60"
            value={longBreakMin}
            onChange={(e) => setLongBreakMin(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </Modal>
  );
}

