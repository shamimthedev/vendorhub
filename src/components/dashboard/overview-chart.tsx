// src/components/dashboard/overview-chart.tsx
'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Type definitions
interface ChartData {
  month: string;
  revenue: number;
}

interface TooltipPayload {
  value: number;
  dataKey: string;
  color: string;
  payload: ChartData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Mock data for the chart
const data: ChartData[] = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 },
  { month: 'Aug', revenue: 4300 },
  { month: 'Sep', revenue: 4800 },
  { month: 'Oct', revenue: 5200 },
  { month: 'Nov', revenue: 4523 },
  { month: 'Dec', revenue: 6000 },
];

// Custom Tooltip component with proper types
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border border-border rounded-lg shadow-md">
        <p className="label">{`Month: ${label}`}</p>
        <p className="intro text-blue-600 font-medium">
          {`Revenue: $${payload[0].value.toFixed(2)}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis 
          dataKey="month" 
          tickLine={false} 
          axisLine={false} 
          fontSize={12}
        />
        <YAxis 
          tickLine={false} 
          axisLine={false} 
          fontSize={12} 
          tickFormatter={(value: number) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))" // Uses your CSS primary color
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}