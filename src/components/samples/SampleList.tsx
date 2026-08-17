import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Plus, 
  Search, 
  Filter, 
  TestTube2, 
  QrCode, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  FlaskConical,
  Download
} from 'lucide-react';
import { SampleCategory, SampleStatus, Priority } from '../../types';

export const SampleList: React.FC = () => {
  const { 
    samples, 
    searchQuery, 
    setSearchQuery, 
    setSelectedSample, 
    setShowRegistration, 
    setShowScanner,
    setShowCOAModal,
    setShowResultEntryModal,
    currentUser 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'Semua Kategori' },
    { id: 'Air & Lingkungan', label: '💧 Air & Lingkungan' },
    { id: 'Darah & Klinis', label: '🩸 Darah & Klinis' },
    { id: 'Makanan & Minuman', label: '🍱 Makanan & Minuman' },
    { id: 'Farmasi & Obat', label: '💊 Farmasi & Obat' }
  ];

  const statuses: { id: string; label: string }[] = [
    { id: 'ALL', label: 'Semua Status' },
    { id: 'Registered', label: 'Registered' },
    { id: 'Received', label: 'Received' },
    { id: 'Testing', label: 'Testing' },
    { id: 'QC Review', label: 'QC Review' },
    { id: 'Approved', label: 'Approved' }
  ];

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = 
      sample.sampleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.barcode.includes(searchQuery);

    const matchesCategory = selectedCategory === 'ALL' || sample.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ALL' || sample.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: SampleStatus) => {
    switch (status) {
      case 'Approved': return <Badge variant="green">Approved</Badge>;
      case 'QC Review': return <Badge variant="amber">QC Review</Badge>;
      case 'Testing': return <Badge variant="blue">Testing</Badge>;
      case 'Processing': return <Badge variant="purple">Processing</Badge>;
      case 'Received': return <Badge variant="blue">Received</Badge>;
      case 'Registered': return <Badge variant="gray">Registered</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-3.5 pb-24">
      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'bg-white text-[#333333] border border-black/[0.08] hover:bg-[#f5f5f7]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Status Secondary Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {statuses.map(st => (
          <button
            key={st.id}
            onClick={() => setSelectedStatus(st.id)}
            className={`px-2.5 py-1 rounded-[4px] text-[11px] font-medium whitespace-nowrap transition-all ${
              selectedStatus === st.id
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-white/60 text-[#7a7a7a] border border-black/[0.05] hover:text-[#1d1d1f]'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Samples List Count Header */}
      <div className="flex items-center justify-between px-1 text-xs text-[#7a7a7a]">
        <span>Menampilkan <strong>{filteredSamples.length}</strong> Sampel</span>
        {currentUser.role !== 'CUSTOMER' && (
          <button
            onClick={() => setShowRegistration(true)}
            className="text-[#0066cc] font-semibold flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Sampel</span>
          </button>
        )}
      </div>

      {/* Samples Cards */}
      {filteredSamples.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-[4px] border border-black/[0.06] p-6">
          <TestTube2 className="w-8 h-8 mx-auto text-[#7a7a7a] mb-2 opacity-50" />
          <h4 className="text-xs font-bold text-[#1d1d1f]">Tidak Ada Sampel</h4>
          <p className="text-[11px] text-[#7a7a7a] mt-1">Coba ubah kata kunci pencarian atau filter status.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSamples.map(sample => {
            const completedParams = sample.results.length;
            const totalParams = sample.parameters.length;

            return (
              <Card
                key={sample.id}
                className="p-3.5 hover:shadow-md transition-all"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-[#0066cc]">
                        {sample.sampleCode}
                      </span>
                      {sample.priority === 'STAT' && (
                        <span className="bg-[#ff3b30] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-[4px]">
                          STAT
                        </span>
                      )}
                      {sample.priority === 'Urgent' && (
                        <span className="bg-[#ff9f0a] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-[4px]">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#1d1d1f] truncate mt-0.5">
                      {sample.name}
                    </h4>
                  </div>
                  {getStatusBadge(sample.status)}
                </div>

                {/* Sub details */}
                <div className="grid grid-cols-2 gap-1 text-[11px] text-[#7a7a7a] bg-[#f5f5f7] p-2 rounded-[4px] mb-2.5">
                  <div className="truncate">
                    <span className="text-[#333333] font-medium">Klien:</span> {sample.clientName}
                  </div>
                  <div className="truncate">
                    <span className="text-[#333333] font-medium">Kategori:</span> {sample.category}
                  </div>
                  <div className="truncate">
                    <span className="text-[#333333] font-medium">Suhu:</span> {sample.temperatureAtArrival}
                  </div>
                  <div className="truncate">
                    <span className="text-[#333333] font-medium">Progress:</span> {completedParams}/{totalParams} Uji
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="flex items-center gap-2 pt-1 border-t border-black/[0.04]">
                  <button
                    onClick={() => setSelectedSample(sample)}
                    className="flex-1 bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs font-semibold py-1.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span>Detail & Tracking</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {sample.coaGenerated ? (
                    <button
                      onClick={() => setShowCOAModal(sample)}
                      className="px-3 py-1.5 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold rounded-[4px] transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>COA</span>
                    </button>
                  ) : (
                    currentUser.role !== 'CUSTOMER' && (
                      <button
                        onClick={() => setShowResultEntryModal(sample)}
                        className="px-3 py-1.5 bg-[#0066cc]/10 hover:bg-[#0066cc]/20 text-[#0066cc] text-xs font-semibold rounded-[4px] transition-all active:scale-95 flex items-center gap-1"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Input Uji</span>
                      </button>
                    )
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
