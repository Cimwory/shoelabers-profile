import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // seconds
  delay?: number; // seconds
  className?: string;
  prefix?: string;
  suffix?: string;
  formatValue?: (n: number) => string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.2,
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
  formatValue,
}) => {
  const [current, setCurrent] = useState<number>(from);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      startTimeRef.current = null;

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);

        // Ease Out Cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const nextVal = Math.round(from + (to - from) * easeOut);

        setCurrent(nextVal);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCurrent(to);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startAnimation, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [to, from, duration, delay]);

  const display = formatValue ? formatValue(current) : current.toLocaleString('id-ID');

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export default CountUp;
