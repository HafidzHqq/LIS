import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatWidget } from '../common/StatWidget';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Sliders,
  FileCheck
} from 'lucide-react';

export const QCOfficerDashboard: React.FC = () => {
  const { samples, qcSamples, setActiveTab, setSelectedSample, validateSampleQC } = useApp();

  const samplesNeedingQC = samples.filter(s => s.status === 'QC Review' || (s.results.length === s.parameters.length && s.qcStatus === 'Pending'));
  const flaggedSamples = samples.filter(s => s.qcStatus === 'Flagged');

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* QC Hero Banner */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff9f0a]" />
            <span className="text-xs font-semibold text-[#cccccc]">Unit Penjaminan Mutu (QA/QC)</span>
          </div>
          <span className="text-[10px] bg-[#ff9f0a]/20 text-[#ff9f0a] px-2 py-0.5 rounded-[4px] font-bold border border-[#ff9f0a]/30">
            Westgard Multi-Rule OK
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1 font-apple-display">
          Akurasi Batch QC: 99.8%
        </h2>
        <p className="text-xs text-[#cccccc] mb-4">
          Validasi duplo, pengujian spike recovery, dan kalibrasi kurva standar terkontrol.
        </p>

        <button
          onClick={() => setActiveTab('qc')}
          className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Buka Grafik Levey-Jennings Mutu</span>
        </button>
      </div>

      {/* QC Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <StatWidget
          title="Menunggu QC"
          value={samplesNeedingQC.length}
          icon={Activity}
          iconColor="#ff9f0a"
        />
        <StatWidget
          title="QC Flagged"
          value={flaggedSamples.length}
          icon={AlertTriangle}
          iconColor="#ff3b30"
        />
        <StatWidget
          title="Kontrol Aktif"
          value={qcSamples.length}
          icon={CheckCircle2}
          iconColor="#34c759"
          onClick={() => setActiveTab('qc')}
        />
      </div>

      {/* Samples Pending QC Validation */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-[#7a7a7a] uppercase tracking-wider">
            Sampel Menunggu Validasi Mutu
          </span>
        </div>

        {samplesNeedingQC.length === 0 ? (
          <Card className="p-6 text-center text-[#7a7a7a]">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#34c759] mb-2 opacity-80" />
            <p className="text-xs font-medium">Semua sampel telah tervalidasi QC.</p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {samplesNeedingQC.map(sample => (
              <Card key={sample.id} className="p-3.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0066cc]">
                      {sample.sampleCode}
                    </span>
                    <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                      {sample.name}
                    </h4>
                    <p className="text-[11px] text-[#7a7a7a]">{sample.category} • Klien: {sample.clientName}</p>
                  </div>
                  <Badge variant="amber">Review QC</Badge>
                </div>

                {/* Results table mini preview */}
                <div className="bg-[#f5f5f7] rounded-[4px] p-2.5 space-y-1.5 mb-3">
                  <div className="text-[10px] font-bold text-[#7a7a7a] uppercase">Hasil Pengujian Analis:</div>
                  {sample.results.map(res => (
                    <div key={res.parameterId} className="flex items-center justify-between text-xs">
                      <span className="text-[#333333]">{res.parameterName}:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className={res.status === 'Critical' ? 'text-[#ff3b30]' : res.status === 'Abnormal' ? 'text-[#ff9f0a]' : 'text-[#1d1d1f]'}>
                          {res.value} {res.unit}
                        </strong>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-[4px] font-semibold ${
                          res.status === 'Critical' ? 'bg-[#ff3b30]/15 text-[#ff3b30]' :
                          res.status === 'Abnormal' ? 'bg-[#ff9f0a]/15 text-[#ff9f0a]' : 'bg-[#34c759]/15 text-[#34c759]'
                        }`}>
                          {res.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Validation Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => validateSampleQC(sample.id, 'Passed', 'Data duplo dan kurva standar akurat. Lolos validasi QC.')}
                    className="flex-1 bg-[#34c759] hover:bg-[#28a745] text-white text-xs font-semibold py-2 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lolos QC (Pass)</span>
                  </button>
                  <button
                    onClick={() => validateSampleQC(sample.id, 'Flagged', 'Dibutuhkan uji ulang parameter karena deviasi melebihi toleransi.')}
                    className="px-3 py-2 bg-[#ff3b30]/15 hover:bg-[#ff3b30]/25 text-[#ff3b30] text-xs font-semibold rounded-[4px] transition-all active:scale-95"
                  >
                    Flag / Uji Ulang
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* QC Sample Chart Preview Widget */}
      <Card 
        onClick={() => setActiveTab('qc')}
        className="p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0066cc]" />
            <h4 className="text-xs font-bold text-[#1d1d1f]">Levey-Jennings Kontrol Harian</h4>
          </div>
          <span className="text-[10px] text-[#0066cc] font-semibold flex items-center gap-0.5">
            Lihat Grafik <ArrowRight className="w-3 h-3" />
          </span>
        </div>
        <p className="text-xs text-[#7a7a7a] mb-2">
          Kontrol Hemoglobin (Level 2) & Standar pH 7.00 seluruhnya berada di rentang Target Mean ±1SD.
        </p>
        <div className="flex items-center gap-2 text-[10px] text-[#248a3d] font-semibold bg-[#34c759]/10 px-2.5 py-1 rounded-[4px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Status Sistem Kontrol: IN CONTROL (Stabil)</span>
        </div>
      </Card>
    </div>
  );
};
