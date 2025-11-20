import { useState } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import VitalLogs from './components/VitalLogs';
import Medications from './components/Medications';

function App() {
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
    <div className="min-h-screen bg-gray-50">
      <SignedOut>
        <Auth />
      </SignedOut>
      
      <SignedIn>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="py-8">
          {renderContent()}
        </main>
      </SignedIn>
    </div>
  );
}

export default App;