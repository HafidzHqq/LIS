import React, { createContext, useContext, useState } from 'react';
import { 
  User, 
  UserRole, 
  Sample, 
  SampleStatus, 
  TestResult, 
  InventoryItem, 
  Equipment, 
  QCSample, 
  AuditLog, 
  Notification, 
  Branch, 
  DeviceType 
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_BRANCHES, 
  INITIAL_SAMPLES, 
  INITIAL_INVENTORY, 
  INITIAL_EQUIPMENT, 
  INITIAL_QC_SAMPLES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: UserRole) => void;
  switchUserByRole: (role: UserRole) => void;
  
  branches: Branch[];
  activeBranch: Branch;
  setActiveBranch: (branch: Branch) => void;
  
  samples: Sample[];
  selectedSample: Sample | null;
  setSelectedSample: (sample: Sample | null) => void;
  addSample: (sample: Omit<Sample, 'id' | 'sampleCode' | 'barcode' | 'qrData' | 'chainOfCustody' | 'results' | 'qcStatus' | 'coaGenerated'>) => Sample;
  updateSampleStatus: (sampleId: string, newStatus: SampleStatus, note?: string) => void;
  addSampleTestResult: (sampleId: string, result: TestResult) => void;
  validateSampleQC: (sampleId: string, status: 'Passed' | 'Flagged', notes?: string) => void;
  approveSampleAndGenerateCOA: (sampleId: string) => void;
  
  inventory: InventoryItem[];
  updateStock: (itemId: string, delta: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  
  equipment: Equipment[];
  logEquipmentMaintenance: (equipmentId: string, note: string, type: 'Rutina' | 'Kalibrasi' | 'Perbaikan' | 'Verifikasi Sensor') => void;
  
  qcSamples: QCSample[];
  addQCDataPoint: (qcId: string, value: number) => void;
  
  auditLogs: AuditLog[];
  addAuditLog: (action: string, target: string, details: string, status?: 'Success' | 'Warning' | 'Failed') => void;
  
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  deviceType: DeviceType;
  setDeviceType: (device: DeviceType) => void;
  
  showScanner: boolean;
  setShowScanner: (show: boolean) => void;
  showRegistration: boolean;
  setShowRegistration: (show: boolean) => void;
  showCOAModal: Sample | null;
  setShowCOAModal: (sample: Sample | null) => void;
  showResultEntryModal: Sample | null;
  setShowResultEntryModal: (sample: Sample | null) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]); // Default Super Admin
  const [currentRole, setCurrentRole] = useState<UserRole>(DEMO_USERS[0].role);
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [activeBranch, setActiveBranch] = useState<Branch>(INITIAL_BRANCHES[0]);
  
  const [samples, setSamples] = useState<Sample[]>(INITIAL_SAMPLES);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [equipment, setEquipment] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [qcSamples, setQcSamples] = useState<QCSample[]>(INITIAL_QC_SAMPLES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [deviceType, setDeviceType] = useState<DeviceType>('iphone');
  
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [showCOAModal, setShowCOAModal] = useState<Sample | null>(null);
  const [showResultEntryModal, setShowResultEntryModal] = useState<Sample | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addAuditLog = (
    action: string, 
    target: string, 
    details: string, 
    status: 'Success' | 'Warning' | 'Failed' = 'Success'
  ) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`;
    
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: timeStr,
      userId: currentUser.id,
      userName: currentUser.name,
      role: currentUser.role,
      action,
      target,
      ipAddress: '192.168.1.50',
      device: deviceType === 'iphone' ? 'Apple iPhone 16 Pro (LIMY iOS)' : (deviceType === 'android' ? 'Google Pixel 9 Pro (LIMY Android)' : 'Browser Desktop/Tablet'),
      status,
      details
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchUserByRole = (role: UserRole) => {
    const matchedUser = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentUser(matchedUser);
    setCurrentRole(role);
    addAuditLog('SWITCH_ROLE', `Role ${role}`, `Pengguna beralih peran ke ${matchedUser.roleTitle} (${matchedUser.name})`);
  };

  const addSample = (sampleData: Omit<Sample, 'id' | 'sampleCode' | 'barcode' | 'qrData' | 'chainOfCustody' | 'results' | 'qcStatus' | 'coaGenerated'>) => {
    const sampleIdx = samples.length + 1;
    const now = new Date();
    const dateCode = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const sampleCode = `LIMY-${dateCode}-${String(sampleIdx).padStart(3, '0')}`;
    const barcode = `89910012026${String(sampleIdx).padStart(3, '0')}`;
    const qrData = `LIMY-SMP:${sampleCode}|${sampleData.clientName}|${sampleData.name}`;

    const newSample: Sample = {
      ...sampleData,
      id: `smp-${Date.now()}`,
      sampleCode,
      barcode,
      qrData,
      results: [],
      qcStatus: 'Pending',
      coaGenerated: false,
      chainOfCustody: [
        {
          id: `coc-${Date.now()}`,
          timestamp: `${dateCode} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`,
          stage: 'Registrasi & Barcoding',
          actor: currentUser.name,
          role: currentUser.roleTitle,
          action: 'Registrasi Sampel Baru',
          location: activeBranch.name,
          note: `Sampel ${sampleData.name} terdaftar dengan prioritas ${sampleData.priority}`
        }
      ]
    };

    setSamples(prev => [newSample, ...prev]);
    addAuditLog('SAMPLE_REGISTERED', sampleCode, `Sampel baru '${newSample.name}' berhasil didaftarkan oleh ${currentUser.name}`);
    
    // Auto trigger notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Baru saja',
      title: 'Sampel Baru Terdaftar',
      message: `Sampel ${newSample.sampleCode} (${newSample.name}) siap diproses di ${activeBranch.name}.`,
      type: 'info',
      read: false,
      linkTab: 'samples'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newSample;
  };

  const updateSampleStatus = (sampleId: string, newStatus: SampleStatus, note?: string) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSamples(prev => prev.map(s => {
      if (s.id === sampleId) {
        const updatedEvents = [
          ...s.chainOfCustody,
          {
            id: `coc-${Date.now()}`,
            timestamp: timeStr,
            stage: newStatus,
            actor: currentUser.name,
            role: currentUser.roleTitle,
            action: `Update Status ke ${newStatus}`,
            location: activeBranch.name,
            note: note || `Status diperbarui ke tahap ${newStatus}`
          }
        ];
        return {
          ...s,
          status: newStatus,
          chainOfCustody: updatedEvents
        };
      }
      return s;
    }));

    addAuditLog('SAMPLE_STATUS_UPDATE', `Sample ID ${sampleId}`, `Status sampel diubah menjadi ${newStatus} oleh ${currentUser.name}`);
  };

  const addSampleTestResult = (sampleId: string, result: TestResult) => {
    setSamples(prev => prev.map(s => {
      if (s.id === sampleId) {
        const existingResults = s.results.filter(r => r.parameterId !== result.parameterId);
        const updatedResults = [...existingResults, result];
        
        // Auto update sample status to Testing if previously Received or Processing
        const newStatus: SampleStatus = s.status === 'Registered' || s.status === 'Received' || s.status === 'Processing' 
          ? 'Testing' 
          : s.status;

        return {
          ...s,
          status: newStatus,
          results: updatedResults
        };
      }
      return s;
    }));

    addAuditLog('RESULT_ENTRY', `Sample ID ${sampleId}`, `Parameter ${result.parameterName}: ${result.value} ${result.unit} (${result.status}) diinput oleh ${currentUser.name}`);
  };

  const validateSampleQC = (sampleId: string, status: 'Passed' | 'Flagged', notes?: string) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    setSamples(prev => prev.map(s => {
      if (s.id === sampleId) {
        const newStatus: SampleStatus = status === 'Passed' ? 'Approved' : 'QC Review';
        const newEvents = [
          ...s.chainOfCustody,
          {
            id: `coc-${Date.now()}`,
            timestamp: timeStr,
            stage: 'Validasi QC',
            actor: currentUser.name,
            role: currentUser.roleTitle,
            action: `QC Mutu Hasil: ${status}`,
            location: activeBranch.name,
            note: notes || (status === 'Passed' ? 'Semua uji duplo dan blanko valid' : 'Perlu pengujian ulang parameter tertentu')
          }
        ];

        return {
          ...s,
          qcStatus: status,
          qcReviewer: currentUser.name,
          qcReviewedAt: timeStr,
          qcNotes: notes,
          status: newStatus,
          chainOfCustody: newEvents
        };
      }
      return s;
    }));

    addAuditLog('QC_VALIDATION', `Sample ID ${sampleId}`, `Status QC ditetapkan: ${status} (${notes || 'No note'}) oleh ${currentUser.name}`);
  };

  const approveSampleAndGenerateCOA = (sampleId: string) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const coaNumber = `COA-LIMY-${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${Math.floor(1000 + Math.random() * 9000)}`;

    setSamples(prev => prev.map(s => {
      if (s.id === sampleId) {
        const newEvents = [
          ...s.chainOfCustody,
          {
            id: `coc-${Date.now()}`,
            timestamp: timeStr,
            stage: 'Otorisasi & Rilis COA',
            actor: currentUser.name,
            role: currentUser.roleTitle,
            action: 'Penerbitan Sertifikat Hasil Uji Resmi',
            location: activeBranch.name,
            note: `Nomor Sertifikat: ${coaNumber}`
          }
        ];

        return {
          ...s,
          status: 'Approved',
          coaGenerated: true,
          coaNumber,
          approvedBy: currentUser.name,
          approvedAt: timeStr,
          chainOfCustody: newEvents
        };
      }
      return s;
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    addAuditLog('COA_ISSUANCE', `Sample ID ${sampleId}`, `Sertifikat Hasil Uji ${coaNumber} resmi diterbitkan oleh ${currentUser.name}`);
  };

  const updateStock = (itemId: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = Math.max(0, item.currentStock + delta);
        const newStatus = newStock === 0 ? 'Expired' : (newStock <= item.minStock ? 'Low' : 'Normal');
        return {
          ...item,
          currentStock: newStock,
          status: newStatus
        };
      }
      return item;
    }));

    addAuditLog('INVENTORY_MUTATION', `Item ID ${itemId}`, `Perubahan stok (${delta > 0 ? '+' : ''}${delta}) dilakukan oleh ${currentUser.name}`);
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`
    };
    setInventory(prev => [newItem, ...prev]);
    addAuditLog('INVENTORY_ADDED', newItem.name, `Item baru '${newItem.name}' ditambahkan oleh ${currentUser.name}`);
  };

  const logEquipmentMaintenance = (equipmentId: string, note: string, type: 'Rutina' | 'Kalibrasi' | 'Perbaikan' | 'Verifikasi Sensor') => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    setEquipment(prev => prev.map(eq => {
      if (eq.id === equipmentId) {
        const newHistory = [
          {
            id: `mh-${Date.now()}`,
            date: dateStr,
            type,
            technician: currentUser.name,
            note
          },
          ...eq.maintenanceHistory
        ];

        return {
          ...eq,
          status: 'Active',
          lastCalibrationDate: type === 'Kalibrasi' ? dateStr : eq.lastCalibrationDate,
          maintenanceHistory: newHistory
        };
      }
      return eq;
    }));

    addAuditLog('EQUIPMENT_MAINTENANCE', `Equipment ID ${equipmentId}`, `Log maintenance '${type}': ${note} oleh ${currentUser.name}`);
  };

  const addQCDataPoint = (qcId: string, value: number) => {
    const now = new Date();
    const dateStr = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })}`;

    setQcSamples(prev => prev.map(qc => {
      if (qc.id === qcId) {
        const deviationSD = Number(((value - qc.targetMean) / qc.targetSD).toFixed(2));
        let status: 'In Control' | '1s Warning' | '2s Violation' | '10x Trend' = 'In Control';
        if (Math.abs(deviationSD) >= 2) status = '2s Violation';
        else if (Math.abs(deviationSD) >= 1) status = '1s Warning';

        const newPoint = {
          id: `dp-${Date.now()}`,
          date: dateStr,
          value,
          runBy: currentUser.name.split(' ')[0],
          status,
          deviationSD
        };

        return {
          ...qc,
          dataPoints: [...qc.dataPoints, newPoint]
        };
      }
      return qc;
    }));

    addAuditLog('QC_RUN_LOG', `QC ID ${qcId}`, `Input running QC nilai: ${value} oleh ${currentUser.name}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentUser,
        setCurrentRole,
        switchUserByRole,
        branches,
        activeBranch,
        setActiveBranch,
        samples,
        selectedSample,
        setSelectedSample,
        addSample,
        updateSampleStatus,
        addSampleTestResult,
        validateSampleQC,
        approveSampleAndGenerateCOA,
        inventory,
        updateStock,
        addInventoryItem,
        equipment,
        logEquipmentMaintenance,
        qcSamples,
        addQCDataPoint,
        auditLogs,
        addAuditLog,
        notifications,
        markNotificationRead,
        activeTab,
        setActiveTab,
        deviceType,
        setDeviceType,
        showScanner,
        setShowScanner,
        showRegistration,
        setShowRegistration,
        showCOAModal,
        setShowCOAModal,
        showResultEntryModal,
        setShowResultEntryModal,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
