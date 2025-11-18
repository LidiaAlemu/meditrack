function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">🏥 MediTrack</h1>
        <p className="text-xl text-gray-700 mb-2">Your Personal Health Dashboard</p>
        <p className="text-gray-500">Track your health metrics and medications</p>
        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg mr-4">
            Get Started
          </button>
          <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;