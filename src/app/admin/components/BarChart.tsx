'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  // const chartData = Object.entries(data).map(([name, value]) => ({
  //   name: name[0].toUpperCase() + name.slice(1),
  //   value,
  // }));

  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
