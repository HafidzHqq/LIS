import { User, Sample, InventoryItem, Equipment, QCSample, AuditLog, Notification, Branch } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'br-jkt',
    name: 'LIMY Pusat — Jakarta Lab',
    city: 'Jakarta Pusat',
    address: 'Jl. Salemba Raya No. 45, Jakarta',
    phone: '+62 21 3912044',
    isHQ: true
  },
  {
    id: 'br-sby',
    name: 'LIMY Cabang Surabaya',
    city: 'Surabaya',
    address: 'Jl. Raya Darmo No. 88, Surabaya',
    phone: '+62 31 5681122',
    isHQ: false
  },
  {
    id: 'br-bdg',
    name: 'LIMY Cabang Bandung Pasteur',
    city: 'Bandung',
    address: 'Jl. Dr. Djunjunan No. 120, Bandung',
    phone: '+62 22 2034991',
    isHQ: false
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'dr. Hendra Kusuma, Sp.PK',
    email: 'admin@limy-lab.id',
    phone: '+62 812-8888-0001',
    role: 'SUPER_ADMIN',
    roleTitle: 'Super Admin & Direktur Lab',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-ADM-001',
    department: 'Direksi & IT Sistem',
    shift: 'Reguler (08:00 - 17:00)'
  },
  {
    id: 'usr-mgr',
    name: 'apt. Maya Sartika, M.Farm',
    email: 'manager@limy-lab.id',
    phone: '+62 812-8888-0002',
    role: 'LAB_MANAGER',
    roleTitle: 'Laboratory Operations Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813596-f94d1f2749f7?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-MGR-002',
    department: 'Manajemen Operasional',
    shift: 'Pagi (07:30 - 16:30)'
  },
  {
    id: 'usr-analyst',
    name: 'Rizky Pratama, S.Si',
    email: 'analis@limy-lab.id',
    phone: '+62 812-8888-0003',
    role: 'ANALYST',
    roleTitle: 'Senior Clinical & Chemical Analyst',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-ANL-105',
    department: 'Departemen Kimia & Spektrometri',
    shift: 'Shift 1 (07:00 - 15:30)'
  },
  {
    id: 'usr-qc',
    name: 'Annisa Tri Wahyuni, S.Tr.Kes',
    email: 'qc@limy-lab.id',
    phone: '+62 812-8888-0004',
    role: 'QC_OFFICER',
    roleTitle: 'Quality Control & Assurance Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-QCO-042',
    department: 'Unit Penjaminan Mutu',
    shift: 'Shift 1 (08:00 - 16:30)'
  },
  {
    id: 'usr-customer',
    name: 'Denny Suryadi, ST',
    email: 'denny@tirtamandiri.co.id',
    phone: '+62 811-9988-7766',
    role: 'CUSTOMER',
    roleTitle: 'Quality Assurance Manager (PT Tirta Mandiri)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'CLT-IND-882',
    department: 'Eksternal Klien',
    shift: '-'
  }
];

