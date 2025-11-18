import React, { useState, useEffect } from 'react';
import { vitalLogsAPI } from '../services/api';

function VitalLogs() {
  const [vitalLogs, setVitalLogs] = useState([]);
  const [formData, setFormData] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    weight: '',
    bloodSugar: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch vital logs
  useEffect(() => {
    const fetchVitalLogs = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await vitalLogsAPI.getAll();
        setVitalLogs(response.data);
      } catch (error) {
        console.error('Error fetching vital logs:', error);
        setError('Failed to load vital logs. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchVitalLogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await vitalLogsAPI.create(formData);
      setVitalLogs([response.data, ...vitalLogs]);
      setFormData({
        systolic: '', diastolic: '', heartRate: '', weight: '', bloodSugar: '', notes: ''
      });
    } catch (error) {
      console.error('Error creating vital log:', error);
      setError('Failed to save vital log. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vital log?')) {
      return;
    }
    
    try {
      await vitalLogsAPI.delete(id);
      setVitalLogs(vitalLogs.filter(log => log._id !== id));
    } catch (error) {
      console.error('Error deleting vital log:', error);
      setError('Failed to delete vital log.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Signs Log</h2>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      {/* Add Vital Log Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Vital Log</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Systolic BP</label>
            <input
              type="number"
              name="systolic"
              placeholder="120"
              value={formData.systolic}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="50"
              max="250"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic BP</label>
            <input
              type="number"
              name="diastolic"
              placeholder="80"
              value={formData.diastolic}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="30"
              max="150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
            <input
              type="number"
              name="heartRate"
              placeholder="72"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="30"
              max="250"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="70"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="20"
              max="300"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar</label>
            <input
              type="number"
              name="bloodSugar"
              placeholder="100"
              value={formData.bloodSugar}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="50"
              max="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <input
              type="text"
              name="notes"
              placeholder="How are you feeling?"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Vital Log'}
        </button>
      </form>

      {/* Vital Logs List */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold p-4 border-b">Recent Vital Logs</h3>
        {loading ? (
          <p className="p-4 text-gray-500">Loading vital logs...</p>
        ) : vitalLogs.length === 0 ? (
          <p className="p-4 text-gray-500">No vital logs yet. Add your first one above!</p>
        ) : (
          <div className="divide-y">
            {vitalLogs.map((log) => (
              <div key={log._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4 mb-2">
                    {log.systolic && log.diastolic && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        BP: {log.systolic}/{log.diastolic}
                      </span>
                    )}
                    {log.heartRate && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        HR: {log.heartRate}
                      </span>
                    )}
                    {log.weight && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        Weight: {log.weight}kg
                      </span>
                    )}
                    {log.bloodSugar && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                        Sugar: {log.bloodSugar}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {log.notes && ` • ${log.notes}`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200 ml-4"
                  title="Delete this log"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VitalLogs;