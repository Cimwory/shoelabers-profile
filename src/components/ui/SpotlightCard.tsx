import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  innerClassName?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  spotlightColor = 'rgba(59, 130, 246, 0.12)', // Blue glow default
  onClick,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 ${className}`}
    >
      {/* Dynamic Radial Spotlight Glow Layer (clipped to card border-radius) */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl overflow-hidden z-0">
        <div
          className="w-full h-full transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      </div>
      <div className={`relative z-10 w-full h-full ${innerClassName}`}>{children}</div>
    </div>
  );
};

export default SpotlightCard;
