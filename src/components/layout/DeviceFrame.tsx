import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  RotateCcw, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/initialData';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { 
    deviceType, 
    setDeviceType, 
    currentUser, 
    switchUserByRole,
    branches,
    activeBranch,
    setActiveBranch,
    setShowScanner
  } = useApp();

  const [currentTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#121214] text-[#f5f5f7] flex flex-col items-center justify-start antialiased selection:bg-[#0066cc] selection:text-white">
      {/* Top Floating Control Bar */}
      <header className="w-full bg-[#1d1d1f]/95 backdrop-blur-md border-b border-[#272729] px-4 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-gradient-to-br from-[#0066cc] to-[#2997ff] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#0066cc]/30">
            <span className="tracking-tight">L</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-white">LIMY</span>
              <span className="text-[11px] px-2 py-0.5 rounded-[4px] bg-[#0066cc]/20 text-[#2997ff] font-medium border border-[#0066cc]/30">
                LIMS Mobile v2.0
              </span>
            </div>
            <p className="text-xs text-[#7a7a7a]">Laboratory Information Management System</p>
          </div>
        </div>

        {/* Center: Device Type Switcher (Apple / Android / Fullscreen) */}
        <div className="flex items-center bg-[#272729] p-1 rounded-[4px] border border-[#333333]">
          <button
            onClick={() => setDeviceType('iphone')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
              deviceType === 'iphone'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-[#cccccc] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 16 Pro</span>
          </button>

          <button
            onClick={() => setDeviceType('android')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
              deviceType === 'android'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-[#cccccc] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Pixel 9</span>
          </button>

          <button
            onClick={() => setDeviceType('responsive')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-all ${
              deviceType === 'responsive'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-[#cccccc] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Responsive / PWA</span>
          </button>
        </div>

        {/* Right: Quick Role Switcher & Branch Selector */}
        <div className="flex items-center gap-2">
          {/* Branch Pill */}
          <div className="relative">
            <button
              onClick={() => { setShowBranchMenu(!showBranchMenu); setShowRoleMenu(false); }}
              className="flex items-center gap-1.5 bg-[#272729] hover:bg-[#333333] border border-[#3a3a3c] text-xs px-3 py-1.5 rounded-[4px] text-white transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-[2px] bg-[#34c759] animate-pulse"></span>
              <span className="max-w-[130px] truncate">{activeBranch.city}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7a7a7a]" />
            </button>

            {showBranchMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#272729] border border-[#3a3a3c] rounded-[4px] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-wider">
                  Pilih Cabang Laboratorium
                </div>
                {branches.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setActiveBranch(b); setShowBranchMenu(false); }}
                    className={`w-full text-left px-3 py-2 rounded-[4px] text-xs flex items-center justify-between transition-colors ${
                      activeBranch.id === b.id ? 'bg-[#0066cc] text-white' : 'text-[#cccccc] hover:bg-[#333333] hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-[10px] opacity-75">{b.city} {b.isHQ ? '• Pusat HQ' : ''}</div>
                    </div>
                    {activeBranch.id === b.id && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => { setShowRoleMenu(!showRoleMenu); setShowBranchMenu(false); }}
              className="flex items-center gap-2 bg-[#272729] hover:bg-[#333333] border border-[#3a3a3c] text-xs px-3 py-1.5 rounded-[4px] text-white transition-all active:scale-95"
            >
              <img 
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                alt={currentUser.name} 
                className="w-5 h-5 rounded-[4px] object-cover ring-1 ring-[#0066cc]"
              />
              <div className="text-left">
                <span className="font-medium">{currentUser.roleTitle.split(' ')[0]}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#7a7a7a]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#272729] border border-[#3a3a3c] rounded-[4px] p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-wider">
                  Ganti Peran Pengguna (PRD Demo)
                </div>
                {DEMO_USERS.map(user => (
                  <button
                    key={user.id}
                    onClick={() => { switchUserByRole(user.role as UserRole); setShowRoleMenu(false); }}
                    className={`w-full text-left p-2 rounded-[4px] text-xs flex items-center gap-2.5 transition-colors ${
                      currentUser.role === user.role ? 'bg-[#0066cc] text-white' : 'text-[#cccccc] hover:bg-[#333333] hover:text-white'
                    }`}
                  >
                    <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-[4px] object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-[10px] opacity-75 truncate">{user.roleTitle}</div>
                    </div>
                    {currentUser.role === user.role && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Camera QR Scanner Trigger */}
          <button
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-1.5 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs px-3 py-1.5 rounded-[4px] transition-all active:scale-95 font-medium shadow-md shadow-[#0066cc]/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan QR</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-x-hidden">
        {deviceType === 'responsive' ? (
          /* Responsive / PWA Viewport */
          <div className="w-full max-w-4xl min-h-[85vh] bg-[#f5f5f7] text-[#1d1d1f] rounded-[4px] shadow-2xl overflow-hidden border border-[#272729] flex flex-col relative">
            {children}
          </div>
        ) : deviceType === 'iphone' ? (
          /* iPhone 16 Pro Device Frame */
          <div className="relative mx-auto my-4 transition-all duration-300">
            {/* Outer Titanium Bezel */}
            <div className="relative w-[390px] h-[830px] bg-[#1a1a1b] rounded-[52px] p-[10px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_2px_#333336] border border-[#48484a]/40 ring-1 ring-white/10 flex flex-col">
              
              {/* Inner Screen Bezel */}
              <div className="relative w-full h-full bg-[#f5f5f7] text-[#1d1d1f] rounded-[44px] overflow-hidden flex flex-col select-none">
                
                {/* iOS Status Bar with Dynamic Island */}
                <div className="w-full h-12 bg-transparent z-40 relative px-6 flex items-center justify-between text-xs font-semibold text-[#1d1d1f] pt-1">
                  {/* Left Time */}
                  <span className="w-12 text-left">{currentTime}</span>

                  {/* Dynamic Island Capsule */}
                  <div className="h-[28px] w-[110px] bg-[#000000] rounded-full flex items-center justify-center px-2 gap-2 shadow-sm transition-all hover:w-[130px]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0066cc] animate-pulse"></div>
                    <span className="text-[10px] font-medium text-white tracking-wider">LIMY</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                  </div>

                  {/* Right Status Icons (Signal, Wifi, Battery) */}
                  <div className="flex items-center gap-1.5 w-12 justify-end">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 15.5l-5.18-3.24C5.9 14.22 5.5 13.15 5.5 12c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5c0 1.15-.4 2.22-1.32 3.26L12 18.5z"/></svg>
                    <div className="w-4 h-2.5 border border-[#1d1d1f] rounded-[2px] p-0.5 flex items-center">
                      <div className="h-full w-2.5 bg-[#34c759] rounded-[1px]"></div>
                    </div>
                  </div>
                </div>

                {/* Mobile Content Screen */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col relative">
                  {children}
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="w-full h-6 bg-transparent flex items-center justify-center pointer-events-none pb-1">
                  <div className="w-32 h-1 bg-[#1d1d1f]/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Android Pixel 9 Pro Device Frame */
          <div className="relative mx-auto my-4 transition-all duration-300">
            {/* Outer Android Frame */}
            <div className="relative w-[392px] h-[830px] bg-[#111112] rounded-[42px] p-[8px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_2px_#272729] border border-[#333333] flex flex-col">
              
              {/* Inner Android Screen */}
              <div className="relative w-full h-full bg-[#f5f5f7] text-[#1d1d1f] rounded-[36px] overflow-hidden flex flex-col select-none">
                
                {/* Android Status Bar with Punch-hole Camera */}
                <div className="w-full h-9 bg-transparent z-40 relative px-5 flex items-center justify-between text-xs font-medium text-[#1d1d1f]">
                  {/* Left Time & Notification Dots */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{currentTime}</span>
                    <span className="w-1.5 h-1.5 rounded-[2px] bg-[#0066cc]"></span>
                  </div>

                  {/* Android Center Camera Hole */}
                  <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-[#272729] shadow-inner"></div>

                  {/* Right Android Icons (VoLTE, WiFi, Battery) */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold">5G</span>
                    <div className="w-2.5 h-3.5 bg-[#34c759] rounded-[2px]"></div>
                  </div>
                </div>

                {/* Mobile Content Screen */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col relative">
                  {children}
                </div>

                {/* Android Material Navigation Indicator */}
                <div className="w-full h-5 bg-transparent flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-1 bg-[#1d1d1f]/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
