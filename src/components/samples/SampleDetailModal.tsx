import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  TestTube2, 
  QrCode, 
  Barcode, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FlaskConical, 
  Download, 
  FileText, 
  Camera, 
  MapPin, 
  User,
  History,
  Building
} from 'lucide-react';
import { Sample, SampleStatus } from '../../types';
import { Badge } from '../common/Badge';

export const SampleDetailModal: React.FC = () => {
  const { 
    selectedSample, 
    setSelectedSample, 
    updateSampleStatus, 
    setShowCOAModal, 
    setShowResultEntryModal,
    validateSampleQC,
    approveSampleAndGenerateCOA,
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'results' | 'timeline' | 'barcode'>('info');

  if (!selectedSample) return null;

  const sample = selectedSample;

  const getStatusBadge = (status: SampleStatus) => {
    switch (status) {
      case 'Approved': return <Badge variant="green">Approved</Badge>;
      case 'QC Review': return <Badge variant="amber">QC Review</Badge>;
      case 'Testing': return <Badge variant="blue">Testing</Badge>;
      case 'Processing': return <Badge variant="purple">Processing</Badge>;
      case 'Received': return <Badge variant="blue">Received</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[4px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-black/10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-[#f5f5f7] border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center font-bold">
              <TestTube2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-[#0066cc]">{sample.sampleCode}</span>
                {getStatusBadge(sample.status)}
              </div>
              <h3 className="font-bold text-xs text-[#1d1d1f] truncate max-w-[200px]">{sample.name}</h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedSample(null)}
            className="w-8 h-8 rounded-[4px] bg-white text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center border border-black/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Navigation Bar inside Modal */}
        <div className="flex items-center border-b border-black/[0.06] bg-white px-2">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
              activeTab === 'info' ? 'border-[#0066cc] text-[#0066cc]' : 'border-transparent text-[#7a7a7a]'
            }`}
          >
            Informasi
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
              activeTab === 'results' ? 'border-[#0066cc] text-[#0066cc]' : 'border-transparent text-[#7a7a7a]'
            }`}
          >
            Hasil Uji ({sample.results.length}/{sample.parameters.length})
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
              activeTab === 'timeline' ? 'border-[#0066cc] text-[#0066cc]' : 'border-transparent text-[#7a7a7a]'
            }`}
          >
            Chain of Custody
          </button>
          <button
            onClick={() => setActiveTab('barcode')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-all ${
              activeTab === 'barcode' ? 'border-[#0066cc] text-[#0066cc]' : 'border-transparent text-[#7a7a7a]'
            }`}
          >
            QR / Barcode
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {activeTab === 'info' && (
            <div className="space-y-3">
              {/* Client & Origin */}
              <div className="bg-[#f5f5f7] p-3.5 rounded-[4px] space-y-2">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/[0.04]">
                  <span className="text-[#7a7a7a]">Klien / Instansi:</span>
                  <span className="font-semibold text-[#1d1d1f]">{sample.clientName}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/[0.04]">
                  <span className="text-[#7a7a7a]">Kategori Uji:</span>
                  <span className="font-semibold text-[#1d1d1f]">{sample.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/[0.04]">
                  <span className="text-[#7a7a7a]">Lokasi Sampling:</span>
                  <span className="font-semibold text-[#1d1d1f]">{sample.collectionLocation}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/[0.04]">
                  <span className="text-[#7a7a7a]">Waktu Pengambilan:</span>
                  <span className="font-semibold text-[#1d1d1f]">{sample.collectedAt}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-black/[0.04]">
                  <span className="text-[#7a7a7a]">Suhu Tiba di Lab:</span>
                  <span className="font-semibold text-[#1d1d1f]">{sample.temperatureAtArrival}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7a7a7a]">Kondisi Fisik:</span>
                  <span className="font-semibold text-[#34c759]">{sample.condition}</span>
                </div>
              </div>

              {/* Microscope / Specimen Image Attachment */}
              {sample.microscopePhotoUrl && (
                <div className="bg-[#f5f5f7] p-3 rounded-[4px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Foto Mikroskopis / Spesimen</span>
                    </span>
                    <span className="text-[10px] text-[#7a7a7a]">Perbesaran 1000x</span>
                  </div>
                  <img
                    src={sample.microscopePhotoUrl}
                    alt="Foto Mikroskop"
                    className="w-full h-36 object-cover rounded-[4px] border border-black/10 shadow-sm"
                  />
                </div>
              )}

              {/* Status Update Quick Action Pill */}
              {currentUser.role !== 'CUSTOMER' && (
                <div className="bg-[#f5f5f7] p-3 rounded-[4px]">
                  <span className="block text-xs font-bold text-[#1d1d1f] mb-2">
                    Pindahkan Tahap Workflow:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['Received', 'Processing', 'Testing', 'QC Review', 'Approved'] as SampleStatus[]).map(st => (
                      <button
                        key={st}
                        onClick={() => updateSampleStatus(sample.id, st)}
                        className={`py-1.5 rounded-[4px] text-[11px] font-semibold transition-all ${
                          sample.status === st 
                            ? 'bg-[#0066cc] text-white shadow-sm' 
                            : 'bg-white text-[#333333] border border-black/[0.06] hover:bg-[#e0e0e0]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-3">
              {sample.results.length === 0 ? (
                <div className="text-center py-8 bg-[#f5f5f7] rounded-[4px] p-4">
                  <FlaskConical className="w-8 h-8 mx-auto text-[#7a7a7a] mb-2 opacity-50" />
                  <p className="text-xs font-semibold text-[#1d1d1f]">Belum ada hasil uji yang dimasukkan.</p>
                  {currentUser.role !== 'CUSTOMER' && (
                    <button
                      onClick={() => setShowResultEntryModal(sample)}
                      className="mt-3 bg-[#0066cc] text-white text-xs font-semibold px-4 py-2 rounded-[4px] shadow-sm"
                    >
                      + Masukkan Hasil Uji Sekarang
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {sample.results.map(res => (
                    <div key={res.parameterId} className="bg-[#f5f5f7] p-3 rounded-[4px] border border-black/[0.04]">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h4 className="text-xs font-bold text-[#1d1d1f]">{res.parameterName}</h4>
                          <span className="text-[10px] text-[#7a7a7a]">Rujukan: {res.referenceRange}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-bold ${
                          res.status === 'Critical' ? 'bg-[#ff3b30]/15 text-[#d70015]' :
                          res.status === 'Abnormal' ? 'bg-[#ff9f0a]/15 text-[#b26a00]' : 'bg-[#34c759]/15 text-[#248a3d]'
                        }`}>
                          {res.status}
                        </span>
                      </div>

                      <div className="text-base font-bold text-[#0066cc] my-1">
                        {res.value} <span className="text-xs font-normal text-[#7a7a7a]">{res.unit}</span>
                      </div>

                      {res.notes && (
                        <p className="text-[11px] text-[#333333] bg-white p-2 rounded-[4px] border border-black/[0.04]">
                          <strong>Catatan:</strong> {res.notes}
                        </p>
                      )}

                      <div className="text-[10px] text-[#7a7a7a] mt-1.5 flex justify-between">
                        <span>Analis: {res.analystName}</span>
                        <span>{res.enteredAt}</span>
                      </div>
                    </div>
                  ))}

                  {currentUser.role !== 'CUSTOMER' && (
                    <button
                      onClick={() => setShowResultEntryModal(sample)}
                      className="w-full bg-white border border-[#0066cc] text-[#0066cc] text-xs font-semibold py-2 rounded-[4px] hover:bg-[#f5f5f7] transition-all"
                    >
                      + Tambah / Perbarui Nilai Parameter
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-3 relative pl-4 border-l-2 border-[#0066cc]/30 ml-2 py-1">
              {sample.chainOfCustody.map((event, idx) => (
                <div key={event.id || idx} className="relative mb-4 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-[2px] bg-[#0066cc] ring-4 ring-white"></div>
                  
                  <div className="bg-[#f5f5f7] p-3 rounded-[4px]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#1d1d1f]">{event.stage}</span>
                      <span className="text-[10px] text-[#7a7a7a]">{event.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-[#333333] font-medium">
                      {event.action} • {event.location}
                    </div>
                    <div className="text-[10px] text-[#7a7a7a] mt-0.5">
                      Oleh: <strong>{event.actor}</strong> ({event.role})
                    </div>
                    {event.note && (
                      <div className="text-[10px] text-[#0066cc] bg-white p-1.5 rounded-[4px] mt-1 border border-black/[0.04]">
                        {event.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'barcode' && (
            <div className="text-center space-y-4 py-3">
              {/* QR Code Container */}
              <div className="inline-block p-4 bg-white rounded-[4px] border-2 border-[#1d1d1f] shadow-lg">
                <div className="w-44 h-44 bg-[#f5f5f7] rounded-[4px] flex flex-col items-center justify-center p-3 border border-black/10 relative">
                  {/* Visual QR Simulator SVG */}
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="#1d1d1f">
                    <path d="M10 10h30v30h-30zM15 15v20h20v-20zM22 22h6v6h-6zM60 10h30v30h-30zM65 15v20h20v-20zM72 22h6v6h-6zM10 60h30v30h-30zM15 65v20h20v-20zM22 72h6v6h-6zM50 15h5v5h-5zM50 25h5v15h-5zM60 50h10v5h-10zM80 50h10v10h-10zM50 60h5v10h-5zM70 70h20v20h-20zM75 75v10h10v-10z" />
                  </svg>
                  <div className="text-[9px] font-mono text-[#7a7a7a] mt-1 truncate max-w-[150px]">
                    {sample.sampleCode}
                  </div>
                </div>
              </div>

              {/* Barcode Visual */}
              <div className="bg-[#f5f5f7] p-3 rounded-[4px] inline-block max-w-xs w-full">
                <div className="font-mono text-xl font-bold tracking-widest text-[#1d1d1f] mb-1">
                  || | ||| | || |||| | |||
                </div>
                <div className="font-mono text-xs text-[#7a7a7a]">{sample.barcode}</div>
              </div>

              <div className="text-xs text-[#7a7a7a] max-w-xs mx-auto">
                Label ini dapat dipindai langsung oleh barcode scanner instrumen lab dan smartphone kamera LIMY.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#f5f5f7] border-t border-black/[0.06] flex items-center gap-2">
          {sample.coaGenerated ? (
            <button
              onClick={() => {
                setShowCOAModal(sample);
              }}
              className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-[#0066cc]/30"
            >
              <Download className="w-4 h-4" />
              <span>Buka Certificate of Analysis (COA)</span>
            </button>
          ) : (
            currentUser.role === 'LAB_MANAGER' || currentUser.role === 'SUPER_ADMIN' ? (
              <button
                onClick={() => approveSampleAndGenerateCOA(sample.id)}
                className="flex-1 bg-[#34c759] hover:bg-[#28a745] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Otorisasi & Rilis COA Digital</span>
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
