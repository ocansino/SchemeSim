// src/components/OrgChart.jsx
import React, { useState, useRef, useEffect } from 'react';
import GovernmentMember from './GovernmentMember';

// Define the dimensions for consistent calculation
// These should match the fixed dimensions set in GovernmentMember.jsx
const NODE_WIDTH = 160; // w-40 = 160px
const NODE_HEIGHT = 220; // Enough space for image + text

function OrgChart({ data }) { // No longer passing onUpdateMember as edit is removed
  const prince = data.find(member => member.title.includes('Prince'));
  const primogens = data.filter(member => member.boss === (prince ? prince.id : null));

  const princeRef = useRef(null);
  const primogenRefs = useRef({});
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [lines, setLines] = useState([]);

  const drawLines = () => {
    if (!princeRef.current || !containerRef.current || !svgRef.current) {
      setLines([]);
      return;
    }

    const newLines = [];
    const containerRect = containerRef.current.getBoundingClientRect();

    // PRINCE coordinates - Lines will connect from the bottom center of the NODE
    const princeNodeRect = princeRef.current.getBoundingClientRect();
    const princeNodeCenterX = princeNodeRect.left + princeNodeRect.width / 2 - containerRect.left;
    const princeNodeBottomY = princeNodeRect.bottom - containerRect.top;


    // Define the Y-coordinate for the horizontal connecting line.
    // This line should be a fixed distance below the Prince's node bottom.
    const horizontalLineY = princeNodeBottomY + 40; // Adjust 40px as needed for spacing


    // PRIMOGEN coordinates - Lines will connect to the top center of the NODE
    const primogenPositions = primogens.map(primogen => {
      const primogenNode = primogenRefs.current[primogen.id];
      if (primogenNode) {
        const primogenNodeRect = primogenNode.getBoundingClientRect();
        return {
          id: primogen.id,
          x: primogenNodeRect.left + primogenNodeRect.width / 2 - containerRect.left,
          y: primogenNodeRect.top - containerRect.top, // Top of the Primogen's node
        };
      }
      return null;
    }).filter(Boolean);


    // Draw Lines if Primogens exist
    if (primogenPositions.length > 0) {
      // 1. Vertical Line from Prince's Node Bottom to Horizontal Line
      newLines.push({
        x1: princeNodeCenterX,
        y1: princeNodeBottomY,
        x2: princeNodeCenterX,
        y2: horizontalLineY,
      });

      // Determine the min and max X for the horizontal line based on primogen positions
      const minPrimogenX = Math.min(...primogenPositions.map(p => p.x));
      const maxPrimogenX = Math.max(...primogenPositions.map(p => p.x));

      // 2. Horizontal Connecting Line
      // Ensure the horizontal line extends to cover all primogens' connection points
      newLines.push({
        x1: minPrimogenX,
        y1: horizontalLineY,
        x2: maxPrimogenX,
        y2: horizontalLineY,
      });

      // 3. Vertical Lines from Horizontal Line to each Primogen's Node Top
      primogenPositions.forEach(pos => {
        newLines.push({
          x1: pos.x,
          y1: horizontalLineY,
          x2: pos.x,
          y2: pos.y,
        });
      });
    }

    setLines(newLines);
  };

  // Redraw lines on mount, data change, and window resize
  useEffect(() => {
    // We need a slight delay here to ensure all images and elements are fully rendered and
    // their dimensions are stable before calculating positions.
    const timeoutId = setTimeout(drawLines, 100); // Small delay
    window.addEventListener('resize', drawLines);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', drawLines);
    };
  }, [data]);


  return (
    <div
      ref={containerRef}
      className="font-sans text-gray-100 bg-gray-900 min-h-screen p-8 relative overflow-hidden"
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-300 mb-10 tracking-wide">
        Kindred of Chicago
      </h1>

      <div className="flex flex-col items-center">
        {/* Prince Node */}
        {prince && ( // Ensure prince exists before rendering
          <GovernmentMember member={prince} ref={princeRef} />
        )}

        {/* Primogen Nodes (rendered below the Prince) */}
        {primogens.length > 0 && (
          <div className="flex justify-center flex-wrap gap-x-8 gap-y-12 mt-20">
            {primogens.map(primogen => (
              <GovernmentMember
                key={primogen.id}
                member={primogen}
                ref={el => (primogenRefs.current[primogen.id] = el)}
              />
            ))}
          </div>
        )}
      </div>

      {/* SVG Overlay for Lines */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          width: containerRef.current ? containerRef.current.offsetWidth : '100%',
          height: containerRef.current ? containerRef.current.offsetHeight : '100%',
        }}
      >
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#4A5568" // Tailwind gray-600
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

export default OrgChart;