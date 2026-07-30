'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import { DashboardStats, RegistrationByDay } from '@/types';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#2563EB', '#7C3AED', '#22C55E', '#EF4444'];
const STATUS_DATA_KEYS = ['pending_count', 'paid_count', 'completed_count', 'cancelled_count'] as const;
const STATUS_LABELS = ['انتظار', 'مدفوع', 'مكتمل', 'ملغي'];

export default function RegistrationsChart() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await dashboardApi.stats();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 skeleton h-64 rounded-2xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  const timelineData = (stats?.registrations_by_day ?? []).map((d: RegistrationByDay) => ({
    date: new Date(d.date).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }),
    count: d.count,
  }));

  const pieData = STATUS_DATA_KEYS.map((key, i) => ({
    name: STATUS_LABELS[i],
    value: stats?.[key] ?? 0,
  })).filter((d) => d.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Area chart */}
      <div className="lg:col-span-2 glass-dark p-4 md:p-6 rounded-2xl">
        <h3 className="text-white font-bold mb-4 md:mb-5 text-sm md:text-base">التسجيلات خلال آخر 14 يوم</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={timelineData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#0b1b36', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
              labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            />
            <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} fill="url(#blueGrad)" dot={{ fill: '#2563EB', r: 3 }} name="تسجيل" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="glass-dark p-4 md:p-6 rounded-2xl">
        <h3 className="text-white font-bold mb-4 md:mb-5 text-sm md:text-base">توزيع الحالات</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0b1b36', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
              />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-white/30 text-sm">
            لا توجد بيانات بعد
          </div>
        )}
      </div>
    </div>
  );
}
