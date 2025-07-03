// src/components/GovernmentMember.jsx
import React, { forwardRef } from 'react';

// Use forwardRef to allow parent components to get a ref to this component's DOM node
const GovernmentMember = forwardRef(({ member }, ref) => {
  // Removed all useState for editing and related handlers

  // Define the node dimensions. These should match what's used in OrgChart for line calculation.
  const nodeWidth = 160; // w-40 = 160px
  const nodeHeight = 220; // Enough space for image + text

  return (
    <div
      ref={ref} // Attach the ref to the root div of the component
      style={{ width: nodeWidth, height: nodeHeight }} // Fixed dimensions for line calculations
      className="
        relative
        flex flex-col items-center
        border border-gray-700
        rounded-lg
        bg-gray-800 text-gray-100
        shadow-lg
        p-2
        text-center
        overflow-hidden
      "
    >
      <div className="flex flex-col items-center h-full w-full">
        {/* Image Section */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-700 flex-shrink-0 mt-2">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'src/assets/questionmark.png'; }} // Fallback for broken images
          />
        </div>
        {/* Info Section */}
        <div className="mt-2 flex-grow flex flex-col justify-end pb-1 w-full">
          <h3 className="text-lg font-bold mb-0 leading-tight">{member.name}</h3>
          <p className="text-gray-400 italic text-sm leading-tight">{member.title}</p>
          <p className="text-gray-300 text-xs leading-tight">Clan: {member.clan}</p>
          {/* Removed Edit button */}
        </div>
      </div>
    </div>
  );
});

export default GovernmentMember;