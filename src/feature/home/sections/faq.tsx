"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "What types of UK visas do you assist with?",
    answer: "We provide expert guidance for Study, Work, Family, and Business visas, ensuring your application meets all Home Office requirements and stands the highest chance of success."
  },
  {
    question: "How long does the visa application process take?",
    answer: "Processing times vary depending on the visa category, your location, and individual circumstances. We will provide a tailored timeline and expected milestones during your initial consultation."
  },
  {
    question: "Do you offer initial consultation services?",
    answer: "Yes, we offer comprehensive initial consultations to evaluate your case thoroughly, understand your goals, and outline the best possible route for your UK immigration journey."
  },
  {
    question: "What if my previous visa application was refused?",
    answer: "Our legal experts have extensive experience handling complex cases, including reapplications following a refusal. We carefully analyze the Home Office's reasons for refusal to build a stronger case."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="w-full bg-white section-master font-sans">
      <div className="container-master flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div className="w-full lg:w-[40%] flex flex-col">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-6">FAQS</span>
          <h2 className="heading-fluid-lg font-serif text-primary mb-6 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-fluid-base text-gray-600 mb-12 max-w-md">
            Find answers to common questions about our UK immigration services and visa processes.
          </p>

          <div className="bg-[#F2F1EC] rounded-lg p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-auto">
            <div>
              <h3 className="text-xl font-serif text-primary font-medium mb-2">Still have questions?</h3>
              <p className="text-sm text-gray-600">We're here to help you!</p>
            </div>
            <Link href="#" className="shrink-0 px-6 py-3 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-accent hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <div className="border-t border-black/20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-black/10">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left group focus:outline-none"
                  >
                    <span className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? 'text-primary' : 'text-primary/90 group-hover:text-accent'}`}>
                      {faq.question}
                    </span>
                    <span className="ml-6 flex-shrink-0 text-3xl font-light text-primary group-hover:text-accent transition-colors leading-none">
                      {isOpen ? '×' : '+'}
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
