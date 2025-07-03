// src/data/orgChartData.js

import { governmentMembers } from './governmentData';
import { tremereChantry } from './chantryData'; // <-- Create this file
import { anarchNetwork } from './anarchData';       // <-- Create this file

export const orgCharts = {
  government: {
    label: 'Kindred Government',
    data: governmentMembers,
  },
  camarilla: {
    label: 'Tremere Chantry',
    data: tremereChantry,
  },
  anarch: {
    label: 'Anarch Movement',
    data: anarchNetwork,
  },
};
