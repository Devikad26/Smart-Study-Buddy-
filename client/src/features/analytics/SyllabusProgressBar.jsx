import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import Card from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';

export default function SyllabusProgressBar({ subjects = [] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" aria-hidden="true" />
          <h2 className="text-base font-bold text-slate-100">Syllabus Completion</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">Topic Mastery</span>
      </div>

      <div className="space-y-5">
        {subjects.map((subj) => {
          const percent = Math.min(100, Math.max(0, Number(subj.percent) || 0));
          return (
            <div key={subj.subjectId || subj.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: subj.color || '#6366f1' }}
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-slate-200 truncate">
                    {subj.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-100">{percent}%</span>
                </div>
              </div>

              {/* Accessible horizontal progress bar */}
              <ProgressBar
                value={percent}
                max={100}
                color={subj.color || '#6366f1'}
                height="h-3"
                label={`${subj.name} syllabus progress`}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

