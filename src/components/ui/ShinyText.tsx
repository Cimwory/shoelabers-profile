import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  shineColor?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  shineColor = 'rgba(255, 255, 255, 0.9)',
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, currentColor 0%, currentColor 40%, ${shineColor} 50%, currentColor 60%, currentColor 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `shiny-text ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shiny-text {
          0% { background-position: 150% 0; }
          100% { background-position: -150% 0; }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;
