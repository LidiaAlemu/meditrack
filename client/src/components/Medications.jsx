import React, { useState, useEffect } from 'react';
import { medicationsAPI } from '../services/api';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once daily');
  const [loading, setLoading] = useState(false);

  // Fetch medications from backend
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        const response = await medicationsAPI.getAll();
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await medicationsAPI.create({ name, dosage, frequency });
      setMedications([...medications, response.data]);
      setName('');
      setDosage('');
      setFrequency('once daily');
    } catch (error) {
      console.error('Error creating medication:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await medicationsAPI.delete(id);
      setMedications(medications.filter(med => med._id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  const handleToggleTaken = async (id) => {
    try {
      const response = await medicationsAPI.toggleTaken(id);
      setMedications(medications.map(med => 
        med._id === id ? response.data : med
      ));
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Medication Tracker</h2>
      
      {/* Add Medication Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Medication</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Medication Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 500mg)"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="once daily">Once Daily</option>
            <option value="twice daily">Twice Daily</option>
            <option value="three times daily">Three Times Daily</option>
            <option value="as needed">As Needed</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add Medication
        </button>
      </form>

      {/* Medications List */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold p-4 border-b">
          Your Medications ({medications.length})
          {loading && <span className="text-sm text-gray-500 ml-2">Loading...</span>}
        </h3>
        {loading ? (
          <p className="p-4 text-gray-500">Loading medications...</p>
        ) : medications.length === 0 ? (
          <p className="p-4 text-gray-500">No medications yet. Add your first one above!</p>
        ) : (
          <div className="divide-y">
            {medications.map((med) => (
              <div key={med._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleTaken(med._id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      med.isTaken 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {med.isTaken && '✓'}
                  </button>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {med.name} - {med.dosage}
                    </p>
                    <p className="text-sm text-gray-500">
                      Frequency: {med.frequency}
                      {med.lastTaken && ` • Last taken: ${new Date(med.lastTaken).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(med._id)}
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition duration-200"
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

export default Medications;