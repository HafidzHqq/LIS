import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  TestTube2, 
  QrCode, 
  Sparkles, 
  Building, 
  Thermometer, 
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SampleCategory, Priority, TestParameter } from '../../types';

const TEST_PACKAGES: Record<SampleCategory, { name: string; params: TestParameter[] }> = {
  'Air & Lingkungan': {
    name: 'Paket Kualitas Air Minum (Permenkes 2023)',
    params: [
      { id: 'p-ph', name: 'Derajat Keasaman (pH)', unit: 'pH', referenceMin: 6.5, referenceMax: 8.5, method: 'SNI 06-6989.11-2004' },
      { id: 'p-tds', name: 'Total Dissolved Solids (TDS)', unit: 'mg/L', referenceMin: 0, referenceMax: 500, method: 'SNI 06-6989.27-2005' },
      { id: 'p-turb', name: 'Kekeruhan (Turbidity)', unit: 'NTU', referenceMin: 0, referenceMax: 5.0, method: 'SNI 06-6989.25-2005' },
      { id: 'p-ecoli', name: 'Escherichia coli', unit: 'CFU/100mL', referenceMin: 0, referenceMax: 0, method: 'SNI ISO 9308-1:2014' }
    ]
  },
  'Darah & Klinis': {
    name: 'Paket Darah Lengkap + Diff Count (Hematologi)',
    params: [
      { id: 'p-hb', name: 'Hemoglobin (Hb)', unit: 'g/dL', referenceMin: 13.0, referenceMax: 17.5, method: 'SLS-Hemoglobin' },
      { id: 'p-leu', name: 'Leukosit (WBC)', unit: '10^3/uL', referenceMin: 4.5, referenceMax: 11.0, method: 'Flow Cytometry' },
      { id: 'p-plt', name: 'Trombosit (PLT)', unit: '10^3/uL', referenceMin: 150, referenceMax: 450, method: 'Impedance Hydrodynamic' },
      { id: 'p-ht', name: 'Hematokrit (Ht)', unit: '%', referenceMin: 40.0, referenceMax: 52.0, method: 'Pulse Height' }
    ]
  },
  'Urin & Biologis': {
    name: 'Paket Urinalisis Lengkap Kimia & Sedimen',
    params: [
      { id: 'p-u-ph', name: 'pH Urin', unit: 'pH', referenceMin: 5.0, referenceMax: 8.0, method: 'Test Strip Reagent' },
      { id: 'p-u-prot', name: 'Protein Urin', unit: 'mg/dL', referenceText: 'Negatif', method: 'Colorimetric Strip' },
      { id: 'p-u-glu', name: 'Glukosa Urin', unit: 'mg/dL', referenceText: 'Normal (< 30 mg/dL)', method: 'Enzymatic Glucose Oxidase' }
    ]
  },
  'Makanan & Minuman': {
    name: 'Paket Uji Nutrisi & Mikrobiologi Pangan (BPOM)',
    params: [
      { id: 'p-prot', name: 'Kadar Protein', unit: '% b/b', referenceMin: 2.8, referenceMax: 4.5, method: 'Kjeldahl AOAC 991.20' },
      { id: 'p-fat', name: 'Kadar Lemak Total', unit: '% b/b', referenceMin: 3.0, referenceMax: 5.0, method: 'Gerber Acid Method' },
      { id: 'p-tpcs', name: 'Total Plate Count (TPC)', unit: 'CFU/mL', referenceMin: 0, referenceMax: 10, method: 'BAM Chapter 3' }
    ]
  },
  'Farmasi & Obat': {
    name: 'Paket Sterilitas & Potensi Zat Aktif (Farmakope VI)',
    params: [
      { id: 'p-steril', name: 'Uji Sterilitas Membran', unit: 'Kualitatif', referenceText: 'Steril', method: 'Farmakope Indonesia VI' },
      { id: 'p-endotoksin', name: 'Bacterial Endotoxin Test (LAL)', unit: 'EU/mL', referenceMin: 0, referenceMax: 0.5, method: 'Turbidimetric Kinetic LAL' }
    ]
  },
  'Mikrobiologi Industri': {
    name: 'Paket Bio-burden & Identifikasi Koloni',
    params: [
      { id: 'p-coliform', name: 'Total Coliform', unit: 'MPN/100mL', referenceMin: 0, referenceMax: 0, method: 'Multiple Tube Fermentation' },
      { id: 'p-salmonella', name: 'Salmonella sp.', unit: 'Negatif/25g', referenceText: 'Negatif per 25g', method: 'ISO 6579-1:2017' }
    ]
  }
};

