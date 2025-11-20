import { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import VitalLogs from './VitalLogs';
import Medications from './Medications';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'vitals':
        return <VitalLogs />;
      case 'medications':
        return <Medications />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="py-8">
        {renderContent()}
      </main>
    </>
  );
}

export default MainApp;