import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  History, 
  ShieldCheck, 
  Search, 
  User, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  Lock
} from 'lucide-react';

export const AuditTrailScreen: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Banner */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#34c759]" />
            <span className="text-xs font-semibold text-[#cccccc]">Audit Trail & Keamanan Sistem</span>
          </div>
          <span className="text-[10px] bg-[#34c759]/20 text-[#34c759] px-2.5 py-0.5 rounded-[4px] font-bold border border-[#34c759]/30">
            Immutable Log
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1 font-apple-display">
          Catatan Jejak Digital 21 CFR Part 11
        </h2>
        <p className="text-xs text-[#cccccc] mb-2 leading-relaxed">
          Semua aktivitas modifikasi sampel, otorisasi COA, perubahan peran, dan transaksi tercatat permanen.
        </p>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari nama staf, aksi, ID sampel, atau IP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white text-xs text-[#1d1d1f] rounded-[4px] pl-9 pr-4 py-2.5 border border-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#0066cc] shadow-sm"
        />
        <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 top-3 pointer-events-none" />
      </div>

      {/* Logs List */}
      <div className="space-y-2.5">
        {filteredLogs.map(log => (
          <Card key={log.id} className="p-3.5">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0066cc] bg-[#0066cc]/10 px-2 py-0.5 rounded-[4px]">
                  {log.action}
                </span>
                <h4 className="text-xs font-bold text-[#1d1d1f] mt-1">
                  {log.target}
                </h4>
              </div>
              <span className="text-[10px] text-[#7a7a7a] shrink-0 font-mono">
                {log.timestamp}
              </span>
            </div>

            <p className="text-xs text-[#333333] leading-relaxed mb-2 bg-[#f5f5f7] p-2 rounded-[4px]">
              {log.details}
            </p>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-[#7a7a7a] pt-1 border-t border-black/[0.04] gap-1">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-[#0066cc]" />
                <span><strong>{log.userName}</strong> ({log.role})</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                <span>{log.device}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>IP: {log.ipAddress}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
