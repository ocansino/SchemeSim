// src/data/orgChartData.js

import { governmentMembers } from './governmentData';
import { tremereChantry } from './chantryData'; 
import { anarchNetwork } from './anarchData';       

export const orgCharts = {
  government: {
    label: 'Camarilla Government',
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
