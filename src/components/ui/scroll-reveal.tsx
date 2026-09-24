"use client";

import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

function useInView(ref: React.RefObject<Element | null>, once = true) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIntersecting(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, once]);

  return isIntersecting;
}

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function AnimatedTitle({ 
  children, 
  className = "", 
  as: Component = "h2",
  delayOffset = 0,
  once = true
}: { 
  children: string | ReactNode; 
  className?: string; 
  as?: ElementType;
  delayOffset?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isActive = useInView(ref, once);

  if (typeof children === "string") {
    return (
      <Component ref={ref} className={`overflow-hidden ${className}`} aria-label={children}>
        {children.split("").map((ch, ci) => (
          <span
            key={ci}
            aria-hidden
            className={`inline-block transition-all duration-700 ${ease}`}
            style={{
              transitionDelay: isActive ? `${delayOffset + ci * 35}ms` : "0ms",
              transform: isActive ? "translateY(0)" : "translateY(35%)",
              opacity: isActive ? 1 : 0, 
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </Component>
    );
  }

  // Fallback for rich text (e.g., spans with italics)
  return (
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-all duration-1000 ${ease}`}
        style={{
          transitionDelay: isActive ? `${delayOffset}ms` : "0ms",
          transform: isActive ? "translateY(0)" : "translateY(35%)",
          opacity: isActive ? 1 : 0,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function AnimatedText({ 
  children, 
  className = "", 
  as: Component = "p",
  delayOffset = 200,
  once = true
}: { 
  children: string | ReactNode; 
  className?: string; 
  as?: ElementType;
  delayOffset?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isActive = useInView(ref, once);

  if (typeof children === "string") {
    return (
      <Component ref={ref} className={className}>
        {children.split(" ").map((w, wi) => (
          <span
            key={wi}
            className={`inline-block mr-[0.3em] transition-all duration-700 ${ease}`}
            style={{
              transitionDelay: isActive ? `${delayOffset + wi * 45}ms` : "0ms",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateY(0)" : "translateY(14px)",
              filter: isActive ? "blur(0px)" : "blur(6px)",
            }}
          >
            {w}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className}>
       <div
        className={`transition-all duration-1000 ${ease}`}
        style={{
          transitionDelay: isActive ? `${delayOffset}ms` : "0ms",
          transform: isActive ? "translateY(0)" : "translateY(14px)",
          opacity: isActive ? 1 : 0,
          filter: isActive ? "blur(0px)" : "blur(6px)",
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export function FadeIn({
  children,
  className = "",
  delayOffset = 0,
  once = true
}: {
  children: ReactNode;
  className?: string;
  delayOffset?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, once);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${ease} ${className}`}
      style={{
        transitionDelay: isActive ? `${delayOffset}ms` : "0ms",
        transform: isActive ? "translateY(0)" : "translateY(24px)",
        opacity: isActive ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