export const INITIAL_SAMPLES: Sample[] = [
  {
    id: 'smp-001',
    sampleCode: 'LIMY-2026-0817-001',
    barcode: '89910012026001',
    qrData: 'LIMY-SMP:LIMY-2026-0817-001|PT-TIRTA-MANDIRI|AIR-BAKU',
    name: 'Air Baku Sumber Mata Air Ciburial',
    category: 'Air & Lingkungan',
    collectionLocation: 'Mata Air Ciburial Blok 3, Bogor',
    clientName: 'PT Tirta Mandiri Sejahtera',
    clientEmail: 'denny@tirtamandiri.co.id',
    clientPhone: '+62 811-9988-7766',
    collectedAt: '2026-08-17 08:30 WIB',
    receivedAt: '2026-08-17 09:45 WIB',
    status: 'Approved',
    priority: 'Routine',
    temperatureAtArrival: '5.2°C (Cold Box Terjaga)',
    condition: 'Good',
    parameters: [
      { id: 'p-ph', name: 'Derajat Keasaman (pH)', unit: 'pH unit', referenceMin: 6.5, referenceMax: 8.5, method: 'SNI 06-6989.11-2004', equipmentRequired: 'pH Meter Mettler Toledo' },
      { id: 'p-tds', name: 'Total Dissolved Solids (TDS)', unit: 'mg/L', referenceMin: 0, referenceMax: 500, method: 'SNI 06-6989.27-2005', equipmentRequired: 'Conductivity/TDS Meter' },
      { id: 'p-turb', name: 'Kekeruhan (Turbidity)', unit: 'NTU', referenceMin: 0, referenceMax: 5.0, method: 'SNI 06-6989.25-2005', equipmentRequired: 'Turbidimeter Hach' },
      { id: 'p-ecoli', name: 'Escherichia coli', unit: 'CFU/100mL', referenceMin: 0, referenceMax: 0, method: 'SNI ISO 9308-1:2014', equipmentRequired: 'Incubator Memmert' }
    ],
    results: [
      { parameterId: 'p-ph', parameterName: 'Derajat Keasaman (pH)', unit: 'pH unit', value: '7.35', numericValue: 7.35, referenceRange: '6.5 - 8.5', status: 'Normal', notes: 'Stabil pada suhu 25°C', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:20 WIB' },
      { parameterId: 'p-tds', parameterName: 'Total Dissolved Solids (TDS)', unit: 'mg/L', value: '142.0', numericValue: 142.0, referenceRange: '< 500 mg/L', status: 'Normal', notes: 'Sesuai Baku Mutu Permenkes 2023', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:25 WIB' },
      { parameterId: 'p-turb', parameterName: 'Kekeruhan (Turbidity)', unit: 'NTU', value: '0.85', numericValue: 0.85, referenceRange: '< 5.0 NTU', status: 'Normal', notes: 'Air jernih transparan', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:30 WIB' },
      { parameterId: 'p-ecoli', parameterName: 'Escherichia coli', unit: 'CFU/100mL', value: '0', numericValue: 0, referenceRange: '0 CFU/100mL', status: 'Normal', notes: 'Negatif setelah inkubasi 24 jam', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 14:00 WIB' }
    ],
    qcStatus: 'Passed',
    qcReviewer: 'Annisa Tri Wahyuni, S.Tr.Kes',
    qcReviewedAt: '2026-08-17 14:30 WIB',
    qcNotes: 'Blanko sampel dan duplo memenuhi batas toleransi RPD < 5%. Data valid.',
    approvedBy: 'apt. Maya Sartika, M.Farm',
    approvedAt: '2026-08-17 15:10 WIB',
    coaGenerated: true,
    coaNumber: 'COA-LIMY-2026/08/1749',
    microscopePhotoUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
    chainOfCustody: [
      { id: 'coc-1', timestamp: '2026-08-17 08:30 WIB', stage: 'Pengambilan', actor: 'Bambang Sudiro', role: 'Petugas Sampling', action: 'Sampling Lapangan', location: 'Mata Air Ciburial', note: 'Wadah botol steril 1000 mL' },
      { id: 'coc-2', timestamp: '2026-08-17 09:45 WIB', stage: 'Penerimaan', actor: 'Siti Rahmawati', role: 'Petugas Registrasi', action: 'Verifikasi Fisik & Barcoding', location: 'Front Desk Lab', note: 'Segel utuh, suhu 5.2°C' },
      { id: 'coc-3', timestamp: '2026-08-17 10:15 WIB', stage: 'Preparasi & Analisis', actor: 'Rizky Pratama, S.Si', role: 'Analis Lab', action: 'Ekstraksi & Uji Spektrometri', location: 'Lab Kimia Instrumen B-102', note: 'Uji duplo berjalan normal' },
      { id: 'coc-4', timestamp: '2026-08-17 14:30 WIB', stage: 'Validasi QC', actor: 'Annisa Tri Wahyuni', role: 'QC Officer', action: 'Verifikasi Mutu & Blanko', location: 'Ruang Validasi Mutu', note: 'Passed Westgard Multi-rule' },
      { id: 'coc-5', timestamp: '2026-08-17 15:10 WIB', stage: 'Otorisasi & Rilis', actor: 'apt. Maya Sartika', role: 'Lab Manager', action: 'Penerbitan COA Digital', location: 'Office Manager', note: 'Sertifikat siap unduh' }
    ],
    branchId: 'br-jkt'
  },
  {
    id: 'smp-002',
    sampleCode: 'LIMY-2026-0817-002',
    barcode: '89910012026002',
    qrData: 'LIMY-SMP:LIMY-2026-0817-002|RS-MEDIKA-SEHAT|DARAH-EDTA',
    name: 'Darah Lengkap Pasien Rawat Inap (Tn. Sugianto)',
    category: 'Darah & Klinis',
    collectionLocation: 'Ruang ICU Bed 04, RS Medika Sehat',
    clientName: 'RS Medika Sehat Jakarta',
    clientEmail: 'lab@rsmedikasehat.com',
    clientPhone: '+62 813-1122-3344',
    collectedAt: '2026-08-17 10:00 WIB',
    receivedAt: '2026-08-17 10:30 WIB',
    status: 'QC Review',
    priority: 'STAT',
    temperatureAtArrival: '4.0°C (Tabung Vacutainer K2-EDTA)',
    condition: 'Good',
    parameters: [
      { id: 'p-hb', name: 'Hemoglobin (Hb)', unit: 'g/dL', referenceMin: 13.0, referenceMax: 17.5, method: 'SLS-Hemoglobin Method', equipmentRequired: 'Hematology Analyzer Sysmex XN-1000' },
      { id: 'p-leu', name: 'Leukosit (WBC)', unit: '10^3/uL', referenceMin: 4.5, referenceMax: 11.0, method: 'Flow Cytometry & Fluorescent Dye', equipmentRequired: 'Hematology Analyzer Sysmex XN-1000' },
      { id: 'p-plt', name: 'Trombosit (PLT)', unit: '10^3/uL', referenceMin: 150, referenceMax: 450, method: 'Impedance Method with Hydrodynamic Focusing', equipmentRequired: 'Hematology Analyzer Sysmex XN-1000' },
      { id: 'p-ht', name: 'Hematokrit (Ht)', unit: '%', referenceMin: 40.0, referenceMax: 52.0, method: 'Cumulative Pulse Height Detection', equipmentRequired: 'Hematology Analyzer Sysmex XN-1000' }
    ],
    results: [
      { parameterId: 'p-hb', parameterName: 'Hemoglobin (Hb)', unit: 'g/dL', value: '9.4', numericValue: 9.4, referenceRange: '13.0 - 17.5 g/dL', status: 'Abnormal', notes: 'Anemia derajat sedang, konfirmasi slide apus darah tepi', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:00 WIB' },
      { parameterId: 'p-leu', parameterName: 'Leukosit (WBC)', unit: '10^3/uL', value: '18.6', numericValue: 18.6, referenceRange: '4.5 - 11.0 10^3/uL', status: 'Critical', notes: 'Leukositosis tinggi mengindikasikan infeksi bakteri akut', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:00 WIB' },
      { parameterId: 'p-plt', parameterName: 'Trombosit (PLT)', unit: '10^3/uL', value: '240', numericValue: 240, referenceRange: '150 - 450 10^3/uL', status: 'Normal', notes: 'Morfologi trombosit baik', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:00 WIB' },
      { parameterId: 'p-ht', parameterName: 'Hematokrit (Ht)', unit: '%', value: '29.5', numericValue: 29.5, referenceRange: '40.0 - 52.0 %', status: 'Abnormal', notes: 'Penurunan sejalan dengan kadar Hemoglobin', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 11:00 WIB' }
    ],
    qcStatus: 'Pending',
    microscopePhotoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
    coaGenerated: false,
    chainOfCustody: [
      { id: 'coc-21', timestamp: '2026-08-17 10:00 WIB', stage: 'Pengambilan', actor: 'Ns. Dian', role: 'Perawat ICU', action: 'Flebotomi Vena', location: 'RS Medika Sehat', note: 'Sampel STAT Cito' },
      { id: 'coc-22', timestamp: '2026-08-17 10:30 WIB', stage: 'Penerimaan', actor: 'Siti Rahmawati', role: 'Petugas Registrasi', action: 'Registrasi STAT Cito', location: 'Loket Cito Lab', note: 'Langsung diteruskan ke analis hematologi' },
      { id: 'coc-23', timestamp: '2026-08-17 11:00 WIB', stage: 'Analisis Selesai', actor: 'Rizky Pratama, S.Si', role: 'Analis Lab', action: 'Running Sysmex XN-1000 & Apusan', location: 'Lab Hematologi A-101', note: 'Nilai kritis dilaporkan ke tim QC' }
    ],
    branchId: 'br-jkt'
  },
  {
    id: 'smp-003',
    sampleCode: 'LIMY-2026-0817-003',
    barcode: '89910012026003',
    qrData: 'LIMY-SMP:LIMY-2026-0817-003|PT-NUTRI-FOOD|SUSU-UHT',
    name: 'Susu UHT Cokelat 250ml Batch 88A',
    category: 'Makanan & Minuman',
    collectionLocation: 'Line Produksi 2, Pabrik NutriFood Cikarang',
    clientName: 'PT Nutri Indofood Utama',
    clientEmail: 'qa@nutrifood.co.id',
    clientPhone: '+62 812-4455-6677',
    collectedAt: '2026-08-17 11:15 WIB',
    receivedAt: '2026-08-17 13:00 WIB',
    status: 'Testing',
    priority: 'Urgent',
    temperatureAtArrival: '22.0°C (Kemasan TetraPak Tersegel)',
    condition: 'Good',
    parameters: [
      { id: 'p-prot', name: 'Kadar Protein', unit: '% b/b', referenceMin: 2.8, referenceMax: 4.5, method: 'Kjeldahl Method (AOAC 991.20)', equipmentRequired: 'Kjeldahl Digester & Distillation Unit' },
      { id: 'p-fat', name: 'Kadar Lemak Total', unit: '% b/b', referenceMin: 3.0, referenceMax: 5.0, method: 'Gerber / Babcock Acid Method', equipmentRequired: 'Gerber Centrifuge' },
      { id: 'p-tpcs', name: 'Total Plate Count (TPC)', unit: 'CFU/mL', referenceMin: 0, referenceMax: 10, method: 'BAM Chapter 3 - Aerobic Plate Count', equipmentRequired: 'Laminar Air Flow & Incubator 37°C' }
    ],
    results: [
      { parameterId: 'p-prot', parameterName: 'Kadar Protein', unit: '% b/b', value: '3.42', numericValue: 3.42, referenceRange: '2.8 - 4.5 %', status: 'Normal', notes: 'Sesuai klaim nutrisi kemasan', analystName: 'Rizky Pratama, S.Si', analystId: 'usr-analyst', enteredAt: '2026-08-17 14:15 WIB' }
    ],
    qcStatus: 'Pending',
    coaGenerated: false,
    chainOfCustody: [
      { id: 'coc-31', timestamp: '2026-08-17 11:15 WIB', stage: 'Pengambilan', actor: 'Farhan QA', role: 'Staff QA Pabrik', action: 'Pengambilan Batch Uji', location: 'Filling Room Cikarang', note: 'Karton berisi 6 pcs' },
      { id: 'coc-32', timestamp: '2026-08-17 13:00 WIB', stage: 'Penerimaan', actor: 'Siti Rahmawati', role: 'Petugas Registrasi', action: 'Log In Sample', location: 'Front Desk', note: 'Sampel utuh tidak penyok' },
      { id: 'coc-33', timestamp: '2026-08-17 13:45 WIB', stage: 'Inkubasi & Destruksi', actor: 'Rizky Pratama', role: 'Analis Lab', action: 'Destruksi Asam Kjeldahl', location: 'Lab Pangan B-201', note: 'Proses TPC sedang diinkubasi 48 jam' }
    ],
    branchId: 'br-jkt'
  },
  {
    id: 'smp-004',
    sampleCode: 'LIMY-2026-0817-004',
    barcode: '89910012026004',
    qrData: 'LIMY-SMP:LIMY-2026-0817-004|PT-BIOFARMA-TEST|VAKSIN-BIVALEN',
    name: 'Vaksin Influenza Bivalen Batch V-2026-08',
    category: 'Farmasi & Obat',
    collectionLocation: 'Cleanroom Grade A, Biofarma Bandung',
    clientName: 'PT Biofarma Inovasi',
    clientEmail: 'qc@biofarma-inovasi.id',
    clientPhone: '+62 822-1234-5678',
    collectedAt: '2026-08-17 07:00 WIB',
    receivedAt: '2026-08-17 08:30 WIB',
    status: 'Processing',
    priority: 'Urgent',
    temperatureAtArrival: '2.8°C (Verified Cold Chain Monitoring Logger)',
    condition: 'Good',
    parameters: [
      { id: 'p-steril', name: 'Uji Sterilitas Membran Filtrasi', unit: 'Kualitatif', referenceText: 'Steril (Tidak ada pertumbuhan mikroba)', method: 'Farmakope Indonesia Edisi VI', equipmentRequired: 'Isolator Sterilitas & Incubator 25°C/35°C' },
      { id: 'p-endotoksin', name: 'Bacterial Endotoxin Test (LAL)', unit: 'EU/mL', referenceMin: 0, referenceMax: 0.5, method: 'Turbidimetric Kinetic LAL', equipmentRequired: 'Microplate Reader & Endotoxin Kit' },
      { id: 'p-potensi', name: 'Uji Potensi Antigen HA', unit: 'ug/0.5mL', referenceMin: 15.0, referenceMax: 20.0, method: 'Single Radial Immunodiffusion (SRID)', equipmentRequired: 'SRID Plate Reader' }
    ],
    results: [],
    qcStatus: 'Pending',
    coaGenerated: false,
    chainOfCustody: [
      { id: 'coc-41', timestamp: '2026-08-17 07:00 WIB', stage: 'Pengambilan', actor: 'Drs. Kurniawan, Apt', role: 'QA Biofarma', action: 'Sampling Bio-Secure', location: 'Cleanroom Bandung', note: 'Ice gel validated box' },
      { id: 'coc-42', timestamp: '2026-08-17 08:30 WIB', stage: 'Penerimaan', actor: 'Taufik Hidayat', role: 'Staff Logistik', action: 'Log In Cleanroom Prep', location: 'LIMY Bandung', note: 'Data logger temperature 2.8°C aman' }
    ],
    branchId: 'br-bdg'
  },
  {
    id: 'smp-005',
    sampleCode: 'LIMY-2026-0817-005',
    barcode: '89910012026005',
    qrData: 'LIMY-SMP:LIMY-2026-0817-005|PT-TEKSTIL-INDAH|AIR-LIMBAH-OUTLET',
    name: 'Air Limbah Outlet IPAL Industri Tekstil',
    category: 'Air & Lingkungan',
    collectionLocation: 'Point Source Outlet IPAL, Rancaekek',
    clientName: 'PT Tekstil Mega Abadi',
    clientEmail: 'env@tekstil-mega.com',
    clientPhone: '+62 815-9988-2233',
    collectedAt: '2026-08-17 06:30 WIB',
    receivedAt: '2026-08-17 08:00 WIB',
    status: 'Registered',
    priority: 'Routine',
    temperatureAtArrival: '4.5°C (Cooler Box)',
    condition: 'Good',
    parameters: [
      { id: 'p-bod', name: 'Biological Oxygen Demand (BOD5)', unit: 'mg/L', referenceMin: 0, referenceMax: 60, method: 'SNI 6989.72:2009', equipmentRequired: 'BOD Incubator 20°C & DO Meter' },
      { id: 'p-cod', name: 'Chemical Oxygen Demand (COD)', unit: 'mg/L', referenceMin: 0, referenceMax: 150, method: 'SNI 6989.2:2019 (Refluks Tertutup)', equipmentRequired: 'COD Reactor & Spectrophotometer' },
      { id: 'p-tss', name: 'Total Suspended Solid (TSS)', unit: 'mg/L', referenceMin: 0, referenceMax: 50, method: 'SNI 6989.3:2019 Gravimetri', equipmentRequired: 'Oven Pengering & Neraca Analitis' }
    ],
    results: [],
    qcStatus: 'Pending',
    coaGenerated: false,
    chainOfCustody: [
      { id: 'coc-51', timestamp: '2026-08-17 06:30 WIB', stage: 'Pengambilan', actor: 'Agus Sutrisno', role: 'Sanitarian Lapangan', action: 'Sampling Air Limbah Komposit', location: 'Outlet IPAL Rancaekek', note: 'Sampel diawetkan H2SO4 pekat' },
      { id: 'coc-52', timestamp: '2026-08-17 08:00 WIB', stage: 'Registrasi', actor: 'Siti Rahmawati', role: 'Petugas Registrasi', action: 'Input Sistem & Label Barcode', location: 'Front Desk Lab', note: 'Menunggu alokasi analis lingkungan' }
    ],
    branchId: 'br-bdg'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    code: 'RGN-HCH-01',
    name: 'Reagen Kit Hematologi Sysmex Cellpack DCL (20L)',
    category: 'Reagen Kimia',
    currentStock: 4,
    minStock: 6,
    unit: 'Galon 20L',
    storageLocation: 'Gudang Reagen Ruang A (18-25°C)',
    lotNumber: 'LOT-CP-202604',
    expiryDate: '2027-04-15',
    supplierName: 'PT Sysmex Indonesia',
    pricePerUnit: 1450000,
    status: 'Low',
    lastRestocked: '2026-07-20'
  },
  {
    id: 'inv-002',
    code: 'RGN-PH-BUF4',
    name: 'Larutan Buffer pH 4.01 NIST Traceable (500mL)',
    category: 'Standar Kalibrasi',
    currentStock: 12,
    minStock: 3,
    unit: 'Botol',
    storageLocation: 'Lemari Kalibrasi Lab 1',
    lotNumber: 'LOT-BF4-9912',
    expiryDate: '2028-01-30',
    supplierName: 'Merck Millipore',
    pricePerUnit: 480000,
    status: 'Normal',
    lastRestocked: '2026-08-01'
  },
  {
    id: 'inv-003',
    code: 'RGN-PH-BUF7',
    name: 'Larutan Buffer pH 7.00 NIST Traceable (500mL)',
    category: 'Standar Kalibrasi',
    currentStock: 15,
    minStock: 3,
    unit: 'Botol',
    storageLocation: 'Lemari Kalibrasi Lab 1',
    lotNumber: 'LOT-BF7-9915',
    expiryDate: '2028-02-15',
    supplierName: 'Merck Millipore',
    pricePerUnit: 480000,
    status: 'Normal',
    lastRestocked: '2026-08-01'
  },
  {
    id: 'inv-004',
    code: 'MED-PCA-500',
    name: 'Plate Count Agar (PCA) Granulated 500g',
    category: 'Kultur Media',
    currentStock: 1,
    minStock: 4,
    unit: 'Botol 500g',
    storageLocation: 'Rak Media Kering Mikrobiologi',
    lotNumber: 'LOT-PCA-7781',
    expiryDate: '2026-09-01',
    supplierName: 'Oxoid Thermo Fisher',
    pricePerUnit: 1250000,
    status: 'Expired',
    lastRestocked: '2025-09-10'
  },
  {
    id: 'inv-005',
    code: 'CHM-H2SO4-PA',
    name: 'Asam Sulfat (H2SO4) 98% EMSURE® p.a 2.5L',
    category: 'Bahan Kimia Murni',
    currentStock: 8,
    minStock: 2,
    unit: 'Botol Kaca 2.5L',
    storageLocation: 'Lemari Asam B3 Tahan Korosi',
    lotNumber: 'LOT-H2S-5501',
    expiryDate: '2030-12-31',
    supplierName: 'Merck Life Science',
    pricePerUnit: 920000,
    status: 'Normal',
    lastRestocked: '2026-06-15'
  },
  {
    id: 'inv-006',
    code: 'CNS-TIP-1000',
    name: 'Micropipette Filter Tips 100-1000 uL Steril (96 Tips/Rak)',
    category: 'Consumables & Tips',
    currentStock: 25,
    minStock: 10,
    unit: 'Rak',
    storageLocation: 'Rak Consumable Ruang Kimia',
    lotNumber: 'LOT-TIP-202602',
    expiryDate: '2029-06-30',
    supplierName: 'Eppendorf Indonesia',
    pricePerUnit: 165000,
    status: 'Normal',
    lastRestocked: '2026-08-05'
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-001',
    code: 'EQP-HEM-01',
    name: 'Automated Hematology Analyzer Sysmex XN-1000',
    category: 'Hematology',
    model: 'XN-1000 (SP-10)',
    serialNumber: 'SN-XN10-889124',
    room: 'Lab Hematologi & Urinalisis (Lt. 1)',
    status: 'Active',
    lastCalibrationDate: '2026-05-10',
    nextCalibrationDate: '2026-11-10',
    daysUntilCalibration: 85,
    calibrationIntervalDays: 180,
    maintenanceHistory: [
      { id: 'mh-1', date: '2026-05-10', type: 'Kalibrasi', technician: 'Ir. Rudianto (Sysmex Certified)', note: 'Kalibrasi 5-part differential passed dengan calibrator SCS-1000.' },
      { id: 'mh-2', date: '2026-07-15', type: 'Rutina', technician: 'Rizky Pratama', note: 'Pembersihan syringe pump dan penggantian filter vakum.' }
    ]
  },
  {
    id: 'eq-002',
    code: 'EQP-SPEK-02',
    name: 'UV-VIS Double Beam Spectrophotometer UV-1900i',
    category: 'Spektrometri',
    model: 'Shimadzu UV-1900i',
    serialNumber: 'SN-SHM-1900-3411',
    room: 'Lab Kimia Instrumen B-102',
    status: 'Calibration Due',
    lastCalibrationDate: '2025-08-20',
    nextCalibrationDate: '2026-08-20',
    daysUntilCalibration: 3,
    calibrationIntervalDays: 365,
    maintenanceHistory: [
      { id: 'mh-3', date: '2025-08-20', type: 'Kalibrasi', technician: 'Balai Kalibrasi Standar Nasional (BSN)', note: 'Pengujian akurasi panjang gelombang dengan filter Holmium Oxide.' }
    ]
  },
  {
    id: 'eq-003',
    code: 'EQP-CENT-03',
    name: 'Refrigerated High-Speed Centrifuge 5427 R',
    category: 'Sentrifugasi',
    model: 'Eppendorf 5427 R',
    serialNumber: 'SN-EPP-5427-901',
    room: 'Lab Preparasi Sampel',
    status: 'Active',
    lastCalibrationDate: '2026-03-01',
    nextCalibrationDate: '2027-03-01',
    daysUntilCalibration: 196,
    calibrationIntervalDays: 365,
    maintenanceHistory: [
      { id: 'mh-4', date: '2026-03-01', type: 'Kalibrasi', technician: 'Teknisi Internal (Budi W.)', note: 'Verifikasi RPM tachometer digital & temperatur sensor 4°C presisi.' }
    ]
  },
  {
    id: 'eq-004',
    code: 'EQP-AUTO-04',
    name: 'Vertical Laboratory Autoclave Tuttnauer 3870EL',
    category: 'Sterilisasi',
    model: 'Tuttnauer 3870EL-D',
    serialNumber: 'SN-TUTT-88741',
    room: 'Lab Mikrobiologi Steril',
    status: 'Under Maintenance',
    lastCalibrationDate: '2026-01-15',
    nextCalibrationDate: '2027-01-15',
    daysUntilCalibration: 151,
    calibrationIntervalDays: 365,
    maintenanceHistory: [
      { id: 'mh-5', date: '2026-08-16', type: 'Perbaikan', technician: 'Service Center Mitra Medika', note: 'Penggantian gasket pintu silikon dan katup solenoid tekanan.' }
    ]
  }
];

export const INITIAL_QC_SAMPLES: QCSample[] = [
  {
    id: 'qc-001',
    code: 'QC-HEM-L2',
    analyteName: 'Hemoglobin Control (Level 2 Normal)',
    controlLevel: 'Level 2 (Normal)',
    unit: 'g/dL',
    targetMean: 14.2,
    targetSD: 0.35,
    instrument: 'Sysmex XN-1000',
    lotNumber: 'EIGHTCHECK-3WP-L2',
    expiryDate: '2026-11-30',
    dataPoints: [
      { id: 'dp-1', date: '11 Agu', value: 14.1, runBy: 'Rizky P.', status: 'In Control', deviationSD: -0.28 },
      { id: 'dp-2', date: '12 Agu', value: 14.3, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.28 },
      { id: 'dp-3', date: '13 Agu', value: 14.2, runBy: 'Annisa W.', status: 'In Control', deviationSD: 0.0 },
      { id: 'dp-4', date: '14 Agu', value: 14.5, runBy: 'Rizky P.', status: '1s Warning', deviationSD: 0.85 },
      { id: 'dp-5', date: '15 Agu', value: 14.25, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.14 },
      { id: 'dp-6', date: '16 Agu', value: 14.15, runBy: 'Annisa W.', status: 'In Control', deviationSD: -0.14 },
      { id: 'dp-7', date: '17 Agu', value: 14.2, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.0 }
    ]
  },
  {
    id: 'qc-002',
    code: 'QC-PH-STD7',
    analyteName: 'pH Buffer Standard 7.00',
    controlLevel: 'Level 2 (Normal)',
    unit: 'pH',
    targetMean: 7.00,
    targetSD: 0.05,
    instrument: 'pH Meter Mettler Toledo SevenDirect',
    lotNumber: 'LOT-BF7-NIST-2026',
    expiryDate: '2027-08-30',
    dataPoints: [
      { id: 'dp-11', date: '11 Agu', value: 7.01, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.20 },
      { id: 'dp-12', date: '12 Agu', value: 6.99, runBy: 'Rizky P.', status: 'In Control', deviationSD: -0.20 },
      { id: 'dp-13', date: '13 Agu', value: 7.02, runBy: 'Annisa W.', status: 'In Control', deviationSD: 0.40 },
      { id: 'dp-14', date: '14 Agu', value: 7.00, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.0 },
      { id: 'dp-15', date: '15 Agu', value: 6.98, runBy: 'Rizky P.', status: 'In Control', deviationSD: -0.40 },
      { id: 'dp-16', date: '16 Agu', value: 7.01, runBy: 'Annisa W.', status: 'In Control', deviationSD: 0.20 },
      { id: 'dp-17', date: '17 Agu', value: 7.00, runBy: 'Rizky P.', status: 'In Control', deviationSD: 0.0 }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-101',
    timestamp: '2026-08-17 15:10:24 WIB',
    userId: 'usr-mgr',
    userName: 'apt. Maya Sartika, M.Farm',
    role: 'LAB_MANAGER',
    action: 'COA_APPROVAL',
    target: 'Sample LIMY-2026-0817-001',
    ipAddress: '192.168.1.45',
    device: 'Apple iPad Pro (LIMY App iOS)',
    status: 'Success',
    details: 'Menyetujui hasil uji air baku dan menerbitkan Certificate of Analysis COA-LIMY-2026/08/1749.'
  },
  {
    id: 'aud-102',
    timestamp: '2026-08-17 14:30:11 WIB',
    userId: 'usr-qc',
    userName: 'Annisa Tri Wahyuni, S.Tr.Kes',
    role: 'QC_OFFICER',
    action: 'QC_VALIDATION_PASSED',
    target: 'Sample LIMY-2026-0817-001',
    ipAddress: '192.168.1.88',
    device: 'Samsung Galaxy Tab S9 (LIMY Android)',
    status: 'Success',
    details: 'Validasi kontrol mutu analit pH, TDS, Kekeruhan, dan E.coli status PASSED.'
  },
  {
    id: 'aud-103',
    timestamp: '2026-08-17 11:20:05 WIB',
    userId: 'usr-analyst',
    userName: 'Rizky Pratama, S.Si',
    role: 'ANALYST',
    action: 'RESULT_DATA_ENTRY',
    target: 'Sample LIMY-2026-0817-001',
    ipAddress: '192.168.1.102',
    device: 'iPhone 16 Pro (LIMY iOS)',
    status: 'Success',
    details: 'Memasukkan 4 parameter uji air baku beserta catatan rujukan normal SNI.'
  },
  {
    id: 'aud-104',
    timestamp: '2026-08-17 09:45:00 WIB',
    userId: 'usr-admin',
    userName: 'dr. Hendra Kusuma, Sp.PK',
    role: 'SUPER_ADMIN',
    action: 'SAMPLE_REGISTRATION',
    target: 'Sample LIMY-2026-0817-001',
    ipAddress: '192.168.1.10',
    device: 'MacBook Pro Desktop (Web Browser)',
    status: 'Success',
    details: 'Registrasi sampel baru PT Tirta Mandiri Sejahtera dan cetak label barcode/QR code.'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    timestamp: '5 menit lalu',
    title: 'Hasil Uji Kritis STAT Membutuhkan Perhatian',
    message: 'Sampel Darah Tn. Sugianto (LIMY-2026-0817-002) menunjukkan Leukositosis Kritis (18.6 10^3/uL).',
    type: 'critical',
    read: false,
    linkTab: 'samples'
  },
  {
    id: 'notif-2',
    timestamp: '35 menit lalu',
    title: 'Jadwal Kalibrasi Alat Tersisa 3 Hari',
    message: 'UV-VIS Spectrophotometer UV-1900i (EQP-SPEK-02) jatuh tempo kalibrasi pada 20 Agustus 2026.',
    type: 'warning',
    read: false,
    linkTab: 'equipment'
  },
  {
    id: 'notif-3',
    timestamp: '1 jam lalu',
    title: 'Stok Reagen Kritis di Bawah Batas Minimum',
    message: 'Reagen Kit Hematologi Sysmex Cellpack DCL tersisa 4 Galon (Batas min: 6). Segera buat PO.',
    type: 'warning',
    read: false,
    linkTab: 'inventory'
  },
  {
    id: 'notif-4',
    timestamp: '2 jam lalu',
    title: 'Certificate of Analysis Terbit',
    message: 'COA untuk sampel Air Baku Ciburial PT Tirta Mandiri telah berhasil ditandatangani dan siap diunduh.',
    type: 'success',
    read: true,
    linkTab: 'reports'
  }
];