export const SampleRegistrationModal: React.FC = () => {
  const { setShowRegistration, addSample, activeBranch, setSelectedSample } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<SampleCategory>('Air & Lingkungan');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [collectionLocation, setCollectionLocation] = useState('');
  const [priority, setPriority] = useState<Priority>('Routine');
  const [temperatureAtArrival, setTemperatureAtArrival] = useState('4.0°C (Cold Box)');
  const [condition, setCondition] = useState<'Good' | 'Fair' | 'Damaged'>('Good');

  const selectedPackage = TEST_PACKAGES[category] || TEST_PACKAGES['Air & Lingkungan'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientName) return;

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const created = addSample({
      name,
      category,
      clientName,
      clientEmail: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@client.id`,
      clientPhone: clientPhone || '+62 812-3456-7890',
      collectionLocation: collectionLocation || 'Site Lab Utama',
      collectedAt: timeStr,
      receivedAt: timeStr,
      status: 'Registered',
      priority,
      temperatureAtArrival,
      condition,
      parameters: selectedPackage.params,
      branchId: activeBranch.id
    });

    setShowRegistration(false);
    setSelectedSample(created);
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
              <h3 className="font-bold text-sm text-[#1d1d1f]">Registrasi Sampel Baru</h3>
              <p className="text-[10px] text-[#7a7a7a]">Laboratorium LIMS {activeBranch.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowRegistration(false)}
            className="w-8 h-8 rounded-[4px] bg-white text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center border border-black/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {/* Sample Category */}
          <div>
            <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
              Kategori Sampel Laboratorium *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SampleCategory)}
              className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#1d1d1f] rounded-[4px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
            >
              <option value="Air & Lingkungan">💧 Air & Lingkungan (Kimia/Bakteriologi)</option>
              <option value="Darah & Klinis">🩸 Darah & Klinis (Hematologi)</option>
              <option value="Urin & Biologis">🧪 Urin & Biologis</option>
              <option value="Makanan & Minuman">🍱 Makanan & Minuman (BPOM)</option>
              <option value="Farmasi & Obat">💊 Farmasi & Obat (Sterilitas)</option>
              <option value="Mikrobiologi Industri">🔬 Mikrobiologi Industri</option>
            </select>
          </div>

          {/* Sample Name */}
          <div>
            <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
              Nama Sampel / Spesimen *
            </label>
            <input
              type="text"
              required
              placeholder="Cth: Air Baku Mata Air Cisangkuy / Darah EDTA Tn. Ahmad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#1d1d1f] rounded-[4px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
            />
          </div>

          {/* Client & Location */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                Nama Klien / Instansi *
              </label>
              <input
                type="text"
                required
                placeholder="Cth: PT Tirta Jaya Mandiri"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#1d1d1f] rounded-[4px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                Lokasi Sampling
              </label>
              <input
                type="text"
                placeholder="Cth: Titik Inlet WTP-1"
                value={collectionLocation}
                onChange={(e) => setCollectionLocation(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#1d1d1f] rounded-[4px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
              />
            </div>
          </div>

          {/* Priority & Arrival Condition */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                Tingkat Prioritas
              </label>
              <div className="flex gap-1.5">
                {(['Routine', 'Urgent', 'STAT'] as Priority[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-1.5 rounded-[4px] text-xs font-semibold border transition-all ${
                      priority === p 
                        ? p === 'STAT' ? 'bg-[#ff3b30] text-white border-[#ff3b30]' : p === 'Urgent' ? 'bg-[#ff9f0a] text-white border-[#ff9f0a]' : 'bg-[#0066cc] text-white border-[#0066cc]'
                        : 'bg-[#f5f5f7] text-[#7a7a7a] border-[#e0e0e0]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1d1d1f] mb-1">
                Suhu & Wadah Sampel
              </label>
              <input
                type="text"
                value={temperatureAtArrival}
                onChange={(e) => setTemperatureAtArrival(e.target.value)}
                className="w-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#1d1d1f] rounded-[4px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
              />
            </div>
          </div>

          {/* Auto-applied Parameters Preview */}
          <div className="bg-[#f5f5f7] rounded-[4px] p-3 border border-black/[0.05]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1d1d1f]">
                {selectedPackage.name}
              </span>
              <span className="text-[10px] bg-[#0066cc]/10 text-[#0066cc] font-semibold px-2 py-0.5 rounded-[4px]">
                {selectedPackage.params.length} Parameter
              </span>
            </div>

            <div className="space-y-1">
              {selectedPackage.params.map(p => (
                <div key={p.id} className="flex items-center justify-between text-[11px] text-[#333333]">
                  <span>• {p.name}</span>
                  <span className="text-[10px] text-[#7a7a7a]">{p.method}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowRegistration(false)}
              className="px-4 py-2.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-[4px] hover:bg-[#e0e0e0] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#0066cc] hover:bg-[#0071e3] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-[#0066cc]/30"
            >
              <QrCode className="w-4 h-4" />
              <span>Simpan & Terbitkan Barcode / QR Label</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
