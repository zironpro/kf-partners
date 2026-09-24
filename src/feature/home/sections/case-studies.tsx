"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedTitle, AnimatedText, FadeIn } from "@/components/ui/scroll-reveal";

const cases = [
  {
    num: "01",
    title: "From Classroom to Campus",
    subtitle: "STUDENT JOURNEY",
    desc: "A student's journey toward studying in the UK.",
    route: "Study",
    stage: "Student Visa",
    journey: "Consultation → Preparation → Application → Decision",
    img: "/images/study_route_uk.jpg",
  },
  {
    num: "02",
    title: "A Career Across Borders",
    subtitle: "WORK JOURNEY",
    desc: "A professional's journey toward a new career opportunity in the UK.",
    route: "Work",
    stage: "Work Visa",
    journey: "Consultation → Qualification Check → Sponsorship → Relocation",
    img: "/images/work_route_uk.jpg",
  },
  {
    num: "03",
    title: "Together Again",
    subtitle: "FAMILY JOURNEY",
    desc: "Helping families navigate the process of building their next chapter together.",
    route: "Family",
    stage: "Spouse & Dependant Visas",
    journey: "Consultation → Evidence Gathering → Application → Reunion",
    img: "/images/family_route_uk.jpg",
  }
];

export default function CaseStudies() {
  return (
    <section className="w-full bg-white section-master overflow-hidden font-sans border-t border-black/5">
      <div className="container-master mb-20 md:mb-32">
        <AnimatedTitle className="heading-fluid-lg font-serif text-primary max-w-4xl">
          <>Journeys We've <span className="italic text-secondary font-medium">Helped Shape</span></>
        </AnimatedTitle>
      </div>

      <div className="container-master flex flex-col gap-16 md:gap-24">
        {cases.map((c, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={c.num} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
              
              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <FadeIn delayOffset={0}>
                  <p className="text-sm tracking-[0.2em] text-secondary uppercase font-bold mb-4">{c.subtitle}</p>
                </FadeIn>
                <AnimatedTitle as="h3" delayOffset={100} className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-tight">
                  {c.title}
                </AnimatedTitle>
                
                <AnimatedText delayOffset={200} className="text-fluid-base text-gray-600 mb-12 max-w-lg leading-relaxed">
                  {c.desc}
                </AnimatedText>

                <FadeIn delayOffset={300} className="space-y-6 border-l-2 border-accent/30 pl-6 mb-12">
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Route</p>
                    <p className="font-semibold text-primary">{c.route}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Stage</p>
                    <p className="font-semibold text-primary">{c.stage}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Journey</p>
                    <p className="font-medium text-secondary">{c.journey}</p>
                  </div>
                </FadeIn>

                <FadeIn delayOffset={400}>
                  <Link href="#" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors group">
                    <span className="border-b-2 border-transparent group-hover:border-accent transition-colors pb-1">
                      Read Case Study
                    </span>
                    <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </FadeIn>
              </div>

              {/* Image Side */}
              <FadeIn delayOffset={200} className="w-full lg:w-1/2 relative px-4 sm:px-8 lg:px-0">
                <div className="aspect-video md:aspect-[3/2] w-full rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <Image 
                    src={c.img} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary/10 transition-colors duration-700 group-hover:bg-transparent" />
                </div>
                
                {/* Decorative Border Element */}
                <div className={`absolute -z-10 w-full h-full border border-accent/40 rounded-[2rem] top-6 md:top-10 ${isEven ? 'left-8 md:left-12' : '-left-8 md:-left-12'} hidden sm:block`} />
              </FadeIn>

            </div>
          )
        })}
      </div>
    </section>
  );
}
