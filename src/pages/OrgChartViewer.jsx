// src/pages/OrgChartViewer.jsx

import React, { useState } from 'react';
import OrgChart from '../components/OrgChart';
import { orgCharts } from '../data/orgChartData';

export default function OrgChartViewer() {
  const [selectedKey, setSelectedKey] = useState('government');
  const currentChart = orgCharts[selectedKey];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-lg">Select Org Chart:</label>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-4 py-2"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            {Object.entries(orgCharts).map(([key, chart]) => (
              <option key={key} value={key}>
                {chart.label}
              </option>
            ))}
          </select>
        </div>

        <OrgChart data={currentChart.data} />
      </div>
    </div>
  );
}
