// components/TrainersSection.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function TrainersSection() {
  useGSAP(() => {
    // DNA Strand Animation
    gsap.fromTo(".dna-strand",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".trainers-section",
          start: "top center"
        }
      }
    );

    // 3D Card Flip Effect
    gsap.utils.toArray('.trainer-card').forEach((card: any) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(card, {
            rotationY: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out"
          });
        }
      });
    });

    // Hover Particle Effect
    gsap.utils.toArray('.trainer-card').forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(card.querySelector('.energy-pulse'), {
          x: x,
          y: y,
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelectorAll('.energy-pulse'), {
          opacity: 0,
          scale: 0.5,
          duration: 0.5
        });
      });
    });

    // Muscle Fiber Animation
    gsap.to(".muscle-fiber", {
      xPercent: -100,
      duration: 20,
      repeat: -1,
      ease: "none",
      scrollTrigger: {
        trigger: ".trainers-section",
        start: "top bottom"
      }
    });
  });

  const trainers = [
    { 
      img: '/img12.png',
      name: 'TYSON VENOM',
      specialty: 'Combat Conditioning',
      level: 'ELITE-5'
    },
    { 
      img: '/img13.png',
      name: 'NATASHA IRON',
      specialty: 'Metabolic Annihilation',
      level: 'PRO-9'
    },
    { 
      img: '/img14.png',
      name: 'KRONOS STEEL',
      specialty: 'Extreme Transformation',
      level: 'MASTER-7'
    },
    { 
      img: '/img12.png',
      name: 'RAZOR BLADE',
      specialty: 'Tactical Strength',
      level: 'PHANTOM-12'
    }
  ];

  return (
    <section className="trainers-section relative py-32 bg-black overflow-hidden">
      {/* DNA Strand Decoration */}
      <div className="dna-strand absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent origin-top" />

      {/* Muscle Fiber Pattern */}
      <div className="muscle-fiber absolute inset-0 opacity-10 bg-[length:200px_200px] bg-repeat"
        style={{ backgroundImage: "url('/muscle-pattern.png')" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-6">
            <span className="text-outline">WEAPON</span>
            <span className="text-red-500 mx-4">X</span>
            <span className="text-outline">ARCHITECTS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our genetic freaks of nature will reconstruct your DNA through brutal efficiency 
            and scientific savagery. No weak programs - only battlefield-proven protocols.
          </p>
        </div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="trainer-card relative h-[600px] opacity-0 rotateY-90 transform-style-preserve-3d">
              {/* Energy Pulse Effect */}
              <div className="energy-pulse absolute w-20 h-20 bg-red-500/20 rounded-full pointer-events-none scale-0" />
              
              {/* Card Content */}
              <div className="absolute inset-0 border-2 border-red-500/30 bg-black/80 backdrop-blur-sm">
                <Image
                  src={trainer.img}
                  alt={trainer.name}
                  fill
                  className="object-cover mix-blend-luminosity opacity-90"
                />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-white">{trainer.name}</h3>
                    <p className="text-red-400 font-mono text-sm">{trainer.level}</p>
                  </div>
                  <div className="h-px bg-red-500/50 mb-4" />
                  <p className="text-sm text-gray-300 font-medium">{trainer.specialty}</p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[['KILLS', '978'], ['VICTORIES', '100%'], ['WAR', '24/7']].map(([label, value]) => (
                      <div key={label} className="text-center">
                        <div className="text-red-500 text-xl font-black">{value}</div>
                        <div className="text-xs text-gray-400 uppercase">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blood Oath Text */}
        <div className="mt-20 text-center">
          <p className="text-red-500 font-mono text-xl animate-pulse">
            WARNING: These results require 100% commitment. Weakness will be eliminated.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 2px #ff4655;
          color: transparent;
        }

        .rotateY-90 {
          transform: rotateY(90deg);
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes muscle-fiber {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}