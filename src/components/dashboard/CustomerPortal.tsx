import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Search, 
  FileCheck2, 
  TestTube2, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  QrCode,
  ArrowRight
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const { samples, currentUser, setSelectedSample, setShowCOAModal, setShowScanner, setActiveTab } = useApp();
  const [trackInput, setTrackInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const mySamples = samples.filter(s => 
    s.clientEmail.toLowerCase() === currentUser.email.toLowerCase() ||
    s.clientName.toLowerCase().includes('tirta') ||
    true
  );

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const found = samples.find(s => 
      s.sampleCode.toLowerCase().includes(trackInput.toLowerCase().trim()) ||
      s.barcode.includes(trackInput.trim()) ||
      s.name.toLowerCase().includes(trackInput.toLowerCase().trim())
    );
    setSearchResult(found || 'NOT_FOUND');
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Customer Hero Banner */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#2997ff]">Portal Klien & Pelanggan</span>
          <span className="text-[10px] bg-[#2997ff]/20 text-[#2997ff] px-2 py-0.5 rounded-[4px] font-bold border border-[#2997ff]/30">
            Terverifikasi
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1 font-apple-display">
          Lacak Hasil Uji Laboratorium
        </h2>
        <p className="text-xs text-[#cccccc] mb-4">
          Pantau status progres sampel Anda secara real-time dan unduh Certificate of Analysis (COA) resmi.
        </p>

        {/* Quick Tracking Search Bar */}
        <form onSubmit={handleTrackSubmit} className="relative flex items-center">
          <input
            type="text"
            placeholder="Masukkan ID Sampel (cth: LIMY-2026-0817-001)..."
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            className="w-full bg-white text-xs text-[#1d1d1f] rounded-[4px] pl-9 pr-24 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc] shadow-md"
          />
          <Search className="w-4 h-4 text-[#7a7a7a] absolute left-3 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] transition-all active:scale-95"
          >
            Lacak
          </button>
        </form>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[11px] text-[#cccccc]">
          <span>Punya barcode fisik?</span>
          <button
            onClick={() => setShowScanner(true)}
            className="text-[#2997ff] font-semibold flex items-center gap-1 hover:underline"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Label</span>
          </button>
        </div>
      </div>

      {/* Tracking Search Result Pop-up (if queried) */}
      {searchResult && (
        <div>
          {searchResult === 'NOT_FOUND' ? (
            <Card className="p-4 bg-[#ff3b30]/10 border-[#ff3b30]/30 text-center">
              <p className="text-xs text-[#ff3b30] font-semibold">
                Sampel dengan ID/Barcode "{trackInput}" tidak ditemukan dalam sistem.
              </p>
            </Card>
          ) : (
            <Card className="p-4 border-[#0066cc]/40 shadow-md">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0066cc]">
                    {searchResult.sampleCode}
                  </span>
                  <h4 className="text-sm font-bold text-[#1d1d1f] mt-0.5">
                    {searchResult.name}
                  </h4>
                  <p className="text-xs text-[#7a7a7a]">{searchResult.category}</p>
                </div>
                <Badge variant={searchResult.status === 'Approved' ? 'green' : 'blue'}>
                  {searchResult.status}
                </Badge>
              </div>

              {/* Status Timeline bar */}
              <div className="bg-[#f5f5f7] p-2.5 rounded-[4px] my-3">
                <div className="text-[11px] font-semibold text-[#1d1d1f] mb-1">
                  Tahap: {searchResult.status === 'Approved' ? 'Selesai & Sertifikat Terbit' : 'Sedang Dalam Pengujian Lab'}
                </div>
                <div className="text-[10px] text-[#7a7a7a]">
                  Diterima pada: {searchResult.receivedAt}
                </div>
              </div>

              {searchResult.coaGenerated && (
                <button
                  onClick={() => setShowCOAModal(searchResult)}
                  className="w-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2 rounded-[4px] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Lihat & Unduh Sertifikat Hasil (COA)</span>
                </button>
              )}
            </Card>
          )}
        </div>
      )}

      {/* Customer Samples List */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-[#7a7a7a] uppercase tracking-wider">
            Riwayat Permintaan Pengujian Anda
          </span>
        </div>

        <div className="space-y-2.5">
          {mySamples.map(sample => (
            <Card key={sample.id} className="p-3.5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0066cc]">
                    {sample.sampleCode}
                  </span>
                  <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                    {sample.name}
                  </h4>
                  <p className="text-[11px] text-[#7a7a7a]">
                    Tanggal Masuk: {sample.receivedAt}
                  </p>
                </div>
                <Badge variant={sample.status === 'Approved' ? 'green' : 'blue'}>
                  {sample.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05]">
                {sample.coaGenerated ? (
                  <button
                    onClick={() => setShowCOAModal(sample)}
                    className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-1.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download COA ({sample.coaNumber?.split('/')[2] || 'PDF'})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedSample(sample);
                      setActiveTab('samples');
                    }}
                    className="flex-1 bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs font-semibold py-1.5 rounded-[4px] transition-all flex items-center justify-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#0066cc]" />
                    <span>Lihat Tracking Progres</span>
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Interpretation Help */}
      <Card 
        onClick={() => setActiveTab('ai')}
        className="bg-gradient-to-br from-[#f5f5f7] to-[#e8eef8] border-[#0066cc]/20 p-4 cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-1.5 text-[#0066cc]">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Tanya LIMY AI Assistant</span>
        </div>
        <p className="text-xs text-[#333333] leading-relaxed mb-2">
          Ingin penjelasan tentang parameter seperti pH, TDS, Hemoglobin, atau batas baku mutu limbah? Tanyakan langsung ke AI kami.
        </p>
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#0066cc]">
          <span>Mulai Konsultasi AI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Card>
    </div>
  );
};
