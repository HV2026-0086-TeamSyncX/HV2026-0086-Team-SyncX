'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

interface ChartProps {
  title?: string;
  type?: 'bar' | 'area';
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey?: string;
  categoryKey?: string;
  color?: string;
}

export default function InlineDataChart({
  title = 'Visual Metrics & Trends',
  type = 'bar',
  data,
  dataKey = 'value',
  categoryKey = 'name',
  color = '#2563EB'
}: ChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-3 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-[#DCE5F0] dark:border-white/10 shadow-xs space-y-2">
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold font-mono text-[#0F172A] dark:text-slate-200 uppercase tracking-wider">
            📊 {title}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] dark:text-slate-400">
            Interactive Plot
          </span>
        </div>
      )}

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
              <XAxis
                dataKey={categoryKey}
                tick={{ fontSize: 10, fill: '#8092A7' }}
                axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#8092A7' }}
                axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(150, 150, 150, 0.15)" />
              <XAxis
                dataKey={categoryKey}
                tick={{ fontSize: 10, fill: '#8092A7' }}
                axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#8092A7' }}
                axisLine={{ stroke: 'rgba(150, 150, 150, 0.2)' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill="url(#areaColor)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
