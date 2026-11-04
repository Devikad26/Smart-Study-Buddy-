import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { PieChart as PieIcon, BarChart2 } from 'lucide-react';
import Card from '../../components/ui/Card';

function SubjectTooltip({ active, payload, totalHours }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const pct = totalHours > 0 ? Math.round((item.hours / totalHours) * 100) : 0;
    return (
      <div className="rounded-xl bg-slate-900 border border-slate-700 p-3 shadow-xl text-xs">
        <p className="font-bold text-slate-100 flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.name}
        </p>
        <p className="text-slate-300 mt-1">
          <span className="font-extrabold text-white">{item.hours}</span> hours logged ({pct}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function SubjectHoursChart({ data = [] }) {
  const [chartType, setChartType] = useState('pie'); // 'pie' | 'bar'

  const formattedData = data.map((item) => ({
    name: item.name,
    hours: Number(item.hours) || 0,
    color: item.color || '#6366f1',
  }));

  const totalHours = formattedData.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <Card className="p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-100">Hours per Subject</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Time distribution across active curricula
          </p>
        </div>

        {/* View Toggle (Donut vs Bar) */}
        <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setChartType('pie')}
            aria-label="View as donut chart"
            title="Donut View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              chartType === 'pie'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            aria-label="View as bar chart"
            title="Bar View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              chartType === 'bar'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Accessible Table alternative for screen readers */}
      <table className="sr-only">
        <caption>Study hours distribution per subject</caption>
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Hours</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((d) => (
            <tr key={d.name}>
              <td>{d.name}</td>
              <td>{d.hours} hours</td>
              <td>{totalHours > 0 ? Math.round((d.hours / totalHours) * 100) : 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart Visualization */}
      <div className="w-full h-64 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Tooltip content={(props) => <SubjectTooltip {...props} totalHours={totalHours} />} />
              <Pie
                data={formattedData}
                dataKey="hours"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={4}
                stroke="#0b0f19"
                strokeWidth={3}
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={formattedData} layout="vertical" margin={{ left: 10, right: 10 }}>
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                width={100}
                tickFormatter={(val) => (val.length > 12 ? `${val.slice(0, 12)}…` : val)}
              />
              <Tooltip content={(props) => <SubjectTooltip {...props} totalHours={totalHours} />} />
              <Bar dataKey="hours" radius={[0, 8, 8, 0]}>
                {formattedData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-800/80">
        {formattedData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs text-slate-300">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="truncate max-w-[130px]">{item.name}</span>
            <span className="font-semibold text-slate-100">{item.hours}h</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
