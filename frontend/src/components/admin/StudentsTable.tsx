'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Phone, MessageCircle, ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { useRegistrations, useUpdateRegistration, useDeleteRegistration } from '@/hooks/useStudents';
import { exportApi } from '@/lib/api';
import { Registration, RegistrationStatus, TableFilters, STATUS_LABELS } from '@/types';
import { formatDate, getStatusClass, whatsappLink, downloadBlob, debounce } from '@/lib/utils';
import toast from 'react-hot-toast';

const PAGE_SIZE = 15;

export default function StudentsTable() {
  const [filters, setFilters] = useState<TableFilters>({ page: 1, page_size: PAGE_SIZE });
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

  const { data, isLoading } = useRegistrations(filters);
  const updateMutation = useUpdateRegistration();
  const deleteMutation = useDeleteRegistration();

  const debouncedSearch = useCallback(
    debounce((val: unknown) => {
      setFilters((f) => ({ ...f, search: val as string, page: 1 }));
    }, 400),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleStatusChange = (id: number, status: RegistrationStatus) => {
    updateMutation.mutate({ id, data: { status } });
    setEditingId(null);
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`هل أنت متأكد من حذف تسجيل ${name}؟`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleExport = async (format: 'xlsx' | 'csv' | 'pdf') => {
    setExportLoading(true);
    try {
      const response = await exportApi.students(format);
      downloadBlob(response.data, `students_${new Date().toISOString().split('T')[0]}.${format}`);
      toast.success(`تم تصدير البيانات بصيغة ${format.toUpperCase()}`);
    } catch {
      toast.error('فشل تصدير البيانات');
    } finally {
      setExportLoading(false);
    }
  };

  const registrations = data?.results ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = filters.page ?? 1;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input
            type="text"
            placeholder="ابحث بالاسم أو الهاتف..."
            value={search}
            onChange={handleSearchChange}
            className="input-premium pr-9 text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status filter */}
          <select
            className="input-premium text-sm py-2.5 flex-1 sm:flex-none"
            value={filters.status ?? ''}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as RegistrationStatus | '', page: 1 }))}
          >
            <option value="">كل الحالات</option>
            <option value="pending">انتظار</option>
            <option value="paid">مدفوع</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>

          {/* Export buttons — hidden on mobile to save space */}
          <div className="hidden sm:flex items-center gap-2">
            {(['xlsx', 'csv', 'pdf'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                disabled={exportLoading}
                className="btn-ghost text-xs py-2 px-3"
                style={{ borderRadius: '10px' }}
              >
                {exportLoading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
          {/* Mobile: single export button */}
          <button
            onClick={() => handleExport('xlsx')}
            disabled={exportLoading}
            className="sm:hidden btn-ghost text-xs py-2 px-3 flex items-center gap-1"
            style={{ borderRadius: '10px' }}
          >
            {exportLoading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
            تصدير
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="glass-dark rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full admin-table">
            <thead>
              <tr>
                <th className="text-right">الطالب</th>
                <th className="text-right">ولي الأمر</th>
                <th className="text-right">الهاتف</th>
                <th className="text-right">الموعد</th>
                <th className="text-right">الحالة</th>
                <th className="text-right">تاريخ التسجيل</th>
                <th className="text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j}><div className="skeleton h-4 rounded" style={{ width: `${60 + Math.random() * 40}%` }} /></td>
                    ))}
                  </tr>
                ))
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-white/30">
                    لا توجد نتائج
                  </td>
                </tr>
              ) : (
                registrations.map((reg: Registration) => (
                  <motion.tr
                    key={reg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    <td>
                      <div className="font-semibold text-white">{reg.student.full_name}</div>
                      <div className="text-xs text-white/40">{reg.student.school}</div>
                    </td>
                    <td className="text-white/70">{reg.student.parent_name}</td>
                    <td>
                      <div className="flex items-center gap-2" dir="ltr">
                        <span className="text-white/70 text-sm">{reg.student.phone}</span>
                        <a
                          href={`tel:${reg.student.phone}`}
                          className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                          title="اتصال"
                        >
                          <Phone size={11} className="text-blue-400" />
                        </a>
                        <a
                          href={whatsappLink(reg.student.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors"
                          title="واتساب"
                        >
                          <MessageCircle size={11} className="text-green-400" />
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="font-semibold text-white/90 text-sm">{reg.schedule?.day_display || 'السبت والثلاثاء'}</div>
                      <div className="text-xs text-cyan-400/90 font-medium mt-0.5">{reg.schedule?.time_display || '3:00 مساءً'}</div>
                    </td>
                    <td>
                      <AnimatePresence mode="wait">
                        {editingId === reg.id ? (
                          <motion.select
                            key="edit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="input-premium text-xs py-1.5"
                            defaultValue={reg.status}
                            onChange={(e) => handleStatusChange(reg.id, e.target.value as RegistrationStatus)}
                            onBlur={() => setEditingId(null)}
                            autoFocus
                            style={{ minWidth: '100px', borderRadius: '8px' }}
                          >
                            {(Object.entries(STATUS_LABELS) as [RegistrationStatus, string][]).map(([v, l]) => (
                              <option key={v} value={v}>{l}</option>
                            ))}
                          </motion.select>
                        ) : (
                          <motion.button
                            key="display"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setEditingId(reg.id)}
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold cursor-pointer hover:opacity-80 ${getStatusClass(reg.status)}`}
                          >
                            {STATUS_LABELS[reg.status]}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </td>
                    <td className="text-white/40 text-sm">{formatDate(reg.registered_at)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(reg.id, reg.student.full_name)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors group"
                        title="حذف"
                      >
                        <Trash2 size={13} className="text-red-400/60 group-hover:text-red-400 transition-colors" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > PAGE_SIZE && (
          <div className="flex items-center justify-between px-3 py-3 border-t border-white/05 gap-2">
            <span className="text-white/40 text-xs sm:text-sm">
              <span className="hidden sm:inline">{total} نتيجة — </span>
              {currentPage}/{totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight size={14} className="text-white/60" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft size={14} className="text-white/60" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
