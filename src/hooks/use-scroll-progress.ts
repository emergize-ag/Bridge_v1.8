import { useEffect, useRef, useState } from "react";

/**
 * Returns a 0..1 progress value for how far the target element has traveled
 * through the viewport. 0 when the element's top is at the bottom of the
 * viewport, 1 when the element's bottom passes the top of the viewport.
 *
 * Cheap: single rAF-throttled scroll+resize listener per instance, and
 * IntersectionObserver gates work to when the element is on-screen.
 */
export function useScrollProgress<T extends HTMLElement>(
  options: { start?: number; end?: number } = {},
) {
  const { start = 0, end = 1 } = options;
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    let visible = false;
    let ticking = false;

    const compute = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when rect.top === vh, 1 when rect.bottom === 0
      const raw = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      // Remap between start..end
      const remapped = Math.max(
        0,
        Math.min(1, (clamped - start) / Math.max(0.0001, end - start)),
      );
      setProgress(remapped);
    };

    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) compute();
      },
      { threshold: 0 },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [start, end]);

  return { ref, progress };
}
