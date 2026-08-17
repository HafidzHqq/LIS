import React from 'react';
import { useApp } from './context/AppContext';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { AppHeader } from './components/layout/AppHeader';
import { BottomTabBar } from './components/layout/BottomTabBar';

// Dashboards
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ManagerDashboard } from './components/dashboard/ManagerDashboard';
import { AnalystDashboard } from './components/dashboard/AnalystDashboard';
import { QCOfficerDashboard } from './components/dashboard/QCOfficerDashboard';
import { CustomerPortal } from './components/dashboard/CustomerPortal';

// Modules
import { SampleList } from './components/samples/SampleList';
import { TestManagementScreen } from './components/tests/TestManagementScreen';
import { InventoryScreen } from './components/inventory/InventoryScreen';
import { EquipmentScreen } from './components/equipment/EquipmentScreen';
import { QualityControlScreen } from './components/qc/QualityControlScreen';
import { ReportGeneratorScreen } from './components/reports/ReportGeneratorScreen';
import { AuditTrailScreen } from './components/audit/AuditTrailScreen';
import { AIAssistantScreen } from './components/ai/AIAssistantScreen';

// Modals
import { SampleRegistrationModal } from './components/samples/SampleRegistrationModal';
import { SampleDetailModal } from './components/samples/SampleDetailModal';
import { QRScannerModal } from './components/samples/QRScannerModal';
import { ResultEntryModal } from './components/tests/ResultEntryModal';
import { CertificateOfAnalysisModal } from './components/reports/CertificateOfAnalysisModal';

export const MainApp: React.FC = () => {
  const { 
    activeTab, 
    currentRole,
    showRegistration,
    selectedSample,
    showScanner,
    showResultEntryModal,
    showCOAModal
  } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentRole === 'SUPER_ADMIN') return <AdminDashboard />;
        if (currentRole === 'LAB_MANAGER') return <ManagerDashboard />;
        if (currentRole === 'ANALYST') return <AnalystDashboard />;
        if (currentRole === 'QC_OFFICER') return <QCOfficerDashboard />;
        if (currentRole === 'CUSTOMER') return <CustomerPortal />;
        return <AdminDashboard />;
      case 'samples':
        return <SampleList />;
      case 'tests':
        return <TestManagementScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'equipment':
        return <EquipmentScreen />;
      case 'qc':
        return <QualityControlScreen />;
      case 'reports':
        return <ReportGeneratorScreen />;
      case 'audit':
        return <AuditTrailScreen />;
      case 'ai':
        return <AIAssistantScreen />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <DeviceFrame>
      {/* Frosted Header */}
      <AppHeader />

      {/* Main Tab Content */}
      <div className="flex-1 w-full overflow-y-auto">
        {renderContent()}
      </div>

      {/* Frosted Bottom Navigation */}
      <BottomTabBar />

      {/* Modals */}
      {showRegistration && <SampleRegistrationModal />}
      {selectedSample && <SampleDetailModal />}
      {showScanner && <QRScannerModal />}
      {showResultEntryModal && <ResultEntryModal />}
      {showCOAModal && <CertificateOfAnalysisModal />}
    </DeviceFrame>
  );
};

export const App: React.FC = () => {
  return <MainApp />;
};

export default App;
