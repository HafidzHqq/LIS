import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  FileCheck2, 
  Download, 
  Search, 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const ReportGeneratorScreen: React.FC = () => {
  const { samples, setShowCOAModal, activeBranch } = useApp();
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const approvedSamples = samples.filter(s => s.status === 'Approved' || s.coaGenerated);

  const handleExportCSV = () => {
    const headers = ['Sample Code', 'Sample Name', 'Category', 'Client', 'Received Date', 'Status', 'COA Number'];
    const rows = samples.map(s => [
      s.sampleCode,
      `"${s.name}"`,
      `"${s.category}"`,
      `"${s.clientName}"`,
      s.receivedAt,
      s.status,
      s.coaNumber || '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LIMY_Lab_Report_${activeBranch.city}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Export Quick Tools */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#2997ff]" />
            <span className="text-xs font-semibold text-[#cccccc]">Generator Laporan & COA</span>
          </div>
          <span className="text-[10px] bg-[#2997ff]/20 text-[#2997ff] px-2 py-0.5 rounded-[4px] font-bold border border-[#2997ff]/30">
            Export Ready
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1 font-apple-display">
          Export Rekapitulasi Laboratorium
        </h2>
        <p className="text-xs text-[#cccccc] mb-4">
          Ekspor buku register sampel, log parameter uji, dan sertifikat resmi format PDF/CSV.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-4 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Ekspor Spreadsheet (CSV)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#333333] hover:bg-[#444444] text-white text-xs font-medium px-3.5 py-2 rounded-[4px] transition-all active:scale-95 flex items-center gap-1.5 border border-[#555555]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Register</span>
          </button>
        </div>
      </div>

      {/* Issued Certificates List */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-[#7a7a7a] uppercase tracking-wider">
            Sertifikat Hasil Uji (COA) Siap Unduh ({approvedSamples.length})
          </span>
        </div>

        <div className="space-y-2.5">
          {approvedSamples.map(sample => (
            <Card key={sample.id} className="p-3.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066cc]">
                      {sample.coaNumber || 'COA-LIMY-2026/08/1749'}
                    </span>
                    <span className="bg-[#34c759]/15 text-[#248a3d] text-[9px] font-bold px-2 py-0.2 rounded-[4px]">
                      RESMI
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                    {sample.name}
                  </h4>
                  <p className="text-[10px] text-[#7a7a7a]">
                    Klien: <strong>{sample.clientName}</strong> • {sample.category}
                  </p>
                </div>
                <Badge variant="green">Passed</Badge>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7a7a7a] pt-2 border-t border-black/[0.04]">
                <span>Diterbitkan: {sample.approvedAt || '17 Agu 2026'}</span>
                <button
                  onClick={() => setShowCOAModal(sample)}
                  className="bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold px-3 py-1 rounded-[4px] transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                >
                  <Download className="w-3 h-3" />
                  <span>Lihat / PDF</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
