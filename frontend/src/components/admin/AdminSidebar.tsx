'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Calendar, Bell, LogOut, ChevronLeft, Menu, X, Globe,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUnreadCount } from '@/hooks/useNotifications';

function BeeLogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
      <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
      <circle cx="20" cy="14" r="4" fill="#FCD34D" />
      <circle cx="20" cy="24" r="5" fill="#F59E0B" />
      <ellipse cx="12" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(-20 12 18)" />
      <ellipse cx="28" cy="18" rx="5" ry="3" fill="#FDE68A" opacity="0.6" transform="rotate(20 28 18)" />
    </svg>
  );
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', href: '/admin/dashboard' },
  { icon: Users, label: 'الطلاب', href: '/admin/students' },
  { icon: Calendar, label: 'المواعيد', href: '/admin/schedule' },
  { icon: Bell, label: 'الإشعارات', href: '/admin/notifications', notif: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { data: unreadCount = 0 } = useUnreadCount();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-500/10 border border-amber-400/25">
            <BeeLogoIcon />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-black text-white overflow-hidden whitespace-nowrap"
              >
                <span className="text-amber-gradient">Bee</span>
                <span className="text-white"> Code</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <motion.div
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl relative transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(37,99,235,0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(37,99,235,0.3)' : '1px solid transparent',
                }}
                whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(37,99,235,0.15)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative">
                  <item.icon
                    size={18}
                    className={isActive ? 'text-blue-400' : 'text-white/50'}
                  />
                  {item.notif && (unreadCount as number) > 0 && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-black text-white">
                      {(unreadCount as number) > 9 ? '9+' : unreadCount as number}
                    </div>
                  )}
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm font-medium relative z-10 ${isActive ? 'text-white' : 'text-white/55'}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}

        {/* Back to main website link */}
        <div className="pt-4 mt-2 border-t border-white/06">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <motion.div
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-300 hover:text-white hover:bg-purple-600/20 border border-purple-500/20 transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Globe size={18} className="text-purple-400" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium"
                  >
                    العودة للموقع الرئيسي
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* User + logout */}
      <div className="p-3 border-t border-white/06 space-y-2">
        {user && !collapsed && (
          <div className="px-3 py-2">
            <div className="text-sm font-semibold text-white">{user.username}</div>
            <div className="text-xs text-white/40 capitalize">{user.role}</div>
          </div>
        )}
        <motion.button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                تسجيل الخروج
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="admin-sidebar hidden lg:flex flex-col relative flex-shrink-0 h-screen sticky top-0"
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-20 w-6 h-6 rounded-full glass flex items-center justify-center z-10 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft
            size={12}
            className="text-white/60 transition-transform duration-300"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        <SidebarContent />
      </motion.aside>

      {/* Mobile header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: 'rgba(7,17,32,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <BeeLogoIcon />
          </div>
          <span className="font-black text-sm" style={{ color: '#F5F5F0' }}>
            <span style={{ background: 'linear-gradient(135deg,#FCD34D,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Bee</span>
            {' '}Code
          </span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="admin-sidebar lg:hidden fixed right-0 top-0 bottom-0 w-64 z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
