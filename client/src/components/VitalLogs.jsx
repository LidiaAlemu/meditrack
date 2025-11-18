import { useState, useEffect } from 'react';
import { vitalLogsAPI } from '../services/api';

function VitalLogs() {
  const [vitalLogs, setVitalLogs] = useState([]);
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [notes, setNotes] = useState('');

  // Simple useEffect - no external dependencies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await vitalLogsAPI.getAll();
        setVitalLogs(response.data);
      } catch (error) {
        console.error('Error fetching vital logs:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await vitalLogsAPI.create({
        systolic,
        diastolic,
        heartRate,
        weight,
        bloodSugar,
        notes
      });
      // Reset form
      setSystolic('');
      setDiastolic('');
      setHeartRate('');
      setWeight('');
      setBloodSugar('');
      setNotes('');
      // Refresh data
      const response = await vitalLogsAPI.getAll();
      setVitalLogs(response.data);
    } catch (error) {
      console.error('Error creating vital log:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await vitalLogsAPI.delete(id);
      const response = await vitalLogsAPI.getAll();
      setVitalLogs(response.data);
    } catch (error) {
      console.error('Error deleting vital log:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Signs Log</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Vital Log</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Systolic BP"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Diastolic BP"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Heart Rate"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Blood Sugar"
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add Vital Log
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold p-4 border-b">Recent Vital Logs</h3>
        {vitalLogs.length === 0 ? (
          <p className="p-4 text-gray-500">No vital logs yet. Add your first one above!</p>
        ) : (
          <div className="divide-y">
            {vitalLogs.map((log) => (
              <div key={log._id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    BP: {log.systolic}/{log.diastolic} | HR: {log.heartRate} | Weight: {log.weight}kg
                    {log.bloodSugar && ` | Sugar: ${log.bloodSugar}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(log.date).toLocaleDateString()} • {log.notes}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="text-red-500 hover:text-red-700"
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