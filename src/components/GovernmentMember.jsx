// src/components/GovernmentMember.jsx
import React, { forwardRef } from 'react';
import questionmarkImage from '../assets/questionmark.png';

const GovernmentMember = forwardRef(({ member, scale = 1 }, ref) => {
  // Base sizes
  const baseNodeWidth = 160;  // px
  const baseNodeHeight = 220; // px
  const baseImageSize = 128;  // px (w-32 = 128px)
  const baseBorderWidth = 2;  // px
  const basePadding = 8;      // px (p-2)
  const baseMarginTop = 8;    // px (mt-2)
  const baseFontSizeName = 18; // px (text-lg)
  const baseFontSizeTitle = 12; // px (text-sm)
  const baseFontSizeClan = 10;  // px (text-xs)
  const baseBorderRadius = 8;   // px (rounded-lg)
  const baseBorderImage = 2;    // px (border-2)

  return (
    <div
      ref={ref}
      style={{
        width: baseNodeWidth * scale,
        height: baseNodeHeight * scale,
        padding: basePadding * scale,
        borderRadius: baseBorderRadius * scale,
        borderWidth: 1 * scale,
      }}
      className="
        relative
        flex flex-col items-center
        border border-gray-700
        bg-gray-800 text-gray-100
        shadow-lg
        text-center
        overflow-hidden
      "
    >
      <div
        className="flex flex-col items-center h-full w-full"
        style={{ gap: 4 * scale }}
      >
        {/* Image Section */}
        <div
          style={{
            width: baseImageSize * scale,
            height: baseImageSize * scale,
            borderWidth: baseBorderImage * scale,
            marginTop: baseMarginTop * scale,
            borderRadius: '50%',
          }}
          className="rounded-full overflow-hidden border-gray-600 bg-gray-700 flex-shrink-0"
        >
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = questionmarkImage;
            }}
          />
        </div>
        {/* Info Section */}
        <div
          style={{ paddingBottom: 4 * scale }}
          className="flex-grow flex flex-col justify-end w-full"
        >
          <h3
            style={{ fontSize: baseFontSizeName * scale, lineHeight: 1.1 }}
            className="font-bold mb-0"
          >
            {member.name}
          </h3>
          <p
            style={{ fontSize: baseFontSizeTitle * scale, fontStyle: 'italic', color: 'rgba(156,163,175,1)' }}
            className="leading-tight"
          >
            {member.title}
          </p>
          <p
            style={{ fontSize: baseFontSizeClan * scale, color: 'rgba(209,213,219,1)' }}
            className="leading-tight"
          >
            Clan: {member.clan}
          </p>
        </div>
      </div>
    </div>
  );
});

export default GovernmentMember;
