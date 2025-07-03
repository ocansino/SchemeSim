// src/components/OrgChart.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import GovernmentMember from './GovernmentMember';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 220;
const VERTICAL_SPACING = 60;
const HORIZONTAL_SPACING = 40;

const HierarchyNode = React.forwardRef(({ member, allMembers, onMemberRendered, scale = 1 }, ref) => {
  const nodeRef = React.useRef(null);
  const subordinates = allMembers.filter(sub => sub.boss === member.id);

  React.useImperativeHandle(ref, () => nodeRef.current);

  useEffect(() => {
    if (nodeRef.current) {
      onMemberRendered(member.id, nodeRef.current);
    }
  }, [member.id, onMemberRendered]);

  return (
    <div className="flex flex-col items-center" data-id={member.id}>
      <GovernmentMember member={member} ref={nodeRef} scale={scale} />
      {subordinates.length > 0 && (
        <div
          className="flex flex-wrap justify-center"
          style={{ marginTop: `${VERTICAL_SPACING * scale}px`, gap: `${HORIZONTAL_SPACING * scale}px` }}
        >
          {subordinates.map(subordinate => (
            <HierarchyNode
              key={subordinate.id}
              member={subordinate}
              allMembers={allMembers}
              onMemberRendered={onMemberRendered}
              scale={scale}
            />
          ))}
        </div>
      )}
    </div>
  );
});

function OrgChart({ data }) {
  const prince = data.find(member => member.title.includes('Prince'));
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  // Compute scale based on max tier size
  const tierMap = React.useMemo(() => {
    const tiers = {};
    function assignTier(member, depth = 0) {
      if (!tiers[depth]) tiers[depth] = [];
      tiers[depth].push(member.id);
      const subs = data.filter(m => m.boss === member.id);
      subs.forEach(sub => assignTier(sub, depth + 1));
    }
    const roots = data.filter(m => !m.boss);
    roots.forEach(root => assignTier(root, 0));
    return tiers;
  }, [data]);

  const maxTierSize = React.useMemo(
    () => Math.max(...Object.values(tierMap).map(arr => arr.length)),
    [tierMap]
  );

  const scale = maxTierSize > 7 ? 7 / maxTierSize : 1;

  const drawLines = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const containerRect = container.getBoundingClientRect();

    const newLines = [];

    data.forEach(member => {
      if (!member.boss) return;

      const bossEl = nodeRefs.current[member.boss];
      const subEl = nodeRefs.current[member.id];

      if (!bossEl || !subEl) return;

      const bossRect = bossEl.getBoundingClientRect();
      const subRect = subEl.getBoundingClientRect();

      // Positions relative to container (no scaling here)
      const x1 = bossRect.left + bossRect.width / 2 - containerRect.left;
      const y1 = bossRect.top + bossRect.height - containerRect.top;

      const x2 = subRect.left + subRect.width / 2 - containerRect.left;
      const y2 = subRect.top - containerRect.top;

      const midY = y1 + (y2 - y1) / 2;

      newLines.push(
        { x1, y1, x2: x1, y2: midY },
        { x1, y1: midY, x2, y2: midY },
        { x1: x2, y1: midY, x2, y2 }
      );
    });

    setLines(newLines);

    // Set SVG size to container size
    svg.setAttribute('width', container.scrollWidth);
    svg.setAttribute('height', container.scrollHeight);
  }, [data]);

  const handleMemberRendered = useCallback(
    (id, domNode) => {
      nodeRefs.current[id] = domNode;
      requestAnimationFrame(drawLines);
    },
    [drawLines]
  );

  useEffect(() => {
    drawLines();
  }, [drawLines]);

  useEffect(() => {
    const observer = new ResizeObserver(drawLines);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', drawLines);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', drawLines);
    };
  }, [drawLines]);

return (
  <div className="font-sans text-gray-100 bg-gray-900 min-h-screen p-8">
    <div
      ref={containerRef}
      className="relative w-full max-w-full mx-auto overflow-auto"
      style={{ minHeight: '600px' }}
    >
      {/* The absolutely positioned SVG must come first so it's behind the content */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 pointer-events-none z-0"
        style={{ width: '100%', height: '100%' }}
      >
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#4A5568"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* The scaled hierarchy content */}
      <div className="relative flex flex-col items-center w-max mx-auto">
        {prince && (
          <HierarchyNode
            member={prince}
            allMembers={data}
            onMemberRendered={handleMemberRendered}
            scale={scale}
          />
        )}
      </div>
    </div>
  </div>
);

}

export default OrgChart;
