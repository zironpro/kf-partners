"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedTitle, AnimatedText, FadeIn } from "@/components/ui/scroll-reveal";

const W = 1590;
const H = 580;

// Image pool
const IMG = {
  oxford: "/images/study_route_uk.jpg",
  passport: "/images/airport_journey_uk.jpg",
  bus: "/images/visit_route_london.jpg",
  meeting: "/images/work_route_uk.jpg",
  family: "/images/family_route_uk.jpg",
  shard: "/images/london_hero_main.jpg",
  tower: "/images/visit_route_london.jpg",
  campus: "/images/study_route_uk.jpg",
  plane: "/images/airport_journey_uk.jpg",
  bigben: "/images/london_hero_main.jpg",
};

// [x, y, w, h] in reference px; each tile has several slides
const tiles = [
  { alt: "Study",    images: [IMG.oxford, IMG.campus, IMG.bus],       box: [40, 5, 260, 235] },
  { alt: "Passport", images: [IMG.passport, IMG.plane, IMG.shard],    box: [311, 100, 301, 190] },
  { alt: "London",   images: [IMG.bus, IMG.tower, IMG.oxford],        box: [55, 250, 245, 190] },
  { alt: "Work",     images: [IMG.meeting, IMG.shard, IMG.passport],  box: [311, 300, 301, 185] },
  { alt: "Family",   images: [IMG.family, IMG.bigben, IMG.campus],    box: [981, 110, 150, 168] },
  { alt: "Shard",    images: [IMG.shard, IMG.meeting, IMG.tower],     box: [1142, 63, 178, 182] },
  { alt: "Bridge",   images: [IMG.tower, IMG.bus, IMG.bigben],        box: [985, 280, 335, 215] },
  { alt: "Campus",   images: [IMG.campus, IMG.oxford, IMG.family],    box: [1331, 197, 157, 139] },
  { alt: "Travel",   images: [IMG.plane, IMG.passport, IMG.tower],    box: [1331, 347, 157, 183] },
];

const phoneImages = [IMG.bigben, IMG.tower, IMG.shard, IMG.oxford, IMG.family];
const phoneBox = [613, 15, 367, 640];

const pos = ([x, y, w, h]: number[]) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

/* ---------- Reusable carousel (swipe + auto-slide) ---------- */
function Carousel({
  images,
  alt,
  interval = 4000,
  startDelay = 0,
  dots = false,
  priority = false,
  sizes = "25vw",
}: {
  images: string[];
  alt: string;
  interval?: number;
  startDelay?: number;
  dots?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        const el = ref.current;
        if (!el || paused.current) return;
        const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % images.length;
        el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      }, interval);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [images.length, interval, startDelay]);

  const onScroll = () => {
    const el = ref.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) =>
    ref.current?.scrollTo({ left: i * ref.current.clientWidth, behavior: "smooth" });

  return (
    <div className="relative w-full h-full">
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => setTimeout(() => (paused.current = false), 2500)}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div key={i} className="relative shrink-0 w-full h-full snap-center">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {dots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Phone frame ---------- */
function Phone({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={`bg-[#1a1a1a] rounded-[44px] p-[8px] shadow-2xl border-[3px] border-[#333] ${className}`}
    >
      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[32%] h-6 bg-black rounded-full z-50 pointer-events-none" />
      <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-gray-200">
        <Carousel
          images={phoneImages}
          alt="London landmark"
          interval={3500}
          dots
          priority
          sizes="(min-width: 768px) 25vw, 280px"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-16 md:pt-24 font-sans">
      {/* Background Map */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-full md:w-[60%] h-[80%] opacity-30 pointer-events-none select-none">
        <Image src="/images/uk-map.png" alt="UK Map Background" fill className="object-contain object-right" priority />
      </div>

      <div className="relative z-10 px-4 md:px-8">
        {/* Text */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-6 flex flex-col items-center">
          <AnimatedTitle as="h1" className="heading-fluid-lg font-serif text-primary mb-6">
            <>Your New Chapter <br />
            <span className="text-accent">in the UK</span> Starts Here</>
          </AnimatedTitle>
          <AnimatedText delayOffset={100} className="text-fluid-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Expert immigration guidance for Study, Work, Visit and Family visas. Helping you move forward with clarity and confidence.
          </AnimatedText>
          <FadeIn delayOffset={200} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link href="#" className="px-8 py-3 bg-primary text-white rounded-full font-medium flex items-center hover:bg-opacity-90 transition shadow-md">
              Explore Your Route <span className="ml-2">→</span>
            </Link>
            <Link href="#" className="px-8 py-3 border-2 border-accent text-primary rounded-full font-medium flex items-center hover:bg-accent hover:text-white transition bg-transparent">
              📅 Book a Consultation
            </Link>
          </FadeIn>
        </div>

        {/* Mobile: swipeable phone carousel */}
        <div className="md:hidden relative mx-auto w-[270px] h-[460px] overflow-hidden">
          <Phone className="relative w-full h-[540px]" />
        </div>

        {/* Desktop collage: every tile slides */}
        <div
          className="relative hidden md:block mx-auto w-full max-w-[1590px]"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          {tiles.map((t, i) => (
            <div
              key={t.alt}
              style={pos(t.box)}
              className="absolute rounded-3xl overflow-hidden shadow-lg z-10"
            >
              <Carousel
                images={t.images}
                alt={t.alt}
                interval={3800 + (i % 3) * 500}
                startDelay={i * 450}
              />
            </div>
          ))}

          <Phone style={pos(phoneBox)} className="absolute z-40" />

          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}