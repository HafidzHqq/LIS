import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Activity, 
  TrendingUp, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  SlidersHorizontal,
  Info,
  Calendar
} from 'lucide-react';
import { QCSample } from '../../types';

export const QualityControlScreen: React.FC = () => {
  const { qcSamples, addQCDataPoint, currentUser } = useApp();
  const [selectedQCId, setSelectedQCId] = useState<string>(qcSamples[0]?.id || '');
  const [newVal, setNewVal] = useState('');
  const [showAddPointModal, setShowAddPointModal] = useState(false);

  const activeQC = qcSamples.find(q => q.id === selectedQCId) || qcSamples[0];

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(newVal);
    if (isNaN(num) || !activeQC) return;

    addQCDataPoint(activeQC.id, num);
    setNewVal('');
    setShowAddPointModal(false);
  };

  if (!activeQC) return null;

  const mean = activeQC.targetMean;
  const sd = activeQC.targetSD;
  const p3sd = mean + 3 * sd;
  const p2sd = mean + 2 * sd;
  const p1sd = mean + 1 * sd;
  const m1sd = mean - 1 * sd;
  const m2sd = mean - 2 * sd;
  const m3sd = mean - 3 * sd;

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* QC Header Banner */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff9f0a]" />
            <span className="text-xs font-semibold text-[#cccccc]">Grafik Kontrol Mutu (Levey-Jennings)</span>
          </div>
          <span className="text-[10px] bg-[#34c759]/20 text-[#34c759] px-2 py-0.5 rounded-[4px] font-bold border border-[#34c759]/30">
            Westgard In Control
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1 font-apple-display">
          Pemantauan Stabilitas Mutu Uji
        </h2>
        <p className="text-xs text-[#cccccc] mb-4 leading-relaxed">
          Pencegahan galat sistematik & acak melalui evaluasi kurva deviasi standar (Mean ± 3SD).
        </p>

        {currentUser.role !== 'CUSTOMER' && (
          <button
            onClick={() => setShowAddPointModal(true)}
            className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Input Nilai Running Kontrol Hari Ini</span>
          </button>
        )}
      </div>

      {/* QC Sample Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {qcSamples.map(qc => (
          <button
            key={qc.id}
            onClick={() => setSelectedQCId(qc.id)}
            className={`px-3.5 py-1.5 rounded-[4px] text-xs font-semibold whitespace-nowrap transition-all ${
              activeQC.id === qc.id
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'bg-white text-[#333333] border border-black/[0.08] hover:bg-[#f5f5f7]'
            }`}
          >
            {qc.analyteName}
          </button>
        ))}
      </div>

      {/* Levey-Jennings Visual Chart */}
      <Card className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0066cc]">
              {activeQC.code} • {activeQC.controlLevel}
            </span>
            <h3 className="text-sm font-bold text-[#1d1d1f] mt-0.5">
              {activeQC.analyteName}
            </h3>
            <p className="text-[10px] text-[#7a7a7a]">
              Instrumen: {activeQC.instrument} • Lot: {activeQC.lotNumber}
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="text-[#7a7a7a] text-[10px] block">Target Mean (SD)</span>
            <strong className="text-[#1d1d1f] font-mono">{mean} ({sd}) {activeQC.unit}</strong>
          </div>
        </div>

        {/* Visual Chart Canvas */}
        <div className="bg-[#f5f5f7] p-3 rounded-[4px] border border-black/[0.06] mb-3">
          <div className="h-48 w-full flex flex-col justify-between relative py-2 select-none">
            {/* Guide lines (+3SD, +2SD, +1SD, Mean, -1SD, -2SD, -3SD) */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-mono text-[#7a7a7a]">
              <div className="border-b border-dashed border-[#ff3b30]/40 flex justify-between pr-1">
                <span className="text-[#ff3b30]">+3SD ({p3sd.toFixed(2)})</span>
              </div>
              <div className="border-b border-dashed border-[#ff9f0a]/40 flex justify-between pr-1">
                <span className="text-[#ff9f0a]">+2SD ({p2sd.toFixed(2)})</span>
              </div>
              <div className="border-b border-dotted border-[#34c759]/40 flex justify-between pr-1">
                <span className="text-[#34c759]">+1SD ({p1sd.toFixed(2)})</span>
              </div>
              <div className="border-b-2 border-solid border-[#0066cc]/60 flex justify-between pr-1 font-bold">
                <span className="text-[#0066cc]">MEAN ({mean.toFixed(2)})</span>
              </div>
              <div className="border-b border-dotted border-[#34c759]/40 flex justify-between pr-1">
                <span className="text-[#34c759]">-1SD ({m1sd.toFixed(2)})</span>
              </div>
              <div className="border-b border-dashed border-[#ff9f0a]/40 flex justify-between pr-1">
                <span className="text-[#ff9f0a]">-2SD ({m2sd.toFixed(2)})</span>
              </div>
              <div className="border-b border-dashed border-[#ff3b30]/40 flex justify-between pr-1">
                <span className="text-[#ff3b30]">-3SD ({m3sd.toFixed(2)})</span>
              </div>
            </div>

            {/* Plotted Points */}
            <div className="relative z-10 w-full h-full flex items-center justify-around pl-16">
              {activeQC.dataPoints.map((dp, i) => {
                const range = 6 * sd;
                const offset = p3sd - dp.value;
                const topPercent = Math.max(0, Math.min(100, (offset / range) * 100));

                const isWarning = dp.status === '1s Warning';
                const isViolation = dp.status === '2s Violation';

                return (
                  <div
                    key={dp.id || i}
                    className="flex flex-col items-center group relative cursor-pointer"
                    style={{ height: '100%' }}
                  >
                    {/* Point Marker */}
                    <div
                      className={`absolute w-3.5 h-3.5 rounded-[2px] ring-2 ring-white shadow-md transform -translate-y-1/2 transition-transform group-hover:scale-125 ${
                        isViolation ? 'bg-[#ff3b30]' : isWarning ? 'bg-[#ff9f0a]' : 'bg-[#0066cc]'
                      }`}
                      style={{ top: `${topPercent}%` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:block absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-[#1d1d1f] text-white text-[9px] px-2 py-1 rounded-[4px] shadow-xl whitespace-nowrap z-30">
                        {dp.date}: <strong>{dp.value} {activeQC.unit}</strong> ({dp.status})
                      </div>
                    </div>

                    {/* Date label at bottom */}
                    <span className="absolute bottom-0 text-[8px] text-[#7a7a7a]">
                      {dp.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-around text-[10px] text-[#7a7a7a] pt-2 border-t border-black/[0.04]">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-[1px] bg-[#0066cc]"></span>
            <span>In Control (&lt; 1SD)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-[1px] bg-[#ff9f0a]"></span>
            <span>1s Warning (1-2SD)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-[1px] bg-[#ff3b30]"></span>
            <span>2s Violation (&gt; 2SD)</span>
          </div>
        </div>
      </Card>

      {/* Add Point Modal */}
      {showAddPointModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[4px] p-4 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#1d1d1f]">Input Nilai QC Running Harian</h3>
              <button onClick={() => setShowAddPointModal(false)} className="text-xs text-[#7a7a7a]">✕</button>
            </div>
            <form onSubmit={handleAddPoint} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1">
                  Nilai Terukur ({activeQC.unit}) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  autoFocus
                  placeholder={`Target: ${mean} ${activeQC.unit}`}
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs font-bold rounded-[4px] p-3 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPointModal(false)}
                  className="px-4 py-2 bg-[#f5f5f7] text-xs font-semibold rounded-[4px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0066cc] text-white text-xs font-semibold py-2 rounded-[4px]"
                >
                  Plot Nilai ke Grafik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
