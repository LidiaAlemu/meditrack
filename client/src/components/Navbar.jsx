import { UserButton } from '@clerk/clerk-react';

function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'vitals', label: 'Vital Logs', icon: '❤️' },
    { id: 'medications', label: 'Medications', icon: '💊' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">
                <span className="text-xl">🏥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MediTrack</h1>
                <p className="text-xs text-gray-500 -mt-1">Health Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Button and Mobile Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="bg-gray-50 rounded-lg px-3 py-1 border">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonBox: "flex items-center space-x-2",
                      userButtonOuterIdentifier: "text-sm font-medium text-gray-700"
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.icon} {tab.label}
                  </option>
                ))}
              </select>
              <div className="border rounded-lg p-1">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;