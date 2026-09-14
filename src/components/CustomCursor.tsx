import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverType, setHoverType] = useState<'clickable' | 'text' | 'special' | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer trailing ring
  const springConfig = { damping: 26, stiffness: 380, mass: 0.2 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad, not touchscreens)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    // Add class to body to suppress default system cursor
    document.documentElement.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        'button, a, input[type="button"], input[type="submit"], [role="button"], .cursor-pointer, .cursor-crosshair'
      );
      const textInput = target.closest('input[type="text"], input[type="email"], textarea');
      const special = target.closest('[data-cursor="special"]');

      if (special) {
        setIsHovered(true);
        setHoverType('special');
      } else if (clickable) {
        setIsHovered(true);
        setHoverType('clickable');
      } else if (textInput) {
        setIsHovered(true);
        setHoverType('text');
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Outer reactive tracking aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 border transition-colors duration-200 will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isHovered ? (hoverType === 'special' ? 56 : 46) : 26,
          height: isHovered ? (hoverType === 'special' ? 56 : 46) : 26,
          backgroundColor: isHovered
            ? hoverType === 'special'
              ? 'rgba(154, 205, 50, 0.28)'
              : 'rgba(154, 205, 50, 0.18)'
            : 'rgba(154, 205, 50, 0.04)',
          borderColor: isHovered ? '#9ACD32' : 'rgba(154, 205, 50, 0.55)',
          scale: isClicked ? 0.78 : 1
        }}
        transition={{
          width: { duration: 0.18, ease: 'easeOut' },
          height: { duration: 0.18, ease: 'easeOut' },
          backgroundColor: { duration: 0.18 },
          borderColor: { duration: 0.18 },
          scale: { duration: 0.1 }
        }}
      >
        {/* Subtle crosshair brackets when hovering special interactive zones */}
        {hoverType === 'special' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[8px] font-black text-black select-none tracking-tighter bg-[#9ACD32] px-1 py-0.5 border border-black">
              DRAG
            </span>
          </div>
        )}
      </motion.div>

      {/* Inner sharp precision acid-green dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isHovered ? (hoverType === 'text' ? 4 : 10) : 8,
          height: isHovered ? (hoverType === 'text' ? 20 : 10) : 8,
          borderRadius: hoverType === 'text' ? 2 : 9999,
          backgroundColor: isHovered
            ? hoverType === 'special'
              ? '#0A0B08'
              : '#A3E635'
            : '#9ACD32',
          scale: isClicked ? 0.7 : 1,
          boxShadow: isHovered
            ? '0 0 12px rgba(154, 205, 50, 0.95), 0 0 0 1px rgba(0, 0, 0, 0.7)'
            : '0 0 8px rgba(154, 205, 50, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.45)'
        }}
        transition={{
          duration: 0.12,
          ease: 'easeOut'
        }}
      />
    </div>
  );
};
