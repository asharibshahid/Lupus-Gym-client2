'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 }
    });

    tl.from(".hero-content", { y: 100, opacity: 0 })
      .from(".main-image", { 
        scale: 1.3, 
        rotate: -3, 
        transformOrigin: "center bottom",
        duration: 1.8 
      }, 0)
      .from(".cta-section", { 
        opacity: 0, 
        y: 30, 
        scale: 0.95 
      }, 0.4);

    gsap.to(".floating-element", {
      y: 30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  return (
    <section className="hero-section relative h-screen overflow-hidden bg-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-900/20" />
      </div>

      <div className="container mx-auto h-full px-4 md:px-8 relative flex items-center">
        {/* Text Content */}
        <div className="hero-content relative z-10 max-w-2xl space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              LUPUS GYM
            </span>
            <span className="block text-lg md:text-2xl lg:text-3xl font-semibold text-gray-200 mt-3 md:mt-6">
              Forge Your Legacy. Join the Alpha Pack.
            </span>
          </h1>

          {/* CTA Section */}
          <div className="cta-section space-y-4">
            <a
              href="https://wa.me/96895593558"
              className="cta-button inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-base md:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-red-900/40"
            >
              Start Your Transformation →
            </a>
          </div>
        </div>

        {/* Main Image with Floating Effect */}
        <div className="main-image absolute inset-0 w-full h-full z-0">
          <div className="absolute right-0 bottom-0 w-full md:w-[60%] h-[70%] md:h-full overflow-hidden">
            <Image
              src="/img5.jpg"
              alt="Elite Training"
              fill
              priority
              className="object-cover object-center rounded-tl-[4rem] md:rounded-tl-[8rem] border-l-4 border-t-4 border-red-500/50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
          </div>
        </div>

        {/* Floating Accent Elements */}
        <div className="absolute bottom-20 left-6 md:left-12 floating-element">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-red-500/20 rounded-full blur-xl" />
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <div className="w-8 h-14 rounded-3xl border-4 border-red-500 flex items-start justify-center">
          <div className="w-2 h-4 bg-red-500 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}