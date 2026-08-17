import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatWidget } from '../common/StatWidget';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  TestTube2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Boxes, 
  Sliders, 
  Activity, 
  ArrowRight,
  Sparkles,
  QrCode,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    samples, 
    inventory, 
    equipment, 
    qcSamples, 
    setActiveTab, 
    setSelectedSample, 
    setShowRegistration, 
    setShowScanner,
    activeBranch 
  } = useApp();

  const totalSamples = samples.length;
  const approvedSamples = samples.filter(s => s.status === 'Approved').length;
  const inProgressSamples = samples.filter(s => ['Received', 'Processing', 'Testing', 'QC Review'].includes(s.status)).length;
  const criticalSamples = samples.filter(s => s.priority === 'STAT' || s.priority === 'Urgent').length;
  
  const lowStockItems = inventory.filter(i => i.status === 'Low' || i.status === 'Expired');
  const calibDueEquipment = equipment.filter(e => e.status === 'Calibration Due' || e.daysUntilCalibration <= 7);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': return <Badge variant="green">Approved</Badge>;
      case 'QC Review': return <Badge variant="amber">QC Review</Badge>;
      case 'Testing': return <Badge variant="blue">Testing</Badge>;
      case 'Processing': return <Badge variant="purple">Processing</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Hero Welcome Banner (Apple Dark Tile Style with 4px radius) */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        {/* Subtle background glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#0066cc]/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#0066cc]/30 text-[#2997ff] text-[10px] font-semibold tracking-wider uppercase border border-[#0066cc]/40">
              Pusat Kendali LIMS
            </span>
            <span className="text-xs text-[#cccccc] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#2997ff]" />
              {activeBranch.name}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white mb-1 font-apple-display">
            Efisiensi Lab 98.4%
          </h2>
          <p className="text-xs text-[#cccccc] max-w-xs leading-relaxed mb-4">
            Monitoring instrumen, akurasi pengujian, dan kontrol kualitas mutu ISO/IEC 17025 terpadu.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRegistration(true)}
              className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
            >
              <span>+ Registrasi Sampel</span>
            </button>
            <button
              onClick={() => setShowScanner(true)}
              className="bg-[#333333] hover:bg-[#444444] text-white text-xs font-medium px-3.5 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 border border-[#555555]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan Label</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary 4-Grid Metric Widgets */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatWidget
          title="Total Sampel"
          value={totalSamples}
          subtitle="Bulan Berjalan"
          icon={TestTube2}
          iconColor="#0066cc"
          trend="+12%"
          trendPositive={true}
          onClick={() => setActiveTab('samples')}
        />
        <StatWidget
          title="Sedang Diproses"
          value={inProgressSamples}
          subtitle="Dalam Workflow"
          icon={Clock}
          iconColor="#af52de"
          onClick={() => setActiveTab('samples')}
        />
        <StatWidget
          title="Selesai / COA"
          value={approvedSamples}
          subtitle="Siap Rilis"
          icon={CheckCircle2}
          iconColor="#34c759"
          trend="+8%"
          trendPositive={true}
          onClick={() => setActiveTab('reports')}
        />
        <StatWidget
          title="Prioritas STAT"
          value={criticalSamples}
          subtitle="Perlu Penanganan Cepat"
          icon={AlertTriangle}
          iconColor="#ff9f0a"
          onClick={() => setActiveTab('samples')}
        />
      </div>

      {/* Critical Alerts Banner (if any) */}
      {(lowStockItems.length > 0 || calibDueEquipment.length > 0) && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#7a7a7a] px-1 uppercase tracking-wider">
            Peringatan Operasional
          </div>

          {lowStockItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab('inventory')}
              className="p-3 bg-[#ff9f0a]/10 border border-[#ff9f0a]/30 rounded-[4px] flex items-center justify-between cursor-pointer hover:bg-[#ff9f0a]/15 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Boxes className="w-4 h-4 text-[#ff9f0a]" />
                <div>
                  <div className="text-xs font-semibold text-[#1d1d1f]">{item.name}</div>
                  <div className="text-[10px] text-[#7a7a7a]">
                    Stok tersisa: <strong className="text-[#ff3b30]">{item.currentStock} {item.unit}</strong> (Min: {item.minStock})
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7a7a7a]" />
            </div>
          ))}

          {calibDueEquipment.map(eq => (
            <div
              key={eq.id}
              onClick={() => setActiveTab('equipment')}
              className="p-3 bg-[#ff3b30]/10 border border-[#ff3b30]/30 rounded-[4px] flex items-center justify-between cursor-pointer hover:bg-[#ff3b30]/15 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#ff3b30]" />
                <div>
                  <div className="text-xs font-semibold text-[#1d1d1f]">{eq.name}</div>
                  <div className="text-[10px] text-[#ff3b30] font-medium">
                    Jatuh tempo kalibrasi dalam {eq.daysUntilCalibration} hari ({eq.nextCalibrationDate})
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7a7a7a]" />
            </div>
          ))}
        </div>
      )}

      {/* Recent Samples Flow */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-[#7a7a7a] uppercase tracking-wider">
            Aktivitas Sampel Terkini
          </span>
          <button 
            onClick={() => setActiveTab('samples')}
            className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-0.5"
          >
            <span>Semua</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {samples.length === 0 ? (
          <Card className="p-6 text-center bg-white">
            <TestTube2 className="w-8 h-8 mx-auto text-[#7a7a7a] mb-2 opacity-50" />
            <h4 className="text-xs font-bold text-[#1d1d1f]">Belum Ada Aktivitas Sampel</h4>
            <p className="text-[11px] text-[#7a7a7a] mt-1">Daftarkan sampel baru dengan menekan tombol "+ Registrasi Sampel".</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {samples.slice(0, 4).map(sample => (
              <Card
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  setActiveTab('samples');
                }}
                className="p-3 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#0066cc]">
                        {sample.sampleCode}
                      </span>
                      {sample.priority === 'STAT' && (
                        <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-[4px]">
                          STAT
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-semibold text-[#1d1d1f] truncate mt-0.5">
                      {sample.name}
                    </h4>
                  </div>
                  {getStatusBadge(sample.status)}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#7a7a7a] pt-1 border-t border-black/[0.04]">
                  <span>{sample.clientName}</span>
                  <span>{sample.category}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* AI Smart Insight Capsule */}
      <Card 
        onClick={() => setActiveTab('ai')}
        className="bg-gradient-to-br from-[#f5f5f7] to-[#e8eef8] border-[#0066cc]/20 p-4"
      >
        <div className="flex items-center gap-2 mb-1.5 text-[#0066cc]">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">LIMY AI Insight</span>
        </div>
        <p className="text-xs text-[#333333] leading-relaxed mb-2">
          Semua instrumen hematologi dan spektrometri beroperasi dalam batas kendali Westgard 1s. Rata-rata Turnaround Time (TAT) lab hari ini <strong>3.2 jam</strong> (lebih cepat 25%).
        </p>
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#0066cc]">
          <span>Buka Asisten AI Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Card>
    </div>
  );
};
