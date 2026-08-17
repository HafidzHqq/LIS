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
    name: 'Rian Pratama, A.Md.AK',
    email: 'analis@limy-lab.id',
    phone: '+62 812-8888-0003',
    role: 'ANALYST',
    roleTitle: 'Pranata Laboratorium Kesehatan',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-ANL-003',
    department: 'Lab Kimia & Hematologi',
    shift: 'Shift Pagi (07:00 - 15:30)'
  },
  {
    id: 'usr-qc',
    name: 'Siti Nurhaliza, S.Si',
    email: 'qc@limy-lab.id',
    phone: '+62 812-8888-0004',
    role: 'QC_OFFICER',
    roleTitle: 'Quality Assurance & QC Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    employeeId: 'EMP-QC-004',
    department: 'Unit Penjaminan Mutu',
    shift: 'Reguler (08:00 - 17:00)'
  },
  {
    id: 'usr-client',
    name: 'Budi Santoso (PT Tirta Jaya)',
    email: 'budi@tirtajaya.co.id',
    phone: '+62 813-9999-1234',
    role: 'CUSTOMER',
    roleTitle: 'Klien Industri & Pelanggan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branchId: 'br-jkt',
    branchName: 'LIMY Pusat — Jakarta Lab',
    department: 'Pelanggan Eksternal'
  }
];

// Empty Collections (Clean Database State)
export const INITIAL_SAMPLES: Sample[] = [];

export const INITIAL_INVENTORY: InventoryItem[] = [];

export const INITIAL_EQUIPMENT: Equipment[] = [];

export const INITIAL_QC_SAMPLES: QCSample[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-init-001',
    action: 'SYSTEM_STARTUP',
    target: 'LIMY LIMS v2.0',
    userName: 'Sistem LIMS',
    role: 'SUPER_ADMIN',
    timestamp: '2026-08-17 08:00:00 WIB',
    details: 'Database bersih siap digunakan untuk registrasi sampel baru.',
    ipAddress: '127.0.0.1',
    device: 'Server LIMS'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [];
