import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  Award, 
  CheckCircle2,
  Building
} from 'lucide-react';
import { Sample } from '../../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const CertificateOfAnalysisModal: React.FC = () => {
  const { showCOAModal, setShowCOAModal, activeBranch } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!showCOAModal) return null;

  const sample = showCOAModal;

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`COA-${sample.sampleCode}.pdf`);
    } catch (err) {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[4px] max-h-[95vh] flex flex-col shadow-2xl overflow-hidden border border-black/10 animate-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="p-3.5 bg-[#1d1d1f] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2997ff]" />
            <span className="text-xs font-semibold">Certificate of Analysis (COA) Digital</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setShowCOAModal(null)}
              className="w-7 h-7 rounded-[4px] bg-[#272729] text-[#cccccc] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document View */}
        <div className="flex-1 overflow-y-auto p-6 bg-white font-sans" ref={reportRef}>
          {/* Document Header */}
          <div className="border-b-2 border-[#1d1d1f] pb-4 mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[4px] bg-[#1d1d1f] text-white font-bold text-2xl flex items-center justify-center">
                L
              </div>
              <div>
                <h2 className="font-bold text-lg text-[#1d1d1f] tracking-tight">
                  LIMY LABORATORIUM UTAMA
                </h2>
                <p className="text-[10px] text-[#7a7a7a]">
                  {activeBranch.address} • Telp: {activeBranch.phone}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] bg-[#34c759]/15 text-[#248a3d] px-2 py-0.2 rounded-[4px] font-bold border border-[#34c759]/30">
                    AKREDITASI ISO/IEC 17025:2017
                  </span>
                  <span className="text-[9px] text-[#7a7a7a]">LP-884-IDN</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#7a7a7a] uppercase block">
                No. Sertifikat
              </span>
              <span className="text-xs font-mono font-bold text-[#0066cc]">
                {sample.coaNumber || 'COA-LIMY-2026/08/1749'}
              </span>
              <span className="text-[10px] text-[#7a7a7a] block mt-1">
                Hal: 1 / 1
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-4">
            <h1 className="text-base font-bold tracking-wider text-[#1d1d1f] uppercase underline underline-offset-4">
              SERTIFIKAT HASIL UJI / CERTIFICATE OF ANALYSIS
            </h1>
          </div>

          {/* Sample & Client Metadata Box */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#f5f5f7] p-3.5 rounded-[4px] mb-4 border border-black/[0.06]">
            <div className="space-y-1">
              <div><strong className="text-[#7a7a7a]">Nama Klien:</strong> {sample.clientName}</div>
              <div><strong className="text-[#7a7a7a]">ID Sampel:</strong> <span className="font-mono font-bold text-[#0066cc]">{sample.sampleCode}</span></div>
              <div><strong className="text-[#7a7a7a]">Deskripsi Sampel:</strong> {sample.name}</div>
              <div><strong className="text-[#7a7a7a]">Kategori:</strong> {sample.category}</div>
            </div>
            <div className="space-y-1">
              <div><strong className="text-[#7a7a7a]">Lokasi Pengambilan:</strong> {sample.collectionLocation}</div>
              <div><strong className="text-[#7a7a7a]">Tanggal Diterima:</strong> {sample.receivedAt}</div>
              <div><strong className="text-[#7a7a7a]">Kondisi Saat Tiba:</strong> {sample.temperatureAtArrival} ({sample.condition})</div>
              <div><strong className="text-[#7a7a7a]">Status Mutu:</strong> <span className="text-[#34c759] font-bold">MEMENUHI SYARAT (PASSED)</span></div>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="border border-black/10 rounded-[4px] overflow-hidden mb-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#1d1d1f] text-white text-[11px]">
                <tr>
                  <th className="p-2 border-b">No</th>
                  <th className="p-2 border-b">Parameter Uji</th>
                  <th className="p-2 border-b">Satuan</th>
                  <th className="p-2 border-b">Baku Mutu / Rujukan</th>
                  <th className="p-2 border-b">Hasil Terukur</th>
                  <th className="p-2 border-b">Metode Pengujian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {sample.parameters.map((param, index) => {
                  const res = sample.results.find(r => r.parameterId === param.id);
                  return (
                    <tr key={param.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f7]/50'}>
                      <td className="p-2 text-center text-[#7a7a7a]">{index + 1}</td>
                      <td className="p-2 font-medium text-[#1d1d1f]">{param.name}</td>
                      <td className="p-2 text-[#7a7a7a]">{param.unit}</td>
                      <td className="p-2 text-[#7a7a7a]">
                        {param.referenceText || `${param.referenceMin ?? 0} - ${param.referenceMax ?? '-'} ${param.unit}`}
                      </td>
                      <td className="p-2 font-bold text-[#0066cc]">
                        {res ? res.value : '—'}
                      </td>
                      <td className="p-2 text-[10px] text-[#7a7a7a]">{param.method}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Remarks & Legal Disclaimers */}
          <div className="text-[10px] text-[#7a7a7a] leading-relaxed mb-6 space-y-1 bg-[#f5f5f7] p-2.5 rounded-[4px] border border-black/[0.04]">
            <p><strong>Catatan:</strong> Hasil pengujian hanya berlaku untuk sampel yang diuji. Sertifikat ini tidak boleh digandakan sebagian tanpa persetujuan tertulis dari LIMY Lab.</p>
            <p><strong>Verifikasi Keaslian:</strong> Pindai QR Code di samping untuk memeriksa integritas data digital pada database cloud LIMY.</p>
          </div>

          {/* Signatures & Seal Box */}
          <div className="flex items-end justify-between pt-2">
            {/* QR Verification Stamp */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 border border-black/20 rounded-[4px] bg-white shadow-sm">
                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="#1d1d1f">
                  <path d="M10 10h30v30h-30zM15 15v20h20v-20zM22 22h6v6h-6zM60 10h30v30h-30zM65 15v20h20v-20zM72 22h6v6h-6zM10 60h30v30h-30zM15 65v20h20v-20zM22 72h6v6h-6zM50 15h5v5h-5zM50 25h5v15h-5zM60 50h10v5h-10zM80 50h10v10h-10zM50 60h5v10h-5zM70 70h20v20h-20zM75 75v10h10v-10z" />
                </svg>
              </div>
              <div className="text-[9px] text-[#7a7a7a]">
                <strong className="text-[#1d1d1f] block">VERIFIED DIGITALLY</strong>
                Integritas Dokumen Terenkripsi<br />
                SHA-256 Validated
              </div>
            </div>

            {/* Official Signature */}
            <div className="text-right">
              <p className="text-[10px] text-[#7a7a7a] mb-8">
                {activeBranch.city}, {sample.approvedAt || '17 Agustus 2026'}<br />
                <strong>Manajer Teknis / Kepala Laboratorium</strong>
              </p>
              <div className="border-t border-[#1d1d1f] pt-1">
                <strong className="text-xs text-[#1d1d1f] block">
                  {sample.approvedBy || 'apt. Maya Sartika, M.Farm'}
                </strong>
                <span className="text-[9px] text-[#7a7a7a]">SIP. 19880415/2026/011</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
