import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatWidget } from '../common/StatWidget';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  FlaskConical, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  ArrowRight,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';

export const AnalystDashboard: React.FC = () => {
  const { 
    samples, 
    currentUser, 
    setActiveTab, 
    setSelectedSample, 
    setShowResultEntryModal 
  } = useApp();

  const assignedSamples = samples.filter(s => ['Received', 'Processing', 'Testing'].includes(s.status));
  const pendingResultEntry = samples.filter(s => s.results.length < s.parameters.length);
  const completedToday = samples.filter(s => s.results.length >= s.parameters.length && s.results.length > 0);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Analyst Header Card */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#34c759]" />
            <span className="text-xs font-semibold text-[#cccccc]">Meja Kerja Analis</span>
          </div>
          <span className="text-[10px] bg-[#34c759]/20 text-[#34c759] px-2 py-0.5 rounded-[4px] font-semibold border border-[#34c759]/30">
            Shift Aktif: {currentUser.shift?.split(' ')[0] || 'Shift 1'}
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1">
          {currentUser.name}
        </h2>
        <p className="text-xs text-[#cccccc] mb-3">
          {currentUser.department} • Lab Siap Running
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tests')}
            className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Input Hasil Uji Cepat</span>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <StatWidget
          title="Antrean Uji"
          value={assignedSamples.length}
          icon={Clock}
          iconColor="#af52de"
        />
        <StatWidget
          title="Belum Input"
          value={pendingResultEntry.length}
          icon={AlertCircle}
          iconColor="#ff9f0a"
        />
        <StatWidget
          title="Selesai Shift"
          value={completedToday.length}
          icon={CheckCircle2}
          iconColor="#34c759"
        />
      </div>

      {/* Action Queue: Samples waiting for testing */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-[#7a7a7a] uppercase tracking-wider">
            Antrean Sampel Prioritas
          </span>
          <button
            onClick={() => setActiveTab('tests')}
            className="text-xs font-semibold text-[#0066cc] hover:underline"
          >
            Lihat Semua Antrean
          </button>
        </div>

        {assignedSamples.length === 0 ? (
          <Card className="p-6 text-center bg-white">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#34c759] mb-2 opacity-80" />
            <h4 className="text-xs font-bold text-[#1d1d1f]">Tidak Ada Antrean Pengujian</h4>
            <p className="text-[11px] text-[#7a7a7a] mt-1">Seluruh sampel pengujian telah diselesaikan.</p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {assignedSamples.map(sample => {
            const completedParams = sample.results.length;
            const totalParams = sample.parameters.length;
            const progressPercent = totalParams > 0 ? (completedParams / totalParams) * 100 : 0;

            return (
              <Card key={sample.id} className="p-3.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-[#0066cc]">
                        {sample.sampleCode}
                      </span>
                      {sample.priority === 'STAT' && (
                        <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-[4px] animate-pulse">
                          STAT CITO
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                      {sample.name}
                    </h4>
                    <p className="text-[11px] text-[#7a7a7a]">{sample.category} • {sample.collectionLocation}</p>
                  </div>
                  <Badge variant={sample.status === 'Testing' ? 'blue' : 'purple'}>
                    {sample.status}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-[#7a7a7a] mb-1">
                    <span>Progres Parameter Uji</span>
                    <span className="font-semibold text-[#1d1d1f]">{completedParams} / {totalParams} parameter</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e0e0e0] rounded-[2px] overflow-hidden">
                    <div 
                      className="h-full bg-[#0066cc] rounded-[2px] transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Parameters list preview */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {sample.parameters.map(p => {
                    const hasResult = sample.results.some(r => r.parameterId === p.id);
                    return (
                      <span
                        key={p.id}
                        className={`text-[10px] px-2 py-0.5 rounded-[4px] border font-medium ${
                          hasResult 
                            ? 'bg-[#34c759]/10 text-[#248a3d] border-[#34c759]/30' 
                            : 'bg-[#f5f5f7] text-[#7a7a7a] border-[#e0e0e0]'
                        }`}
                      >
                        {hasResult ? '✓ ' : '○ '}{p.name}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05]">
                  <button
                    onClick={() => setShowResultEntryModal(sample)}
                    className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Input / Edit Hasil Uji</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSample(sample);
                      setActiveTab('samples');
                    }}
                    className="px-3 py-2 bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs font-medium rounded-[4px] transition-all"
                  >
                    Detail
                  </button>
                </div>
              </Card>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
};
