'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Power, PowerOff, Users, Loader2, X, Check } from 'lucide-react';
import { useAdminSchedules, useCreateSchedule, useUpdateSchedule, useDeleteSchedule, useToggleSchedule } from '@/hooks/useSchedules';
import { Schedule, DAY_LABELS, TIME_LABELS } from '@/types';
import { seatPercentage } from '@/lib/utils';

interface ScheduleFormData {
  day_of_week: 'SAT' | 'TUE' | 'SUN' | 'WED' | 'SAT_TUE' | 'SUN_WED';
  time_slot: 15 | 16 | 17;
  total_seats: number;
  is_active: boolean;
}

function SeatBar({ occupied, total }: { occupied: number; total: number }) {
  const pct = seatPercentage(occupied, total);
  const color = pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#22C55E';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-white/50">
        <span>{occupied}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </div>
  );
}

export default function ScheduleManager() {
  const { data: schedules = [], isLoading } = useAdminSchedules();
  const createMutation = useCreateSchedule();
  const updateMutation = useUpdateSchedule();
  const deleteMutation = useDeleteSchedule();
  const toggleMutation = useToggleSchedule();

  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [form, setForm] = useState<ScheduleFormData>({
    day_of_week: 'SAT',
    time_slot: 15,
    total_seats: 15,
    is_active: true,
  });

  const openCreate = () => {
    setEditingSchedule(null);
    setForm({ day_of_week: 'SAT', time_slot: 15, total_seats: 15, is_active: true });
    setShowForm(true);
  };

  const openEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setForm({
      day_of_week: schedule.day_of_week,
      time_slot: schedule.time_slot,
      total_seats: schedule.total_seats,
      is_active: schedule.is_active,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchedule) {
      updateMutation.mutate({ id: editingSchedule.id, data: form });
    } else {
      createMutation.mutate(form);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-lg">إدارة المواعيد</h3>
        <motion.button
          onClick={openCreate}
          className="btn-primary text-sm py-2.5 px-4"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} />
          موعد جديد
        </motion.button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="glass-dark rounded-2xl p-6"
            style={{ border: '1px solid rgba(37,99,235,0.2)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-white font-bold">
                {editingSchedule ? 'تعديل الموعد' : 'إضافة موعد جديد'}
              </h4>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 block mb-1.5">اليوم</label>
                <select
                  value={form.day_of_week}
                  onChange={(e) => setForm((f) => ({ ...f, day_of_week: e.target.value as any }))}
                  className="input-premium"
                >
                  <option value="SAT_TUE">السبت والثلاثاء</option>
                  <option value="SUN_WED">الأحد والأربعاء</option>
                  <option value="SAT">السبت</option>
                  <option value="TUE">الثلاثاء</option>
                  <option value="SUN">الأحد</option>
                  <option value="WED">الأربعاء</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/60 block mb-1.5">الوقت</label>
                <select
                  value={form.time_slot}
                  onChange={(e) => setForm((f) => ({ ...f, time_slot: Number(e.target.value) as 15 | 16 | 17 }))}
                  className="input-premium"
                >
                  <option value={15}>3:00 مساءً</option>
                  <option value={16}>4:00 مساءً</option>
                  <option value={17}>5:00 مساءً</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/60 block mb-1.5">عدد المقاعد الكلي</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={form.total_seats}
                  onChange={(e) => setForm((f) => ({ ...f, total_seats: Number(e.target.value) }))}
                  className="input-premium"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="w-10 h-5 rounded-full relative transition-colors duration-300 cursor-pointer"
                    style={{ background: form.is_active ? '#22C55E' : 'rgba(255,255,255,0.1)' }}
                    onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
                  >
                    <motion.div
                      animate={{ x: form.is_active ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                    />
                  </div>
                  <span className="text-sm text-white/60">{form.is_active ? 'نشط' : 'موقوف'}</span>
                </label>
              </div>

              <div className="col-span-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm py-2 px-4" style={{ borderRadius: '10px' }}>
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn-primary text-sm py-2 px-5"
                  style={{ borderRadius: '10px' }}
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {editingSchedule ? 'حفظ التغييرات' : 'إضافة الموعد'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}
        </div>
      ) : schedules.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 text-center text-white/30">
          لا توجد مواعيد — أضف موعدًا جديدًا
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {schedules.map((schedule: Schedule) => (
            <motion.div
              key={schedule.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-2xl p-5 relative overflow-hidden"
              style={{
                border: `1px solid ${schedule.is_active ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)'}`,
                opacity: schedule.is_active ? 1 : 0.6,
              }}
            >
              {/* Full badge */}
              {schedule.is_full && (
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-0.5 rounded-full status-cancelled">مكتمل</span>
                </div>
              )}

              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-white text-lg">{DAY_LABELS[schedule.day_of_week] || schedule.day_display || schedule.day_of_week}</span>
                  <span className="text-white/50">—</span>
                  <span className="text-blue-400 font-semibold">{TIME_LABELS[schedule.time_slot] || schedule.time_display || '3:00 مساءً'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                  <Users size={12} />
                  <span>{schedule.occupied_seats} طالب مسجل</span>
                </div>
              </div>

              <SeatBar occupied={schedule.occupied_seats} total={schedule.total_seats} />

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => toggleMutation.mutate(schedule.id)}
                  disabled={toggleMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: schedule.is_active ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                    border: schedule.is_active ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.3)',
                    color: schedule.is_active ? '#f87171' : '#4ade80',
                  }}
                >
                  {schedule.is_active ? <PowerOff size={12} /> : <Power size={12} />}
                  {schedule.is_active ? 'تعطيل' : 'تفعيل'}
                </button>
                <button
                  onClick={() => openEdit(schedule)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <Edit2 size={13} className="text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={13} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
