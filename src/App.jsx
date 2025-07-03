// src/App.jsx
import React, { useState } from 'react';
import OrgChart from './components/OrgChart';
import { governmentMembers as initialGovernmentMembers } from './data/governmentData';
import './App.css'; // No longer needed if using index.css for global Tailwind

function App() {
  const [governmentMembers, setGovernmentMembers] = useState(initialGovernmentMembers);

  const handleUpdateMember = (id, updatedFields) => {
    setGovernmentMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, ...updatedFields } : member
      )
    );
  };

  return (
    <div className="App">
      <OrgChart data={governmentMembers} onUpdateMember={handleUpdateMember} />
    </div>
  );
}

export default App;