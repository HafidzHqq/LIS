import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  TestTube2, 
  FlaskConical, 
  Boxes, 
  Sliders, 
  Activity, 
  FileCheck2, 
  History, 
  Sparkles,
  Search
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab, currentRole } = useApp();

  const getNavItems = () => {
    switch (currentRole) {
      case 'CUSTOMER':
        return [
          { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
          { id: 'samples', label: 'Tracking', icon: Search },
          { id: 'reports', label: 'Hasil COA', icon: FileCheck2 },
          { id: 'ai', label: 'Tanya AI', icon: Sparkles }
        ];
      case 'ANALYST':
        return [
          { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
          { id: 'tests', label: 'Input Hasil', icon: FlaskConical },
          { id: 'samples', label: 'Sampel', icon: TestTube2 },
          { id: 'inventory', label: 'Reagen', icon: Boxes },
          { id: 'ai', label: 'LIMY AI', icon: Sparkles }
        ];
      case 'QC_OFFICER':
        return [
          { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
          { id: 'qc', label: 'QC Mutu', icon: Activity },
          { id: 'samples', label: 'Sampel', icon: TestTube2 },
          { id: 'equipment', label: 'Alat Lab', icon: Sliders },
          { id: 'ai', label: 'LIMY AI', icon: Sparkles }
        ];
      default: // SUPER_ADMIN & LAB_MANAGER
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'samples', label: 'Sampel', icon: TestTube2 },
          { id: 'tests', label: 'Pengujian', icon: FlaskConical },
          { id: 'inventory', label: 'Reagensia', icon: Boxes },
          { id: 'equipment', label: 'Alat Lab', icon: Sliders },
          { id: 'qc', label: 'Mutu QC', icon: Activity },
          { id: 'reports', label: 'Laporan', icon: FileCheck2 },
          { id: 'audit', label: 'Audit', icon: History },
          { id: 'ai', label: 'AI Bot', icon: Sparkles }
        ];
    }
  };

  const items = getNavItems();

  return (
    <nav className="sticky bottom-0 z-30 w-full bg-[#f5f5f7]/95 backdrop-blur-2xl border-t border-black/[0.08] px-2 py-1.5 flex items-center justify-around shadow-lg">
      <div className="flex items-center justify-around w-full max-w-lg mx-auto overflow-x-auto no-scrollbar gap-1">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-[4px] transition-all duration-200 min-w-[54px] active:scale-90 ${
                isActive
                  ? 'text-[#0066cc] font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
              }`}
            >
              <div className={`relative p-1 rounded-[4px] transition-all ${
                isActive ? 'bg-[#0066cc]/10' : 'bg-transparent'
              }`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.7]'}`} />
                {item.id === 'ai' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-[2px] bg-gradient-to-tr from-[#af52de] to-[#2997ff] animate-ping"></span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                isActive ? 'font-semibold text-[#0066cc]' : 'font-normal text-[#7a7a7a]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
