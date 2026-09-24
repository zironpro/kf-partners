"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Discover",
    tag: "Usually 1–2 days",
    desc: "Understand your circumstances and possible routes.",
    points: [
      "Check which visa routes you may qualify for",
      "Review eligibility requirements and costs",
      "Get a clear picture of your timeline",
    ],
  },
  {
    num: "02",
    title: "Prepare",
    tag: "Usually 1–3 weeks",
    desc: "Build your application and supporting documentation.",
    points: [
      "Gather identity, financial and personal documents",
      "Get translations and certifications where needed",
      "Have every document reviewed before you submit",
    ],
  },
  {
    num: "03",
    title: "Apply",
    tag: "Usually 1 day",
    desc: "Submit your application through the appropriate process.",
    points: [
      "Complete the online application accurately",
      "Pay fees and book your biometrics appointment",
      "Track your application status",
    ],
  },
  {
    num: "04",
    title: "Move Forward",
    tag: "Ongoing",
    desc: "Continue toward your UK journey.",
    points: [
      "Prepare for travel and arrival",
      "Understand your conditions and obligations",
      "Plan your next steps once you arrive",
    ],
  },
];

const N = steps.length;
const PEAK = 70; // arc height in px
const SCROLL_PER_STEP = 70; // vh of scroll per hop. Lower = shorter section

