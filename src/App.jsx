// src/App.jsx
import React, { useState } from 'react';
import OrgChart from './components/OrgChart';
import { orgCharts } from './data/orgChartData'; // ← dynamic datasets
import './App.css';

function App() {
  const chartKeys = Object.keys(orgCharts);
  const [selectedChartKey, setSelectedChartKey] = useState(chartKeys[0]);
  const [membersData, setMembersData] = useState(orgCharts[selectedChartKey].data);

  const handleChartChange = (e) => {
    const newKey = e.target.value;
    setSelectedChartKey(newKey);
    setMembersData(orgCharts[newKey].data);
  };

  const handleUpdateMember = (id, updatedFields) => {
    setMembersData((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, ...updatedFields } : member
      )
    );
  };

  return (
    <div className="App min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 px-6 py-4 shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">{orgCharts[selectedChartKey].label}</h1>
        <select
          value={selectedChartKey}
          onChange={handleChartChange}
          className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm"
        >
          {chartKeys.map((key) => (
            <option key={key} value={key}>
              {orgCharts[key].label}
            </option>
          ))}
        </select>
      </nav>

      <OrgChart data={membersData} onUpdateMember={handleUpdateMember} />
    </div>
  );
}

export default App;
