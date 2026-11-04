import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function TimerControls({
  status = 'idle',
  onStart,
  onPause,
  onReset,
  onSkip,
}) {
  const isRunning = status === 'running';

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
      {/* Reset Button */}
      <Button
        variant="secondary"
        size="lg"
        onClick={onReset}
        aria-label="Reset timer"
        title="Reset timer to beginning"
        className="w-12 h-12 p-0 rounded-2xl"
      >
        <RotateCcw className="w-5 h-5 text-slate-300" aria-hidden="true" />
      </Button>

      {/* Main Start / Pause Button */}
      {isRunning ? (
        <Button
          variant="primary"
          size="lg"
          onClick={onPause}
          aria-label="Pause timer"
          title="Pause timer (Spacebar)"
          className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 text-base font-bold min-w-[140px]"
        >
          <Pause className="w-5 h-5 mr-2" aria-hidden="true" />
          Pause
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          onClick={onStart}
          aria-label={status === 'paused' ? 'Resume timer' : 'Start timer'}
          title="Start timer (Spacebar)"
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 text-base font-bold min-w-[140px]"
        >
          <Play className="w-5 h-5 mr-2 fill-current" aria-hidden="true" />
          {status === 'paused' ? 'Resume' : 'Start Focus'}
        </Button>
      )}

      {/* Skip Button */}
      <Button
        variant="secondary"
        size="lg"
        onClick={onSkip}
        aria-label="Skip to next session or break"
        title="Skip to next phase"
        className="w-12 h-12 p-0 rounded-2xl"
      >
        <SkipForward className="w-5 h-5 text-slate-300" aria-hidden="true" />
      </Button>
    </div>
  );
}

