export type UserRole = 'SUPER_ADMIN' | 'LAB_MANAGER' | 'ANALYST' | 'QC_OFFICER' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleTitle: string;
  avatarUrl?: string;
  branchId: string;
  branchName: string;
  employeeId?: string;
  department?: string;
  shift?: string;
}

export type SampleCategory = 
  | 'Air & Lingkungan'
  | 'Darah & Klinis'
  | 'Urin & Biologis'
  | 'Makanan & Minuman'
  | 'Farmasi & Obat'
  | 'Mikrobiologi Industri';

export type SampleStatus = 
  | 'Registered'
  | 'Received'
  | 'Processing'
  | 'Testing'
  | 'QC Review'
  | 'Approved'
  | 'Rejected'
  | 'Archived';

export type Priority = 'Routine' | 'Urgent' | 'STAT';

export interface TestParameter {
  id: string;
  name: string;
  unit: string;
  referenceMin?: number;
  referenceMax?: number;
  referenceText?: string;
  method: string;
  equipmentRequired?: string;
}

export interface TestResult {
  parameterId: string;
  parameterName: string;
  unit: string;
  value: string;
  numericValue?: number;
  referenceRange: string;
  status: 'Normal' | 'Abnormal' | 'Critical' | 'Pending';
  notes?: string;
  analystName?: string;
  analystId?: string;
  enteredAt?: string;
}

export interface CustodyEvent {
  id: string;
  timestamp: string;
  stage: string;
  actor: string;
  role: string;
  action: string;
  location: string;
  note?: string;
}

export interface Sample {
  id: string;
  sampleCode: string; // e.g. "LIMY-2026-0817-001"
  barcode: string;
  qrData: string;
  name: string;
  category: SampleCategory;
  collectionLocation: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  collectedAt: string;
  receivedAt: string;
  status: SampleStatus;
  priority: Priority;
  temperatureAtArrival: string; // e.g. "4°C (Cold Chain Verified)"
  condition: 'Good' | 'Fair' | 'Damaged' | 'Hemolyzed';
  parameters: TestParameter[];
  results: TestResult[];
  qcStatus: 'Pending' | 'Passed' | 'Flagged';
  qcReviewer?: string;
  qcReviewedAt?: string;
  qcNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
  coaGenerated: boolean;
  coaNumber?: string;
  microscopePhotoUrl?: string;
  chainOfCustody: CustodyEvent[];
  branchId: string;
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: 'Reagen Kimia' | 'Kultur Media' | 'Bahan Kimia Murni' | 'Consumables & Tips' | 'Standar Kalibrasi';
  currentStock: number;
  minStock: number;
  unit: string;
  storageLocation: string; // e.g. "Freezer B (-20°C)"
  lotNumber: string;
  expiryDate: string;
  supplierName: string;
  pricePerUnit: number;
  status: 'Normal' | 'Low' | 'Expired';
  lastRestocked: string;
}

export interface Equipment {
  id: string;
  code: string;
  name: string;
  category: string;
  model: string;
  serialNumber: string;
  room: string;
  status: 'Active' | 'Under Maintenance' | 'Calibration Due' | 'Out of Service';
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  daysUntilCalibration: number;
  calibrationIntervalDays: number;
  maintenanceHistory: {
    id: string;
    date: string;
    type: 'Rutina' | 'Kalibrasi' | 'Perbaikan' | 'Verifikasi Sensor';
    technician: string;
    note: string;
    cost?: number;
  }[];
}

export interface QCSampleDataPoint {
  id: string;
  date: string;
  value: number;
  runBy: string;
  status: 'In Control' | '1s Warning' | '2s Violation' | '10x Trend';
  deviationSD: number;
}

export interface QCSample {
  id: string;
  code: string;
  analyteName: string;
  controlLevel: 'Level 1 (Low)' | 'Level 2 (Normal)' | 'Level 3 (High)';
  unit: string;
  targetMean: number;
  targetSD: number;
  instrument: string;
  lotNumber: string;
  expiryDate: string;
  dataPoints: QCSampleDataPoint[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  target: string;
  ipAddress: string;
  device: string;
  status: 'Success' | 'Warning' | 'Failed';
  details: string;
}

export interface Notification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  read: boolean;
  linkTab?: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  isHQ: boolean;
}

export type DeviceType = 'iphone' | 'android' | 'responsive';
