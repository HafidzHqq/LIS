import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Search, 
  Plus, 
  QrCode, 
  ShieldCheck, 
  UserCheck, 
  FlaskConical, 
  Activity, 
  Users 
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { NotificationDrawer } from '../notifications/NotificationDrawer';

export const AppHeader: React.FC = () => {
  const isNative = Capacitor.isNativePlatform();
  const { 
    currentUser, 
    activeTab, 
    searchQuery, 
    setSearchQuery, 
    setShowRegistration, 
    setShowScanner,
    notifications,
    activeBranch 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleIcon = () => {
    switch (currentUser.role) {
      case 'SUPER_ADMIN': return <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />;
      case 'LAB_MANAGER': return <UserCheck className="w-3.5 h-3.5 text-[#af52de]" />;
      case 'ANALYST': return <FlaskConical className="w-3.5 h-3.5 text-[#34c759]" />;
      case 'QC_OFFICER': return <Activity className="w-3.5 h-3.5 text-[#ff9f0a]" />;
      case 'CUSTOMER': return <Users className="w-3.5 h-3.5 text-[#5ac8fa]" />;
      default: return null;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Operasional';
      case 'samples': return 'Manajemen Sampel';
      case 'tests': return 'Pengujian & Hasil Lab';
      case 'inventory': return 'Inventaris & Reagensia';
      case 'equipment': return 'Instrumen & Kalibrasi';
      case 'qc': return 'Quality Control Mutu';
      case 'reports': return 'Sertifikat & Laporan';
      case 'audit': return 'Audit Trail & Log';
      case 'ai': return 'LIMY AI Assistant';
      case 'profile': return 'Profil Pengguna';
      default: return 'LIMY LIMS';
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-30 w-full bg-[#f5f5f7]/90 backdrop-blur-xl border-b border-black/[0.06] px-4 pb-2.5 transition-all ${
        isNative ? 'pt-10' : 'pt-2'
      }`}>
        {/* Top Mini Header: Profile Role Badge & Action Buttons */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 bg-white/80 border border-black/[0.05] rounded-[4px] px-2.5 py-1 shadow-sm">
            <img 
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
              alt={currentUser.name}
              className="w-5 h-5 rounded-[4px] object-cover ring-1 ring-[#0066cc]"
            />
            <div className="flex items-center gap-1.5">
              {getRoleIcon()}
              <span className="text-xs font-semibold text-[#1d1d1f] max-w-[130px] truncate">
                {currentUser.name.split(',')[0]}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="w-8 h-8 rounded-[4px] bg-white/80 hover:bg-white text-[#1d1d1f] border border-black/[0.05] flex items-center justify-center transition-all active:scale-95 shadow-sm"
              title="Cari Data"
            >
              <Search className="w-4 h-4 text-[#1d1d1f]" />
            </button>

            {/* Scan QR */}
            <button
              onClick={() => setShowScanner(true)}
              className="w-8 h-8 rounded-[4px] bg-white/80 hover:bg-white text-[#1d1d1f] border border-black/[0.05] flex items-center justify-center transition-all active:scale-95 shadow-sm"
              title="Scan Barcode / QR Sampel"
            >
              <QrCode className="w-4 h-4 text-[#0066cc]" />
            </button>

            {/* Register Sample (Hidden for Customer) */}
            {currentUser.role !== 'CUSTOMER' && (
              <button
                onClick={() => setShowRegistration(true)}
                className="w-8 h-8 rounded-[4px] bg-[#0066cc] hover:bg-[#0071e3] text-white flex items-center justify-center transition-all active:scale-95 shadow-sm shadow-[#0066cc]/30"
                title="Registrasi Sampel Baru"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(true)}
              className="w-8 h-8 rounded-[4px] bg-white/80 hover:bg-white text-[#1d1d1f] border border-black/[0.05] flex items-center justify-center transition-all active:scale-95 shadow-sm relative"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 text-[#1d1d1f]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff3b30] text-white text-[9px] font-bold rounded-[4px] flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Title & Branch Indicator */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f] font-apple-display">
              {getTabTitle()}
            </h1>
            <p className="text-[11px] text-[#7a7a7a] flex items-center gap-1 font-medium">
              <span>{activeBranch.name}</span>
            </p>
          </div>
        </div>

        {/* Expandable Search Input */}
        {showSearchInput && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari ID Sampel, Parameter, Pasien/Klien..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs text-[#1d1d1f] rounded-[4px] border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#0066cc] placeholder-[#7a7a7a] shadow-inner"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-[#7a7a7a] hover:text-[#1d1d1f]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Notification Drawer Modal */}
      {showNotifications && (
        <NotificationDrawer onClose={() => setShowNotifications(false)} />
      )}
    </>
  );
};
