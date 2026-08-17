import React, { useState } from 'react';
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
  Search,
  MoreHorizontal,
  X
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab, currentRole } = useApp();
  const [showMore, setShowMore] = useState(false);

  const getNavItems = () => {
    switch (currentRole) {
      case 'CUSTOMER':
        return {
          primary: [
            { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
            { id: 'samples', label: 'Tracking', icon: Search },
            { id: 'reports', label: 'Hasil COA', icon: FileCheck2 },
            { id: 'ai', label: 'Tanya AI', icon: Sparkles }
          ],
          overflow: [] as { id: string; label: string; icon: any }[]
        };
      case 'ANALYST':
        return {
          primary: [
            { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
            { id: 'tests', label: 'Input Hasil', icon: FlaskConical },
            { id: 'samples', label: 'Sampel', icon: TestTube2 },
            { id: 'inventory', label: 'Reagen', icon: Boxes },
            { id: 'ai', label: 'LIMY AI', icon: Sparkles }
          ],
          overflow: []
        };
      case 'QC_OFFICER':
        return {
          primary: [
            { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
            { id: 'qc', label: 'QC Mutu', icon: Activity },
            { id: 'samples', label: 'Sampel', icon: TestTube2 },
            { id: 'equipment', label: 'Alat Lab', icon: Sliders },
            { id: 'ai', label: 'LIMY AI', icon: Sparkles }
          ],
          overflow: []
        };
      default: // SUPER_ADMIN & LAB_MANAGER — max 5 primary tabs + overflow
        return {
          primary: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'samples', label: 'Sampel', icon: TestTube2 },
            { id: 'tests', label: 'Pengujian', icon: FlaskConical },
            { id: 'inventory', label: 'Reagensia', icon: Boxes },
          ],
          overflow: [
            { id: 'equipment', label: 'Alat Lab & Kalibrasi', icon: Sliders },
            { id: 'qc', label: 'Quality Control Mutu', icon: Activity },
            { id: 'reports', label: 'Sertifikat & Laporan', icon: FileCheck2 },
            { id: 'audit', label: 'Audit Trail & Log', icon: History },
            { id: 'ai', label: 'LIMY AI Assistant', icon: Sparkles }
          ]
        };
    }
  };

  const { primary, overflow } = getNavItems();
  const isOverflowActive = overflow.some(item => item.id === activeTab);

  return (
    <>
      <nav className="sticky bottom-0 z-30 w-full bg-[#f5f5f7]/95 backdrop-blur-2xl border-t border-black/[0.08] px-2 py-1.5 flex items-center justify-around shadow-lg">
        <div className="flex items-center justify-around w-full max-w-lg mx-auto gap-1">
          {primary.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setShowMore(false); }}
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
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-tr from-[#af52de] to-[#2997ff] animate-ping"></span>
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

          {/* More button — only shown for roles with overflow items */}
          {overflow.length > 0 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-[4px] transition-all duration-200 min-w-[54px] active:scale-90 ${
                isOverflowActive || showMore
                  ? 'text-[#0066cc] font-semibold'
                  : 'text-[#7a7a7a] hover:text-[#1d1d1f]'
              }`}
            >
              <div className={`relative p-1 rounded-[4px] transition-all ${
                isOverflowActive || showMore ? 'bg-[#0066cc]/10' : 'bg-transparent'
              }`}>
                {showMore
                  ? <X className="w-5 h-5 stroke-[2.2]" />
                  : <MoreHorizontal className={`w-5 h-5 transition-transform ${isOverflowActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.7]'}`} />
                }
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                isOverflowActive || showMore ? 'font-semibold text-[#0066cc]' : 'font-normal text-[#7a7a7a]'
              }`}>
                Lainnya
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* "More" overflow sheet */}
      {showMore && overflow.length > 0 && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-[60px] left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-black/[0.08] shadow-2xl animate-in slide-in-from-bottom-4 duration-200 rounded-t-[4px]">
            <div className="max-w-lg mx-auto p-3 grid grid-cols-3 gap-2">
              {overflow.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(item.id);
                      setShowMore(false);
                    }}
                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-[4px] transition-all active:scale-95 ${
                      isActive
                        ? 'bg-[#0066cc]/10 text-[#0066cc]'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[#0066cc] stroke-[2.2]' : 'text-[#7a7a7a] stroke-[1.7]'}`} />
                    <span className={`text-[10px] text-center leading-tight ${isActive ? 'font-semibold text-[#0066cc]' : 'font-medium text-[#1d1d1f]'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
