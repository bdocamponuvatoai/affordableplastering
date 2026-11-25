"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_TILT_X = 6; // degrees, up/down
const MAX_TILT_Y = 9; // degrees, left/right

/**
 * 3D stage for the hero. The scene inside tilts towards a fine pointer
 * (mouse/trackpad) for a sense of depth. Writes CSS variables directly in an
 * animation frame (no React re-render). Inert on touch screens and when the
 * visitor prefers reduced motion; the static tilt comes from CSS.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const setTilt = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
        stage.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
      });
    };

    function handleMove(event: PointerEvent) {
      if (!finePointer.matches || reducedMotion.matches || !stage) return;
      const box = stage.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      setTilt(-y * 2 * MAX_TILT_X, x * 2 * MAX_TILT_Y);
    }
    const handleLeave = () => setTilt(0, 0);

    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className="hero__stage">
      {children}
    </div>
  );
}
