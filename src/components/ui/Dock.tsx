import React, { useRef, useState, useCallback } from 'react';

export type DockItemData = {
  id?: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  badge?: React.ReactNode;
  active?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
};

export const Dock: React.FC<DockProps> = ({
  items,
  className = '',
  distance = 130,
  baseItemSize = 46,
  magnification = 64,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    setMouseX(e.clientX);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHoveredIdx(null);
  }, []);

  const effectiveBaseSize = isMobile ? 38 : baseItemSize;
  const effectiveMagnification = isMobile ? 42 : magnification;
  const dockHeight = isMobile ? 54 : magnification + 16;

  return (
    <nav
      aria-label="Quick Actions Dock"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-end gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-2xl max-w-[calc(100vw-1rem)] overflow-x-auto no-scrollbar transition-all duration-300 ${className}`}
      style={{ height: `${dockHeight}px` }}
    >
      {items.map((item, idx) => {
        let size = effectiveBaseSize;
        if (!isMobile && mouseX !== null && containerRef.current) {
          const itemEl = containerRef.current.children[idx] as HTMLElement;
          if (itemEl) {
            const rect = itemEl.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const dist = Math.abs(mouseX - itemCenterX);
            if (dist < distance) {
              const factor = Math.cos((dist / distance) * (Math.PI / 2));
              size = effectiveBaseSize + (effectiveMagnification - effectiveBaseSize) * factor;
            }
          }
        }

        const isHovered = hoveredIdx === idx && !isMobile;

        return (
          <div
            key={item.id || idx}
            onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
            className="relative flex flex-col items-center justify-end h-full shrink-0"
          >
            {/* Tooltip Label Pill (Desktop only to prevent stuck tooltips on mobile) */}
            {isHovered && (
              <div className="absolute -top-9 px-2.5 py-1 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-bold shadow-lg whitespace-nowrap pointer-events-none animate-fade-in z-50">
                {item.label}
              </div>
            )}

            {/* Icon Button */}
            <button
              type="button"
              onClick={item.onClick}
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
              className={`relative flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-150 cursor-pointer shadow-xs active:scale-95 ${
                item.active
                  ? 'bg-blue-600 text-white shadow-blue-500/30'
                  : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
              } ${item.className || ''}`}
            >
              {/* Scaled Icon */}
              <div
                style={{ transform: `scale(${isMobile ? 1 : Math.max(size / effectiveBaseSize, 1)})` }}
                className="transition-transform duration-100 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5"
              >
                {item.icon}
              </div>

              {/* Badge Counter */}
              {item.badge !== undefined && item.badge !== null && (
                <div className="absolute -top-1 -right-1 z-10">
                  {item.badge}
                </div>
              )}
            </button>

            {/* Active Indicator Dot */}
            <div className="h-1.5 flex items-center justify-center mt-1">
              {item.active ? (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              ) : null}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Dock;
