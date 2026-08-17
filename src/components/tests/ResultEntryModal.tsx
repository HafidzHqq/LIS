import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Save, 
  Camera,
  Info
} from 'lucide-react';
import { Sample, TestResult } from '../../types';

export const ResultEntryModal: React.FC = () => {
  const { 
    showResultEntryModal, 
    setShowResultEntryModal, 
    addSampleTestResult, 
    currentUser, 
    setSelectedSample 
  } = useApp();

  const sample = showResultEntryModal;

  const [resultsData, setResultsData] = useState<Record<string, { value: string; notes: string }>>(() => {
    if (!sample) return {};
    const initial: Record<string, { value: string; notes: string }> = {};
    sample.parameters.forEach(p => {
      const existing = sample.results.find(r => r.parameterId === p.id);
      initial[p.id] = {
        value: existing ? existing.value : '',
        notes: existing ? existing.notes || '' : ''
      };
    });
    return initial;
  });

  if (!sample) return null;

  const handleValueChange = (paramId: string, val: string) => {
    setResultsData(prev => ({
      ...prev,
      [paramId]: {
        ...prev[paramId],
        value: val
      }
    }));
  };

  const handleNotesChange = (paramId: string, note: string) => {
    setResultsData(prev => ({
      ...prev,
      [paramId]: {
        ...prev[paramId],
        notes: note
      }
    }));
  };

  const calculateStatus = (param: any, valStr: string): 'Normal' | 'Abnormal' | 'Critical' => {
    const num = parseFloat(valStr);
    if (isNaN(num)) {
      if (valStr.toLowerCase().includes('positif') || valStr.toLowerCase().includes('reaktif')) {
        return 'Abnormal';
      }
      return 'Normal';
    }

    if (param.referenceMin !== undefined && param.referenceMax !== undefined) {
      if (num < param.referenceMin * 0.7 || num > param.referenceMax * 1.5) return 'Critical';
      if (num < param.referenceMin || num > param.referenceMax) return 'Abnormal';
      return 'Normal';
    }

    if (param.referenceMax !== undefined) {
      if (num > param.referenceMax * 1.5) return 'Critical';
      if (num > param.referenceMax) return 'Abnormal';
      return 'Normal';
    }

    return 'Normal';
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    sample.parameters.forEach(param => {
      const entry = resultsData[param.id];
      if (entry && entry.value.trim()) {
        const numVal = parseFloat(entry.value);
        const status = calculateStatus(param, entry.value);
        const refStr = param.referenceText || `${param.referenceMin ?? 0} - ${param.referenceMax ?? '-'} ${param.unit}`;

        const testResult: TestResult = {
          parameterId: param.id,
          parameterName: param.name,
          unit: param.unit,
          value: entry.value,
          numericValue: isNaN(numVal) ? undefined : numVal,
          referenceRange: refStr,
          status,
          notes: entry.notes,
          analystName: currentUser.name,
          analystId: currentUser.id,
          enteredAt: timeStr
        };

        addSampleTestResult(sample.id, testResult);
      }
    });

    setShowResultEntryModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[4px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-black/10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-[#f5f5f7] border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center font-bold">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1d1d1f]">Input Hasil Pengujian Parameter</h3>
              <p className="text-[10px] text-[#7a7a7a]">
                {sample.sampleCode} • {sample.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowResultEntryModal(null)}
            className="w-8 h-8 rounded-[4px] bg-white text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center border border-black/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Parameters List */}
        <form onSubmit={handleSaveAll} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-[#0066cc]/10 text-[#0066cc] p-3 rounded-[4px] text-xs flex items-center gap-2 border border-[#0066cc]/20">
            <Info className="w-4 h-4 shrink-0" />
            <span>Sistem akan otomatis mengevaluasi status rujukan (Normal/Abnormal/Critical).</span>
          </div>

          {sample.parameters.map((param, idx) => {
            const entry = resultsData[param.id] || { value: '', notes: '' };
            const status = entry.value ? calculateStatus(param, entry.value) : 'Pending';

            return (
              <div key={param.id} className="bg-[#f5f5f7] p-3.5 rounded-[4px] space-y-2 border border-black/[0.04]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#1d1d1f]">
                      {idx + 1}. {param.name}
                    </h4>
                    <span className="text-[10px] text-[#7a7a7a]">
                      Rujukan: {param.referenceText || `${param.referenceMin ?? 0} - ${param.referenceMax ?? '-'} ${param.unit}`} • Metode: {param.method}
                    </span>
                  </div>
                  {entry.value && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] ${
                      status === 'Critical' ? 'bg-[#ff3b30]/15 text-[#ff3b30]' :
                      status === 'Abnormal' ? 'bg-[#ff9f0a]/15 text-[#ff9f0a]' : 'bg-[#34c759]/15 text-[#34c759]'
                    }`}>
                      {status}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder={`Nilai terukur (${param.unit})...`}
                      value={entry.value}
                      onChange={(e) => handleValueChange(param.id, e.target.value)}
                      className="w-full bg-white border border-[#e0e0e0] text-xs font-semibold text-[#1d1d1f] rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                    />
                  </div>
                  <div className="text-xs text-[#7a7a7a] font-medium truncate">
                    {param.unit}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Catatan / observasi mikroskopis / duplo..."
                  value={entry.notes}
                  onChange={(e) => handleNotesChange(param.id, e.target.value)}
                  className="w-full bg-white/70 border border-[#e0e0e0] text-[11px] text-[#333333] rounded-[4px] px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                />
              </div>
            );
          })}

          {/* Action Footer */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowResultEntryModal(null)}
              className="px-4 py-2.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-[4px] hover:bg-[#e0e0e0]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-[#0066cc]/30"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Kirim ke Validasi QC</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
