'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      gsap.from(".hero-content", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.3
      });
    });

    const tl = gsap.timeline();
    tl.from(".main-image", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    }).from(".cta-button", {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, 0.5);
  });

  return (
    <section className="relative h-[95vh] min-h-[600px] bg-gray-900 overflow-hidden pt-14 md:pt-0">
      {/* Navbar Spacer */}
      <div className="absolute top-0 h-14 w-full bg-black/80 backdrop-blur-sm z-30" />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-15 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-black" />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto h-full px-4 flex items-center relative">
        {/* Text Content */}
        <div className="hero-content relative z-10 w-full md:w-1/2 pt-8 md:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              LUPUS GYM
            </span>
            <span className="block text-lg md:text-xl lg:text-2xl text-gray-200 mt-3 font-medium">
              Forge Your Legacy. Join the Alpha Pack.
            </span>
          </h1>

          {/* CTA Section */}
          <div className="mt-8 space-y-4">
            <a
              href="https://wa.me/96895593558"
              className="cta-button inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-red-900/40"
            >
              Start Transformation →
            </a>
          </div>
        </div>

        {/* Main Image */}
        <div className="main-image absolute inset-0 md:left-auto md:right-0 md:w-1/2 h-full z-0">
          <div className="relative w-full h-full">
            <Image
              src="/img9.png"
              alt="Gym Showcase"
              fill
              priority
              className="object-cover md:object-left-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Mobile Optimized Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden">
        <div className="w-6 h-10 rounded-2xl border-2 border-red-500 flex items-start justify-center">
          <div className="w-1.5 h-3 bg-red-500 rounded-full mt-1 animate-bounce" />
        </div>
      </div>

      {/* Desktop Only Elements */}
      <div className="hidden md:block absolute bottom-20 left-12 z-10">
        <div className="flex flex-col space-y-4 text-red-500 font-mono">
          <span>24/7 ACCESS</span>
          <span>PRO GRADE EQUIPMENT</span>
          <span>EXPERT TRAINERS</span>
        </div>
      </div>

      {/* Animated Pulse Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow" />

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (max-width: 768px) {
          .hero-content {
            padding-top: 2rem !important;
          }
          
          .main-image {
            top: 10% !important;
            height: 50% !important;
          }
        }
      `}</style>
    </section>
  );
}