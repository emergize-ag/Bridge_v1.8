import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={className} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

export function Parallax({ children, distance = 60, className }: { children: ReactNode; distance?: number; className?: string }) {
  return (
    <div className={className} data-distance={distance}>
      {children}
    </div>
  );
}
