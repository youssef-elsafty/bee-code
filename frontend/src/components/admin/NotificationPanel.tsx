'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Info, CheckCircle, AlertTriangle, AlertCircle, UserPlus } from 'lucide-react';
import { useNotifications, useMarkAllRead, useMarkNotificationsRead } from '@/hooks/useNotifications';
import { Notification, NotificationType } from '@/types';
import { timeAgo } from '@/lib/utils';

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; color: string; bg: string }> = {
  info:         { icon: Info,         color: '#2563EB', bg: 'rgba(37,99,235,0.15)' },
  success:      { icon: CheckCircle,  color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  warning:      { icon: AlertTriangle,color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  error:        { icon: AlertCircle,  color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  registration: { icon: UserPlus,    color: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
};

export default function NotificationPanel() {
  const { data, isLoading } = useNotifications({ page_size: 30 });
  const markAllRead = useMarkAllRead();
  const markRead = useMarkNotificationsRead();

  const notifications = data?.results ?? [];
  const unreadCount = notifications.filter((n: Notification) => !n.is_read).length;

  const handleMarkOne = (id: number) => {
    markRead.mutate([id]);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={20} className="text-white/70" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-black text-white"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.div>
            )}
          </div>
          <h3 className="text-white font-bold text-lg">الإشعارات</h3>
          {unreadCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              {unreadCount} جديد
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <motion.button
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCheck size={14} />
            تحديد الكل كمقروء
          </motion.button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-xl" />
          ))
        ) : notifications.length === 0 ? (
          <div className="glass-dark rounded-2xl p-12 text-center">
            <Bell size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">لا توجد إشعارات</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {notifications.map((notif: Notification) => {
              const config = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.info;
              const Icon = config.icon;
              return (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-start gap-3 p-4 rounded-xl cursor-pointer group transition-all"
                  style={{
                    background: notif.is_read ? 'rgba(255,255,255,0.02)' : 'rgba(37,99,235,0.06)',
                    border: `1px solid ${notif.is_read ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.15)'}`,
                  }}
                  onClick={() => !notif.is_read && handleMarkOne(notif.id)}
                >
                  {/* Unread dot */}
                  {!notif.is_read && (
                    <div className="notification-dot mt-1.5 flex-shrink-0" />
                  )}

                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: config.bg, border: `1px solid ${config.color}30` }}
                  >
                    <Icon size={16} style={{ color: config.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${notif.is_read ? 'text-white/60' : 'text-white'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-white/40 line-clamp-2 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-white/25 mt-1.5">{timeAgo(notif.created_at)}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
