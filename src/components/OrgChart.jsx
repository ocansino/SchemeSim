// src/components/OrgChart.jsx
import React, { useState, useRef, useEffect } from 'react';
import GovernmentMember from './GovernmentMember';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 220;
const VERTICAL_SPACING = 60;
const HORIZONTAL_SPACING = 40;

const HierarchyNode = React.forwardRef(({ member, allMembers, onMemberRendered }, ref) => {
  const nodeRef = useRef(null);
  const subordinates = allMembers.filter(sub => sub.boss === member.id);

  React.useImperativeHandle(ref, () => nodeRef.current);

  useEffect(() => {
    if (nodeRef.current) {
      onMemberRendered(member.id, nodeRef.current);
    }
  }, [member.id, onMemberRendered]);

  return (
    <div className="flex flex-col items-center" data-id={member.id}>
      <GovernmentMember member={member} ref={nodeRef} />
      {subordinates.length > 0 && (
        <div
          className="flex justify-center"
          style={{ marginTop: `${VERTICAL_SPACING}px`, gap: `${HORIZONTAL_SPACING}px` }}
        >
          {subordinates.map(subordinate => (
            <HierarchyNode
              key={subordinate.id}
              member={subordinate}
              allMembers={allMembers}
              onMemberRendered={onMemberRendered}
            />
          ))}
        </div>
      )}
    </div>
  );
});

function OrgChart({ data }) {
  const prince = data.find(member => member.title.includes('Prince'));
  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  function getTierCounts(data) {
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
  }

  const tierMap = getTierCounts(data);
  const maxTierSize = Math.max(...Object.values(tierMap).map(arr => arr.length));
  const scale = maxTierSize > 7 ? 7 / maxTierSize : 1;

  const handleMemberRendered = React.useCallback((id, domNode) => {
    nodeRefs.current[id] = domNode;
    requestAnimationFrame(drawLines);
  }, []);

  const drawLines = () => {
    const container = chartRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const lines = [];

    data.forEach(member => {
      if (!member.boss) return;

      const bossEl = nodeRefs.current[member.boss];
      const subEl = nodeRefs.current[member.id];

      if (!bossEl || !subEl) return;

      const bossBox = bossEl;
      const subBox = subEl;

      const containerRect = container.getBoundingClientRect();

      const x1 = bossBox.offsetLeft + bossBox.offsetWidth / 2;
      const y1 = bossBox.offsetTop + bossBox.offsetHeight;

      const x2 = subBox.offsetLeft + subBox.offsetWidth / 2;
      const y2 = subBox.offsetTop;

      // Create 3-segment path: vertical from boss to halfway, horizontal, vertical to sub
      const midY = y1 + (y2 - y1) / 2;

      lines.push(
        { x1, y1, x2: x1, y2: midY },
        { x1, y1: midY, x2, y2: midY },
        { x1: x2, y1: midY, x2, y2 }
      );
    });

    setLines(lines);

    // Resize the SVG to cover the full container
    svg.setAttribute('width', container.scrollWidth);
    svg.setAttribute('height', container.scrollHeight);
  };

  useEffect(() => {
    const observer = new ResizeObserver(drawLines);
    if (chartRef.current) observer.observe(chartRef.current);
    window.addEventListener('resize', drawLines);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', drawLines);
    };
  }, [data]);

  return (
    <div className="font-sans text-gray-100 bg-gray-900 min-h-screen p-8 relative">
      <h1 className="text-4xl font-extrabold text-center text-gray-300 mb-10 tracking-wide">
        Kindred of Chicago
      </h1>

      <div
        className="relative overflow-auto"
        style={{ minHeight: '500px', maxHeight: 'calc(100vh - 150px)' }}
      >
        <div
          className="relative w-full"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
          ref={chartRef}
        >
          <div className="flex flex-col items-center w-max mx-auto">
            {prince && (
              <HierarchyNode
                member={prince}
                allMembers={data}
                onMemberRendered={handleMemberRendered}
              />
            )}
          </div>

          <svg
            ref={svgRef}
            className="absolute top-0 left-0 pointer-events-none z-0"
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
        </div>
      </div>
    </div>
  );
}

export default OrgChart;