export default function JourneyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const targetRef = useRef(0);

  const [dims, setDims] = useState({ vw: 1200, vh: 800 });
  const [progress, setProgress] = useState(0);
  const [totalLen, setTotalLen] = useState(1);

  // Section height scales with the number of steps
  const sectionHeightVh = 100 + (N - 1) * SCROLL_PER_STEP;

  // ---- Layout (all in px, one shared coordinate system) ----
  const gap = Math.max(340, dims.vw * 0.4);
  const baseY = Math.max(250, dims.vh * 0.36);
  const startX = dims.vw / 2;
  const trackW = dims.vw + (N - 1) * gap;
  const nodeX = (i: number) => startX + i * gap;

  const pathD = useMemo(() => {
    let d = `M ${nodeX(0)},${baseY}`;
    for (let i = 0; i < N - 1; i++) {
      const cx = nodeX(i) + gap / 2;
      d += ` Q ${cx},${baseY - PEAK * 2} ${nodeX(i + 1)},${baseY}`;
    }
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap, baseY, startX]);

  // ---- Resize ----
  useEffect(() => {
    const onResize = () =>
      setDims({ vw: window.innerWidth, vh: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- Measure path ----
  useEffect(() => {
    if (pathRef.current) setTotalLen(pathRef.current.getTotalLength());
  }, [pathD]);

  // ---- Scroll -> target, smoothed in rAF ----
  useEffect(() => {
    let raf = 0;
    let current = 0;

    const readScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const distance = height - window.innerHeight;
      targetRef.current = Math.min(1, Math.max(0, -top / distance));
    };

    const tick = () => {
      readScroll();
      const diff = targetRef.current - current;
      if (Math.abs(diff) > 0.0002) {
        current += diff * 0.12;
        setProgress(current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- Airplane: ease per hop so it lingers at each node ----
  const hop = progress * (N - 1);
  const hopIndex = Math.min(Math.floor(hop), N - 2);
  const f = Math.min(1, Math.max(0, hop - hopIndex));
  const eased = f * f * (3 - 2 * f); // smoothstep
  const pathFrac = (hopIndex + eased) / (N - 1);
  const len = pathFrac * totalLen;

  const plane = useMemo(() => {
    const p = pathRef.current;
    if (!p) return { x: startX, y: baseY, angle: 0 };
    const pt = p.getPointAtLength(len);
    const a = p.getPointAtLength(Math.max(0, len - 2));
    const b = p.getPointAtLength(Math.min(totalLen, len + 2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    return { x: pt.x, y: pt.y, angle };
  }, [len, totalLen, startX, baseY, pathD]);

  // Keep the airplane horizontally centred on screen
  const translateX = -(plane.x - startX);

  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background font-sans border-t border-black/5"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background">
        {/* Header */}
        <div className="absolute top-20 left-4 md:left-16 lg:left-24 z-20">
          <h2 className="heading-fluid-lg font-serif text-primary">
            The <span className="italic text-secondary font-medium">Journey Map</span>
          </h2>
        </div>

        {/* Step counter */}
        <div className="absolute top-24 right-4 md:right-16 lg:right-24 z-20 text-sm font-bold tracking-[0.2em] text-primary/40">
          <span className="text-accent">
            {String(Math.min(N, Math.round(hop) + 1)).padStart(2, "0")}
          </span>{" "}
          / {String(N).padStart(2, "0")}
        </div>

        {/* Moving track */}
        <div
          className="absolute top-0 left-0 h-full will-change-transform"
          style={{ width: trackW, transform: `translate3d(${translateX}px,0,0)` }}
        >
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={trackW}
            height={dims.vh}
          >
            {/* Dotted base */}
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeDasharray="5 9"
              strokeLinecap="round"
              className="text-primary/30"
            />
            {/* Travelled trail */}
            {len > 0.5 && (
              <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={`${len} ${totalLen}`}
                className="text-accent"
              />
            )}
            {/* Airplane */}
            <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle + 90})`}>
              <g style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" }}>
                <path
                  transform="scale(1.7) translate(-12 -12)"
                  fill="currentColor"
                  className="text-accent"
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                />
              </g>
            </g>
          </svg>

          {/* Steps */}
          {steps.map((step, i) => {
            const x = nodeX(i);
            const isActive = Math.abs(plane.x - x) < gap * 0.3;
            const isPassed = plane.x > x + gap * 0.3;

            return (
              <div key={step.num}>
                {/* Node */}
                <div
                  className={`absolute z-10 w-6 h-6 rounded-full border-4 border-background transition-all duration-500 ${
                    isActive
                      ? "bg-accent scale-125 shadow-[0_0_25px_rgba(201,162,74,0.6)]"
                      : isPassed
                      ? "bg-accent/60"
                      : "bg-primary/20"
                  }`}
                  style={{ left: x - 12, top: baseY - 12 }}
                />

                {/* Text block */}
                <div
                  className="absolute flex flex-col items-center text-center"
                  style={{ left: x - 170, top: baseY + 32, width: 340 }}
                >
                  {/* Number + duration chip */}
                  <div
                    className={`flex items-center gap-3 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <span className="text-sm font-bold tracking-[0.2em] text-accent">
                      {step.num}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-accent/40 text-primary/70 transition-all duration-700 ${ease} ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  {/* Growing rule */}
                  <div
                    className={`h-px bg-accent mt-3 mb-3 transition-all duration-700 ${ease} ${
                      isActive ? "w-12 opacity-100" : "w-0 opacity-0"
                    }`}
                  />

                  {/* Title: letters rise in a stagger */}
                  <h3
                    className={`text-3xl font-serif whitespace-nowrap transition-colors duration-500 ${
                      isActive ? "text-primary" : "text-primary/25"
                    }`}
                    aria-label={step.title}
                  >
                    {step.title.split("").map((ch, ci) => (
                      <span
                        key={ci}
                        aria-hidden
                        className={`inline-block transition-all duration-700 ${ease}`}
                        style={{
                          transitionDelay: isActive ? `${ci * 35}ms` : "0ms",
                          transform: isActive ? "translateY(0)" : "translateY(35%)",
                        }}
                      >
                        {ch === " " ? "\u00A0" : ch}
                      </span>
                    ))}
                  </h3>

                  {/* Description: word-by-word blur-in */}
                  <p className="mt-3 px-2 text-gray-600 text-lg leading-relaxed">
                    {step.desc.split(" ").map((w, wi) => (
                      <span
                        key={wi}
                        className={`inline-block mr-[0.3em] transition-all duration-700 ${ease}`}
                        style={{
                          transitionDelay: isActive ? `${250 + wi * 45}ms` : "0ms",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(14px)",
                          filter: isActive ? "blur(0px)" : "blur(6px)",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </p>

                  {/* Checklist points: slide in one by one */}
                  <ul className="mt-5 space-y-2.5 text-left">
                    {step.points.map((pt, pi) => (
                      <li
                        key={pi}
                        className={`flex items-start gap-3 text-[15px] text-gray-600 transition-all duration-700 ${ease}`}
                        style={{
                          transitionDelay: isActive ? `${700 + pi * 140}ms` : "0ms",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(-16px)",
                        }}
                      >
                        <svg
                          className="mt-[3px] shrink-0 text-accent"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" className="opacity-30" />
                          <path d="M8 12.5l2.5 2.5L16 9.5" />
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse transition-opacity duration-500 ${
            progress > 0.02 ? "opacity-0" : "opacity-50"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}