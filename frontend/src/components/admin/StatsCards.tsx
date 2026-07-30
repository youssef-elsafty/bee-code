'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import { DashboardStats } from '@/types';
import { Users, UserPlus, LayoutGrid, CheckCircle, Clock, XCircle } from 'lucide-react';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{ background: `${color}15`, color }}
        >
          إجمالي
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.15 }}
        className="text-3xl font-black text-white mb-1"
      >
        {value}
      </motion.div>
      <div className="text-sm text-white/50">{label}</div>

      {/* Accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await dashboardApi.stats();
      return data;
    },
    refetchInterval: 4000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  const cards = [
    { icon: Users, label: 'إجمالي الطلاب', value: stats?.total_students ?? 0, color: '#2563EB' },
    { icon: UserPlus, label: 'تسجيلات اليوم', value: stats?.today_registrations ?? 0, color: '#7C3AED' },
    { icon: LayoutGrid, label: 'مقاعد مشغولة', value: stats?.total_occupied_seats ?? 0, color: '#06B6D4' },
    { icon: CheckCircle, label: 'مقاعد متاحة', value: stats?.total_available_seats ?? 0, color: '#22C55E' },
    { icon: Clock, label: 'قيد الانتظار', value: stats?.pending_count ?? 0, color: '#F59E0B' },
    { icon: XCircle, label: 'ملغيات', value: stats?.cancelled_count ?? 0, color: '#EF4444' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} delay={i * 0.08} />
      ))}
    </div>
  );
}
