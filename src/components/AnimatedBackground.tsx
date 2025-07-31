import React from 'react';

const AnimatedBackground = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
    aria-hidden="true"
  >
    {/* Animated SVG Blobs */}
    <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#38b6ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#232946" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="bg2" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#b388ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#232946" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <g>
        <ellipse cx="400" cy="300" rx="340" ry="180">
          <animate attributeName="cx" values="400;1100;400" dur="18s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;700;300" dur="16s" repeatCount="indefinite" />
          <animate attributeName="rx" values="340;200;340" dur="14s" repeatCount="indefinite" />
          <animate attributeName="ry" values="180;300;180" dur="20s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="12s" repeatCount="indefinite" />
          <animate attributeName="fill" values="url(#bg1);url(#bg2);url(#bg1)" dur="22s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1100" cy="700" rx="300" ry="160">
          <animate attributeName="cx" values="1100;400;1100" dur="20s" repeatCount="indefinite" />
          <animate attributeName="cy" values="700;200;700" dur="18s" repeatCount="indefinite" />
          <animate attributeName="rx" values="300;180;300" dur="16s" repeatCount="indefinite" />
          <animate attributeName="ry" values="160;260;160" dur="24s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.2;0.4" dur="14s" repeatCount="indefinite" />
          <animate attributeName="fill" values="url(#bg2);url(#bg1);url(#bg2)" dur="26s" repeatCount="indefinite" />
        </ellipse>
      </g>
    </svg>
    {/* Dark overlay for readability */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(20, 24, 38, 0.65)',
        zIndex: 1,
      }}
    />
  </div>
);

export default AnimatedBackground; 