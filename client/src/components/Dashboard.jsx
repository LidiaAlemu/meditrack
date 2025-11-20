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
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h2>
        <p className="text-gray-600">Monitor your health trends and vital signs overview</p>
      </div>
      
      {/* Premium Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Blood Pressure Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <span className="text-2xl">❤️</span>
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
              averages.systolic > 120 || averages.diastolic > 80 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {averages.systolic > 120 || averages.diastolic > 80 ? 'Monitor' : 'Normal'}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Blood Pressure</h3>
          <p className="text-2xl font-bold text-gray-900">
            {averages.systolic}/{averages.diastolic}
          </p>
          <p className="text-xs text-gray-500 mt-2">Avg. systolic/diastolic</p>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <span className="text-2xl">💓</span>
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
              averages.heartRate > 100 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {averages.heartRate > 100 ? 'Elevated' : 'Normal'}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Heart Rate</h3>
          <p className="text-2xl font-bold text-gray-900">
            {averages.heartRate} <span className="text-lg font-normal text-gray-600">bpm</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Beats per minute</p>
        </div>

        {/* Weight Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <span className="text-2xl">⚖️</span>
            </div>
            <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              Trend
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Weight</h3>
          <p className="text-2xl font-bold text-gray-900">
            {averages.weight} <span className="text-lg font-normal text-gray-600">kg</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Average body weight</p>
        </div>

        {/* Total Logs Card */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <span className="text-2xl">📊</span>
            </div>
            <div className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
              Total
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Health Logs</h3>
          <p className="text-2xl font-bold text-gray-900">{vitalLogs.length}</p>
          <p className="text-xs text-gray-500 mt-2">Records tracked</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weight Trend Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weight Trend</h3>
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Last 7 days
            </div>
          </div>
          {weightChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-gray-500">
              <div className="text-4xl mb-2">📈</div>
              <p className="font-medium">No weight data yet</p>
              <p className="text-sm mt-1">Add vital logs to see your trends</p>
            </div>
          )}
        </div>

        {/* Blood Pressure Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Blood Pressure Trend</h3>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Last 7 days
            </div>
          </div>
          {bpChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bpChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-gray-500">
              <div className="text-4xl mb-2">💙</div>
              <p className="font-medium">No blood pressure data</p>
              <p className="text-sm mt-1">Track your BP to see trends</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Heart Rate Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Heart Rate Trend</h3>
            <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
              Last 7 days
            </div>
          </div>
          {heartRateData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar 
                  dataKey="heartRate" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]}
                  name="Heart Rate"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-gray-500">
              <div className="text-4xl mb-2">💓</div>
              <p className="font-medium">No heart rate data</p>
              <p className="text-sm mt-1">Log your heart rate to see patterns</p>
            </div>
          )}
        </div>

        {/* Health Summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Health Summary</h3>
            <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
              Overview
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600">❤️</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Blood Pressure</p>
                  <p className="text-sm text-gray-500">Status</p>
                </div>
              </div>
              <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                averages.systolic > 120 || averages.diastolic > 80 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {averages.systolic > 120 || averages.diastolic > 80 ? 'Monitor' : 'Normal'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <span className="text-red-600">💓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Heart Rate</p>
                  <p className="text-sm text-gray-500">Status</p>
                </div>
              </div>
              <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                averages.heartRate > 100 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {averages.heartRate > 100 ? 'Elevated' : 'Normal'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600">📅</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tracking Period</p>
                  <p className="text-sm text-gray-500">Consistency</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900">
                {vitalLogs.length > 0 ? `${vitalLogs.length} days` : 'Just started'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Vital Logs</h3>
          <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
            Latest entries
          </div>
        </div>
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600"></div>
              <div>
                <p className="text-gray-700 font-medium">Loading your health dashboard...</p>
                <p className="text-gray-500 text-sm mt-1">Please wait while we fetch your latest data</p>
              </div>
            </div>
          </div> 
        ) : recentLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p className="font-medium">No vital logs yet</p>
            <p className="text-sm mt-1">Start tracking your health metrics in the Vital Logs tab!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentLogs.map((log) => (
              <div key={log._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-3">
                      {log.systolic && log.diastolic && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1">
                          <span>❤️</span>
                          <span>BP: {log.systolic}/{log.diastolic}</span>
                        </span>
                      )}
                      {log.heartRate && (
                        <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1">
                          <span>💓</span>
                          <span>HR: {log.heartRate}</span>
                        </span>
                      )}
                      {log.weight && (
                        <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1">
                          <span>⚖️</span>
                          <span>Weight: {log.weight}kg</span>
                        </span>
                      )}
                      {log.bloodSugar && (
                        <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center space-x-1">
                          <span>🩸</span>
                          <span>Sugar: {log.bloodSugar}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>{new Date(log.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🕒</span>
                        <span>{new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                      {log.notes && (
                        <span className="flex items-center space-x-1">
                          <span>📝</span>
                          <span>{log.notes}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    new Date(log.date).toLocaleDateString() === new Date().toLocaleDateString() 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
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