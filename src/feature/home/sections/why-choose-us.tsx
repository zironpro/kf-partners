"use client";

import Image from "next/image";
import Link from "next/link";

/*
  Type scale used in this section
  - Section title : clamp(2rem, 4vw, 3.25rem)
  - Card headline : clamp(1.35rem, 2vw, 1.75rem)  (large card: up to 2.25rem)
  - Body          : 1rem – 1.125rem
  - Small label   : 0.875rem
*/

import { AnimatedTitle, AnimatedText } from "@/components/ui/scroll-reveal";

const proofPoints = ["SRA-regulated advisers", "Fixed, transparent fees", "Human support at every step"];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#F8F7F3] section-master overflow-hidden font-sans border-t border-black/5">
      {/* Heading */}
      <div className="container-master mb-14 md:mb-20 text-center">
        <AnimatedTitle className="font-serif text-primary leading-[1.1] tracking-tight text-[clamp(2rem,4vw,3.25rem)] mb-5">
          <>Why people choose <span className="italic text-secondary">KF Partners</span></>
        </AnimatedTitle>
        <AnimatedText delayOffset={100} className="text-base md:text-lg leading-relaxed text-gray-600 max-w-xl mx-auto">
          Clear advice, careful preparation and a team that stays with you until your UK plans are secure.
        </AnimatedText>
      </div>

      <div className="container-master max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[minmax(300px,auto)]">
          {/* Tall card */}
          <article className="md:row-span-2 bg-white rounded-[28px] overflow-hidden flex flex-col border border-black/5 shadow-sm group">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[46%]">
              <Image
                src="/images/kf_bento_passport.jpg"
                alt="UK passport and visa"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 lg:p-9 flex-1 flex flex-col">
              <h3 className="font-serif text-primary leading-[1.2] text-[clamp(1.5rem,2.2vw,2rem)]">
                Legal expertise that turns a complex process into a clear plan.
              </h3>

              <ul className="mt-6 space-y-3">
                {proofPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-gray-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* <Link
                href="#"
                className="mt-8 md:mt-auto flex w-full items-center justify-center bg-[#1A1A1A] text-white px-6 py-4 rounded-lg text-sm font-medium hover:bg-accent hover:text-primary transition-colors group/btn"
              >
                Explore Services
                <span className="ml-3 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs group-hover/btn:bg-primary group-hover/btn:text-white transition-colors" aria-hidden>
                  →
                </span>
              </Link> */}
            </div>
          </article>

          {/* Trust card */}
          <article className="bg-white rounded-[28px] overflow-hidden border border-black/5 shadow-sm flex flex-col group">
            <div className="relative w-full h-44 shrink-0">
              <Image
                src="/images/kf_bento_handshake.jpg"
                alt="Trust and partnership"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 flex-1 flex items-center">
              <h3 className="font-serif text-primary leading-[1.25] text-[clamp(1.25rem,1.7vw,1.5rem)]">
                Trusted by <span className="text-accent font-semibold">professionals and families</span> in over 40 countries.
              </h3>
            </div>
          </article>

          {/* Stat card */}
          <article className="bg-primary text-white rounded-[28px] p-7 lg:p-9 relative overflow-hidden flex flex-col justify-between">
            <svg
              className="absolute -top-16 -right-16 h-64 w-64 text-white/10"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.6" />
              <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.6" />
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="#C9A24A"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset="6"
                transform="rotate(-90 50 50)"
              />
            </svg>

            <p className="relative text-sm text-white/70 max-w-[14rem] leading-relaxed">
              Application success rate
            </p>
            <div className="relative">
              <p className="font-serif text-accent leading-none tracking-tight text-[clamp(4.5rem,8vw,6.5rem)]">
                98<span className="text-[0.5em] align-top ml-1">%</span>
              </p>
              <p className="mt-4 text-base text-white/80 leading-relaxed max-w-[16rem]">
                across all major UK visa categories.
              </p>
            </div>
          </article>

          {/* Wide card */}
          <article className="md:col-span-2 bg-white rounded-[28px] overflow-hidden border border-black/5 shadow-sm flex flex-col md:flex-row group">
            <div className="p-7 lg:p-10 flex-1 flex flex-col justify-center order-2 md:order-1">
              <h3 className="font-serif text-primary leading-[1.15] text-[clamp(1.6rem,2.6vw,2.25rem)]">
                A relocation that feels seamless, from first call to arrival.
              </h3>
              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-md">
                We handle the paperwork, deadlines and follow-ups so you can focus on the move itself.
              </p>
            </div>
            <div className="relative w-full md:w-[45%] h-56 md:h-auto order-1 md:order-2">
              <Image
                src="/images/london_hero_main.jpg"
                alt="London skyline"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover object-bottom md:object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}