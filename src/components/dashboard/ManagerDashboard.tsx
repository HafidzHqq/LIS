import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatWidget } from '../common/StatWidget';
import { Card } from '../common/Card';
import { 
  TrendingUp, 
  Timer, 
  CheckCheck, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Sparkles,
  BarChart3,
  Award
} from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  const { samples, equipment, setActiveTab, setSelectedSample, setShowCOAModal } = useApp();

  const approvedSamples = samples.filter(s => s.status === 'Approved');
  const awaitingManagerApproval = samples.filter(s => s.qcStatus === 'Passed' && !s.coaGenerated);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Manager Metric Tile */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#af52de]" />
            <span className="text-xs font-semibold text-[#cccccc]">Eksekutif Manajemen Lab</span>
          </div>
          <span className="text-[10px] bg-[#af52de]/20 text-[#af52de] px-2.5 py-0.5 rounded-[4px] font-bold border border-[#af52de]/30">
            SOP Mutu ISO 17025
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1 font-apple-display">
          Rata-rata TAT: 3.4 Jam
        </h2>
        <p className="text-xs text-[#cccccc] mb-4 leading-relaxed">
          Pencapaian Turnaround Time melampaui target SLA laboratorium (Target: 6.0 Jam).
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#1d1d1f] p-2.5 rounded-[4px] border border-[#333333]">
            <div className="text-[#7a7a7a] text-[10px]">Utilisasi Alat</div>
            <div className="text-sm font-bold text-[#34c759]">92.8% Optimal</div>
          </div>
          <div className="bg-[#1d1d1f] p-2.5 rounded-[4px] border border-[#333333]">
            <div className="text-[#7a7a7a] text-[10px]">Tingkat Akurasi QC</div>
            <div className="text-sm font-bold text-[#2997ff]">99.6% Passed</div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatWidget
          title="Turnaround Time"
          value="3.4h"
          subtitle="Target SLA: 6.0h"
          icon={Timer}
          iconColor="#34c759"
          trend="-25%"
          trendPositive={true}
        />
        <StatWidget
          title="Menunggu Rilis COA"
          value={awaitingManagerApproval.length}
          subtitle="Tervalidasi QC"
          icon={CheckCheck}
          iconColor="#af52de"
          onClick={() => setActiveTab('reports')}
        />
        <StatWidget
          title="Sertifikat Terbit"
          value={approvedSamples.length}
          subtitle="Bulan Ini"
          icon={ShieldCheck}
          iconColor="#0066cc"
          trend="+15%"
          trendPositive={true}
          onClick={() => setActiveTab('reports')}
        />
        <StatWidget
          title="Status Instrumen"
          value={`${equipment.filter(e => e.status === 'Active').length}/${equipment.length}`}
          subtitle="Instrumen Aktif"
          icon={Sliders}
          iconColor="#ff9f0a"
          onClick={() => setActiveTab('equipment')}
        />
      </div>

      {/* Pending Final Sign-off Samples */}
      {awaitingManagerApproval.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold text-[#af52de] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[2px] bg-[#af52de] animate-ping"></span>
              Menunggu Otorisasi Final Manager
            </span>
          </div>

          <div className="space-y-2">
            {awaitingManagerApproval.map(sample => (
              <Card key={sample.id} className="p-3.5 border-[#af52de]/30 bg-white">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#af52de]">
                      {sample.sampleCode}
                    </span>
                    <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                      {sample.name}
                    </h4>
                    <p className="text-[11px] text-[#7a7a7a]">Klien: {sample.clientName}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-[#34c759]/15 text-[#248a3d]">
                    QC PASSED
                  </span>
                </div>

                <div className="text-[11px] text-[#333333] bg-[#f5f5f7] p-2 rounded-[4px] mb-3">
                  <strong>Catatan QC ({sample.qcReviewer}):</strong> {sample.qcNotes || 'Semua parameter dalam batas rujukan valid.'}
                </div>

                <button
                  onClick={() => setShowCOAModal(sample)}
                  className="w-full bg-[#af52de] hover:bg-[#8944ab] text-white text-xs font-semibold py-2 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Review & Otorisasi Sertifikat Hasil (COA)</span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Laboratory Productivity Analysis Chart Preview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0066cc]" />
            <h4 className="text-xs font-bold text-[#1d1d1f]">Produktivitas Departemen Lab</h4>
          </div>
          <span className="text-[10px] text-[#7a7a7a]">Agustus 2026</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#333333]">Lab Kimia & Lingkungan</span>
              <span className="font-semibold text-[#1d1d1f]">42 Sampel (96%)</span>
            </div>
            <div className="w-full h-2 bg-[#f5f5f7] rounded-[2px] overflow-hidden">
              <div className="h-full bg-[#0066cc] rounded-[2px]" style={{ width: '96%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#333333]">Lab Hematologi & Klinis</span>
              <span className="font-semibold text-[#1d1d1f]">58 Sampel (99%)</span>
            </div>
            <div className="w-full h-2 bg-[#f5f5f7] rounded-[2px] overflow-hidden">
              <div className="h-full bg-[#34c759] rounded-[2px]" style={{ width: '99%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#333333]">Lab Mikrobiologi & Sterilitas</span>
              <span className="font-semibold text-[#1d1d1f]">29 Sampel (91%)</span>
            </div>
            <div className="w-full h-2 bg-[#f5f5f7] rounded-[2px] overflow-hidden">
              <div className="h-full bg-[#af52de] rounded-[2px]" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
