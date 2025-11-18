import React, { useState, useEffect } from 'react';
import { vitalLogsAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

function Dashboard() {
  const [vitalLogs, setVitalLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vital logs from backend
  useEffect(() => {
    const fetchVitalLogs = async () => {
      try {
        const response = await vitalLogsAPI.getAll();
        setVitalLogs(response.data);
      } catch (error) {
        console.error('Error fetching vital logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVitalLogs();
  }, []);

  // Prepare data for weight chart (last 7 entries)
  const weightChartData = vitalLogs
    .filter(log => log.weight)
    .slice(-7)
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: log.weight
    }));

  // Prepare data for blood pressure chart (last 7 entries)
  const bpChartData = vitalLogs
    .filter(log => log.systolic && log.diastolic)
    .slice(-7)
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      systolic: log.systolic,
      diastolic: log.diastolic
    }));

  // Prepare data for heart rate chart (last 7 entries)
  const heartRateData = vitalLogs
    .filter(log => log.heartRate)
    .slice(-7)
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      heartRate: log.heartRate
    }));

  // Calculate averages
  const calculateAverage = (field) => {
    const values = vitalLogs.filter(log => log[field]).map(log => log[field]);
    return values.length > 0 ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : '--';
  };

  const averages = {
    systolic: calculateAverage('systolic'),
    diastolic: calculateAverage('diastolic'),
    heartRate: calculateAverage('heartRate'),
    weight: calculateAverage('weight'),
  };

  // Get recent logs (last 5)
  const recentLogs = vitalLogs.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Health Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">Avg. Blood Pressure</p>
          <p className="text-xl font-bold text-blue-600">
            {averages.systolic}/{averages.diastolic}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">Avg. Heart Rate</p>
          <p className="text-xl font-bold text-red-600">
            {averages.heartRate} bpm
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">Avg. Weight</p>
          <p className="text-xl font-bold text-green-600">
            {averages.weight} kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-500">Total Logs</p>
          <p className="text-xl font-bold text-purple-600">{vitalLogs.length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weight Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Weight Trend</h3>
          {weightChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">No weight data available. Add some vital logs to see trends!</p>
            </div>
          )}
        </div>

        {/* Blood Pressure Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Blood Pressure Trend</h3>
          {bpChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bpChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">No blood pressure data available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Heart Rate Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Heart Rate Trend</h3>
          {heartRateData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="heartRate" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">No heart rate data available.</p>
            </div>
          )}
        </div>

        {/* Data Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Health Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Pressure Status:</span>
              <span className={`font-semibold ${
                averages.systolic > 120 || averages.diastolic > 80 ? 'text-orange-500' : 'text-green-500'
              }`}>
                {averages.systolic > 120 || averages.diastolic > 80 ? 'Monitor' : 'Normal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Heart Rate Status:</span>
              <span className={`font-semibold ${
                averages.heartRate > 100 ? 'text-orange-500' : 'text-green-500'
              }`}>
                {averages.heartRate > 100 ? 'Elevated' : 'Normal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking Period:</span>
              <span className="font-semibold">
                {vitalLogs.length > 0 ? `${vitalLogs.length} days` : 'Just started'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold p-4 border-b">Recent Vital Logs</h3>
        {loading ? (
          <p className="p-4 text-gray-500">Loading your health data...</p>
        ) : recentLogs.length === 0 ? (
          <p className="p-4 text-gray-500">No vital logs yet. Start tracking your health metrics in the Vital Logs tab!</p>
        ) : (
          <div className="divide-y">
            {recentLogs.map((log) => (
              <div key={log._id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {log.systolic && log.diastolic ? `BP: ${log.systolic}/${log.diastolic}` : ''}
                      {log.systolic && log.heartRate ? ' | ' : ''}
                      {log.heartRate ? `HR: ${log.heartRate}` : ''}
                      {log.weight ? ` | Weight: ${log.weight}kg` : ''}
                      {log.bloodSugar ? ` | Sugar: ${log.bloodSugar}` : ''}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(log.date).toLocaleDateString()} at {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {log.notes && ` • ${log.notes}`}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {new Date(log.date).toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : 'Previous'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;