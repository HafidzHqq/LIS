import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  BellRing
} from 'lucide-react';

interface NotificationDrawerProps {
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose }) => {
  const { notifications, markNotificationRead, setActiveTab } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-5 h-5 text-[#ff3b30] shrink-0" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-[#ff9f0a] shrink-0" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-[#34c759] shrink-0" />;
      default: return <Info className="w-5 h-5 text-[#0066cc] shrink-0" />;
    }
  };

  const handleNotificationClick = (id: string, linkTab?: string) => {
    markNotificationRead(id);
    if (linkTab) {
      setActiveTab(linkTab);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#f5f5f7] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 bg-white border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#0066cc]" />
            <h2 className="font-semibold text-base text-[#1d1d1f]">Pusat Notifikasi</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#7a7a7a]">
              <BellRing className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Tidak ada notifikasi baru.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.linkTab)}
                className={`p-3.5 rounded-[4px] bg-white border transition-all cursor-pointer ${
                  notif.read
                    ? 'border-black/[0.04] opacity-75'
                    : 'border-[#0066cc]/30 shadow-sm ring-1 ring-[#0066cc]/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notif.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-semibold text-[#1d1d1f] truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-[#7a7a7a] ml-1 shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#333333] leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-black/[0.06] text-center">
          <p className="text-[11px] text-[#7a7a7a]">
            Notifikasi real-time terintegrasi dengan sensor & alur lab
          </p>
        </div>
      </div>
    </div>
  );
};
