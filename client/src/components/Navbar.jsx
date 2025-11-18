function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">🏥 MediTrack</h1>
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'vitals'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Vital Logs
            </button>
            <button
              onClick={() => setActiveTab('medications')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'medications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              Medications
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;