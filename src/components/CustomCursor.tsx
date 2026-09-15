import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Ripple {
  id: string;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect hover on links, buttons, and project cards (using .group class)
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.group') ||
        target.closest('input')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.group') ||
        target.closest('input')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseClick = (e: MouseEvent) => {
      const newRipple = { 
        id: Date.now().toString() + Math.random().toString(), 
        x: e.clientX, 
        y: e.clientY 
      };
      setRipples((prev) => [...prev, newRipple]);

      // Cleanup after 600ms (duration of the animation)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleMouseClick);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full border border-neutral-900/40 dark:border-neutral-100/40 backdrop-blur-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? "rgba(128, 128, 128, 0.15)" : "rgba(128, 128, 128, 0)",
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
          backgroundColor: { duration: 0.2, ease: "easeOut" },
          opacity: { duration: 0.2 }
        }}
      />
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block rounded-full bg-neutral-900/10 dark:bg-neutral-100/10 border border-neutral-900/40 dark:border-neutral-100/40"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 32,
            height: 32,
            marginLeft: -16,
            marginTop: -16,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
