"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatedTitle } from "@/components/ui/scroll-reveal";

const journeys = [
  { id: "study", title: "STUDY", desc: "Build your future through education.", img: "/images/study_route_uk.jpg" },
  { id: "work", title: "WORK", desc: "Take your career further.", img: "/images/work_route_uk.jpg" },
  { id: "visit", title: "VISIT", desc: "Experience the UK.", img: "/images/journey_visit.jpg" },
  { id: "family", title: "FAMILY", desc: "Bring the people who matter closer.", img: "/images/journey_family.jpg" },
  { id: "business", title: "BUSINESS", desc: "Start or expand your enterprise.", img: "/images/journey_business.jpg" },
];

// Position of each card relative to the active one (offset is a % of the card's own width)
const positions: Record<number, { x: number; scale: number; z: number; opacity: number }> = {
  0: { x: 0, scale: 1, z: 30, opacity: 1 },
  1: { x: 95, scale: 0.85, z: 20, opacity: 0.85 },
  2: { x: 175, scale: 0.7, z: 10, opacity: 0.6 },
  3: { x: -175, scale: 0.7, z: 10, opacity: 0.6 },
  4: { x: -95, scale: 0.85, z: 20, opacity: 0.85 },
};

export default function Journey() {
  const [active, setActive] = useState(0);
  const total = journeys.length;

  const next = () => setActive((p) => (p + 1) % total);
  const prev = () => setActive((p) => (p - 1 + total) % total);

  return (
    <section className="w-full bg-background section-master overflow-hidden font-sans">
      {/* Header */}
      <div className="container-master text-center mb-10 md:mb-16">
        <AnimatedTitle className="heading-fluid-lg font-serif text-primary">
          <>Discover <span className="italic text-secondary font-medium">Your Path</span>
          <br />
          to the UK</>
        </AnimatedTitle>
      </div>

      {/*
        Everything scales from one variable, --card-w:
        phones  : 62vw
        tablets : 24vw (230–300px)
        desktops: 21vw (280–520px), so big screens get bigger cards
        Card height, stage height, text and buttons all follow it.
      */}
      <div
        className="relative mx-auto flex w-full items-center justify-center
                   [--card-w:62vw] sm:[--card-w:clamp(230px,24vw,300px)] lg:[--card-w:clamp(280px,21vw,520px)]"
        style={{ height: "calc(var(--card-w) * 1.6)" }}
      >
        {journeys.map((journey, index) => {
          const diff = (index - active + total) % total;
          const pos = positions[diff];
          const isActive = diff === 0;

          return (
            <div
              key={journey.id}
              onClick={() => setActive(index)}
              className="absolute aspect-[2/3] cursor-pointer overflow-hidden rounded-lg transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] [container-type:inline-size]"
              style={{
                width: "var(--card-w)",
                transform: `translateX(${pos.x}%) scale(${pos.scale})`,
                zIndex: pos.z,
                opacity: pos.opacity,
                boxShadow: isActive
                  ? "0 25px 50px -12px rgba(0,0,0,0.25)"
                  : "0 10px 30px -10px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src={journey.img}
                alt={journey.title}
                fill
                sizes="(min-width: 1024px) 21vw, (min-width: 640px) 24vw, 62vw"
                className="object-cover"
              />

              <div className="pointer-events-none absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Text scales with the card (cqw = 1% of card width) */}
              <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-[8cqw] text-white">
                <h3 className="mb-[2cqw] text-[max(1.25rem,9cqw)] font-bold leading-none tracking-wide">
                  {journey.title}
                </h3>
                <p className="mb-[5cqw] line-clamp-2 text-[max(0.875rem,5.2cqw)] leading-snug text-white/80">
                  {journey.desc}
                </p>
                <button
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    if (!isActive) {
                      e.stopPropagation();
                      setActive(index);
                    }
                  }}
                  className={`w-full rounded-lg py-[4cqw] text-[max(0.875rem,5cqw)] font-bold shadow-md transition-all duration-300 ${
                    isActive
                      ? "bg-white text-primary hover:bg-accent hover:text-white"
                      : "border border-white/30 bg-white/20 text-white backdrop-blur-sm"
                  }`}
                >
                  Explore
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8 md:mt-8">
        <button
          onClick={prev}
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-white md:h-14 md:w-14 2xl:h-16 2xl:w-16"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-base font-medium tracking-wide text-primary md:text-lg 2xl:text-xl">
          View more routes
        </span>
        <button
          onClick={next}
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-primary hover:text-white md:h-14 md:w-14 2xl:h-16 2xl:w-16"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}