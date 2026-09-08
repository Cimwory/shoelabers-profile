import React from 'react';

interface AuroraBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className = '',
  showGrid = true,
}) => {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* 1. Ambient Aurora Color Blobs (Optimized blur for mobile GPU to prevent frame drops) */}
      <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-2xl sm:blur-[120px] sm:animate-pulse transition-all duration-1000 transform-gpu" />
      <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-600/12 blur-2xl sm:blur-[140px] transition-all duration-1000 transform-gpu" />
      <div className="hidden sm:block absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/8 dark:bg-emerald-600/10 blur-[130px] transition-all duration-1000 transform-gpu" />

      {/* 2. Micro Dot-Grid Pattern Texture (Inspired by React Bits DotGrid) */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}
    </div>
  );
};

export default AuroraBackground;
