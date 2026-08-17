import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  FlaskConical, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  PlusCircle, 
  ArrowRight,
  Filter,
  SlidersHorizontal
} from 'lucide-react';

export const TestManagementScreen: React.FC = () => {
  const { samples, setShowResultEntryModal, setSelectedSample, setActiveTab, currentUser } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');

  const allTestTasks = samples.flatMap(sample => 
    sample.parameters.map(param => {
      const result = sample.results.find(r => r.parameterId === param.id);
      return {
        sample,
        parameter: param,
        result,
        isCompleted: !!result
      };
    })
  );

  const filteredTasks = allTestTasks.filter(task => {
    if (selectedFilter === 'PENDING') return !task.isCompleted;
    if (selectedFilter === 'COMPLETED') return task.isCompleted;
    return true;
  });

  return (
    <div className="p-4 space-y-3.5 pb-24">
      {/* Top Filter Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedFilter('ALL')}
          className={`flex-1 py-1.5 rounded-[4px] text-xs font-semibold transition-all ${
            selectedFilter === 'ALL'
              ? 'bg-[#0066cc] text-white shadow-sm'
              : 'bg-white text-[#7a7a7a] border border-black/[0.06]'
          }`}
        >
          Semua Parameter ({allTestTasks.length})
        </button>
        <button
          onClick={() => setSelectedFilter('PENDING')}
          className={`flex-1 py-1.5 rounded-[4px] text-xs font-semibold transition-all ${
            selectedFilter === 'PENDING'
              ? 'bg-[#ff9f0a] text-white shadow-sm'
              : 'bg-white text-[#7a7a7a] border border-black/[0.06]'
          }`}
        >
          Antrean Uji ({allTestTasks.filter(t => !t.isCompleted).length})
        </button>
        <button
          onClick={() => setSelectedFilter('COMPLETED')}
          className={`flex-1 py-1.5 rounded-[4px] text-xs font-semibold transition-all ${
            selectedFilter === 'COMPLETED'
              ? 'bg-[#34c759] text-white shadow-sm'
              : 'bg-white text-[#7a7a7a] border border-black/[0.06]'
          }`}
        >
          Selesai ({allTestTasks.filter(t => t.isCompleted).length})
        </button>
      </div>

      {/* Test Tasks Cards */}
      <div className="space-y-2.5">
        {filteredTasks.map((task, index) => (
          <Card
            key={`${task.sample.id}-${task.parameter.id}-${index}`}
            className="p-3.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#0066cc]">
                    {task.sample.sampleCode}
                  </span>
                  {task.sample.priority === 'STAT' && (
                    <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-[4px]">
                      STAT
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                  {task.parameter.name}
                </h4>
                <p className="text-[10px] text-[#7a7a7a]">
                  Sampel: {task.sample.name} ({task.sample.category})
                </p>
              </div>

              {task.isCompleted ? (
                <span className="bg-[#34c759]/15 text-[#248a3d] text-[10px] font-bold px-2 py-0.5 rounded-[4px] border border-[#34c759]/30">
                  SELESAI
                </span>
              ) : (
                <span className="bg-[#ff9f0a]/15 text-[#b26a00] text-[10px] font-bold px-2 py-0.5 rounded-[4px] border border-[#ff9f0a]/30">
                  ANTREAN
                </span>
              )}
            </div>

            {/* Method & Spec */}
            <div className="bg-[#f5f5f7] p-2 rounded-[4px] text-[10px] text-[#7a7a7a] space-y-0.5 my-2">
              <div><strong className="text-[#333333]">Metode:</strong> {task.parameter.method}</div>
              <div>
                <strong className="text-[#333333]">Rentang Rujukan:</strong>{' '}
                {task.parameter.referenceText || `${task.parameter.referenceMin ?? 0} - ${task.parameter.referenceMax ?? '-'} ${task.parameter.unit}`}
              </div>
              {task.result && (
                <div className="pt-1 mt-1 border-t border-black/[0.04] text-xs">
                  <strong className="text-[#1d1d1f]">Nilai Terukur: </strong>
                  <span className="font-bold text-[#0066cc]">{task.result.value} {task.result.unit}</span>
                  <span className={`ml-2 text-[10px] font-semibold px-1.5 py-0.2 rounded-[4px] ${
                    task.result.status === 'Critical' ? 'bg-[#ff3b30]/15 text-[#d70015]' :
                    task.result.status === 'Abnormal' ? 'bg-[#ff9f0a]/15 text-[#b26a00]' : 'bg-[#34c759]/15 text-[#248a3d]'
                  }`}>
                    {task.result.status}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowResultEntryModal(task.sample)}
                className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-1.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>{task.isCompleted ? 'Edit Nilai Uji' : 'Input Hasil Pengujian'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedSample(task.sample);
                  setActiveTab('samples');
                }}
                className="px-3 py-1.5 bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs font-medium rounded-[4px]"
              >
                Sampel
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
