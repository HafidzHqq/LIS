import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { 
  Sliders, 
  Wrench, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Plus,
  History,
  Building
} from 'lucide-react';
import { Equipment } from '../../types';

export const EquipmentScreen: React.FC = () => {
  const { equipment, logEquipmentMaintenance, currentUser } = useApp();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [maintenanceNote, setMaintenanceNote] = useState('');
  const [maintenanceType, setMaintenanceType] = useState<'Rutina' | 'Kalibrasi' | 'Perbaikan' | 'Verifikasi Sensor'>('Rutina');

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEquipment || !maintenanceNote) return;

    logEquipmentMaintenance(selectedEquipment.id, maintenanceNote, maintenanceType);
    setSelectedEquipment(null);
    setMaintenanceNote('');
  };

  const getStatusBadge = (status: Equipment['status']) => {
    switch (status) {
      case 'Active': return <Badge variant="green">BEROPERASI NORMAL</Badge>;
      case 'Calibration Due': return <Badge variant="red">JATUH TEMPO KALIBRASI</Badge>;
      case 'Under Maintenance': return <Badge variant="amber">SEDANG SERVIS</Badge>;
      default: return <Badge variant="gray">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Banner */}
      <div className="bg-[#272729] text-white rounded-[4px] p-5 shadow-apple-product relative overflow-hidden border border-[#3a3a3c]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#2997ff]" />
            <span className="text-xs font-semibold text-[#cccccc]">Instrumen & Kalibrasi Alat Lab</span>
          </div>
          <span className="text-[10px] bg-[#34c759]/20 text-[#34c759] px-2.5 py-0.5 rounded-[4px] font-bold border border-[#34c759]/30">
            KAN Kalibrasi Standar
          </span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1 font-apple-display">
          Pemeliharaan & Sertifikasi Alat
        </h2>
        <p className="text-xs text-[#cccccc] mb-2 leading-relaxed">
          Pencatatan riwayat kalibrasi eksternal BSN, perawatan preventif, dan sensor check berkala.
        </p>
      </div>

      {/* Equipment List */}
      {equipment.length === 0 ? (
        <Card className="p-8 text-center bg-white">
          <Sliders className="w-10 h-10 mx-auto text-[#7a7a7a] mb-2 opacity-50" />
          <h4 className="text-sm font-bold text-[#1d1d1f]">Belum Ada Data Instrumen / Alat Lab</h4>
          <p className="text-xs text-[#7a7a7a] mt-1">Daftar instrumen dan jadwal kalibrasi akan tercatat di sini.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {equipment.map(item => {
          const isCalibDue = item.status === 'Calibration Due' || item.daysUntilCalibration <= 7;

          return (
            <Card key={item.id} className="p-4 hover:shadow-md">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0066cc]">
                    {item.code} • {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#1d1d1f] mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#7a7a7a]">
                    Model: {item.model} (S/N: {item.serialNumber})
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>

              {/* Specs & Location */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#f5f5f7] p-2.5 rounded-[4px] mb-3">
                <div>
                  <span className="text-[#7a7a7a]">Ruang Lab:</span> <strong className="text-[#1d1d1f] block truncate">{item.room}</strong>
                </div>
                <div>
                  <span className="text-[#7a7a7a]">Kalibrasi Berikutnya:</span>
                  <strong className={`block ${isCalibDue ? 'text-[#ff3b30] font-bold' : 'text-[#1d1d1f]'}`}>
                    {item.nextCalibrationDate} ({item.daysUntilCalibration} hari lagi)
                  </strong>
                </div>
              </div>

              {/* Maintenance History snippet */}
              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-bold text-[#7a7a7a] uppercase">Riwayat Perawatan Terakhir:</span>
                {item.maintenanceHistory.slice(0, 1).map(h => (
                  <div key={h.id} className="text-[11px] text-[#333333] bg-white p-2 rounded-[4px] border border-black/[0.04]">
                    <div className="flex justify-between text-[10px] text-[#7a7a7a] mb-0.5">
                      <span>{h.date} • <strong>{h.type}</strong></span>
                      <span>Oleh: {h.technician}</span>
                    </div>
                    <div>{h.note}</div>
                  </div>
                ))}
              </div>

              {/* Action */}
              {currentUser.role !== 'CUSTOMER' && (
                <div className="pt-2 border-t border-black/[0.04]">
                  <button
                    onClick={() => setSelectedEquipment(item)}
                    className="w-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Catat Kalibrasi / Pemeliharaan Alat</span>
                  </button>
                </div>
              )}
            </Card>
          );
        })}
        </div>
      )}

      {/* Log Maintenance Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[4px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-black/10 animate-in zoom-in-95">
            <div className="p-4 bg-[#f5f5f7] border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1d1d1f]">Log Pemeliharaan & Kalibrasi Alat</h3>
                <p className="text-[10px] text-[#7a7a7a]">{selectedEquipment.name}</p>
              </div>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="w-7 h-7 rounded-[4px] bg-white text-[#7a7a7a] flex items-center justify-center hover:text-[#1d1d1f]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="p-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold mb-1">Tipe Tindakan</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Rutina', 'Kalibrasi', 'Perbaikan', 'Verifikasi Sensor'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setMaintenanceType(t)}
                      className={`py-1.5 text-xs font-semibold rounded-[4px] border transition-all ${
                        maintenanceType === t
                          ? 'bg-[#0066cc] text-white border-[#0066cc]'
                          : 'bg-[#f5f5f7] text-[#333333] border-[#e0e0e0]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold mb-1">Catatan Hasil & Parameter Kalibrasi *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cth: Telah dikalibrasi ulang dengan larutan buffer standar NIST. Akurasi 99.9%."
                  value={maintenanceNote}
                  onChange={(e) => setMaintenanceNote(e.target.value)}
                  className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs rounded-[4px] p-3 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEquipment(null)}
                  className="px-4 py-2 bg-[#f5f5f7] text-xs font-semibold rounded-[4px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0066cc] text-white text-xs font-semibold py-2 rounded-[4px] shadow-md"
                >
                  Simpan Catatan Alat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
