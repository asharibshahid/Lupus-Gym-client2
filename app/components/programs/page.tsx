// components/ProgramsSection.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
gsap.registerPlugin(ScrollTrigger);

export default function ProgramsSection() {
  useGSAP(() => {
    // Logo explosion animation
    
  

    // Matrix-style card animations
    (gsap.utils.toArray('.program-card') as HTMLElement[]).forEach((card, i) => {
      const xPos = i % 2 === 0 ? 500 : -500;
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "top center",
        animation: gsap.fromTo(card,
          { 
            opacity: 0,
            x: xPos,
            rotate: i % 2 === 0 ? 15 : -15,
            filter: 'blur(20px)'
          },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: "power4.out"
          }
        )
      });
    });

    // Hover plasma effect
    (gsap.utils.toArray('.program-card') as  HTMLElement[]).forEach((card) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(card.querySelector('.plasma-overlay'), {
          '--x': `${x}px`,
          '--y': `${y}px`,
          opacity: 1,
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.plasma-overlay'), {
          opacity: 0,
          duration: 0.5
        });
      });
    });

    // Blood drip effect
    const bloodTL = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    bloodTL.to(".blood-drip", {
      y: '100%',
      duration: 3,
      ease: "power2.in",
      stagger: 0.2
    }).to(".blood-drip", {
      y: '-100%',
      duration: 0.1,
      delay: 0.5
    });

    // 3D marquee
    gsap.to(".scrolling-text", {
      xPercent: -100,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  });

  const programs = [
    { img: '/img5.jpg', title: 'BEAST MODE TRAINING' },
    { img: '/img6.jpg', title: 'CROSSFIT WARZONE' },
    { img: '/img7.jpg', title: 'COMBAT BOXING' },
    { img: '/img8.jpg', title: 'FUNCTIONAL WARFARE' },
    { img: '/img4.jpg', title: '24/7 BATTLE ACCESS' }
  ];

  return (
    <section className="programs-section relative py-32 bg-black overflow-hidden">
      {/* Animated Blood Drips */}
      <div className="blood-overlay absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="blood-drip absolute top-0 h-20 w-1 bg-red-500/50" 
            style={{ left: `${i * 12.5}%`, filter: 'blur(2px)' }} />
        ))}
      </div>

      {/* Danger Logo Animation */}
      

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="programs-header mb-28 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-500 via-orange-400 to-red-600 bg-clip-text text-transparent mb-8">
            <span className="text-outline">ENTER THE WARRIOR ZONE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-medium">
            WE DONT OFFER WORKOUTS  WE CREATE BATTLEFIELDS. 24/7 ACCESS TO OUR<br />
            MILITARY-GRADE TRAINING FACILITIES WITH BLOOD, SWEAT & LEGENDARY RESULTS.
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="programs-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {programs.map((program, index) => (
            <div key={index} className="program-card relative h-[500px] overflow-hidden rounded-2xl border-2 border-red-500/20 bg-black shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transition duration-500">

              {/* Plasma Effect */}
              <div className="plasma-overlay absolute inset-0 opacity-0 pointer-events-none"
                style={{ 
                  background: `radial-gradient(600px at var(--x) var(--y), rgba(255,70,85,0.3), transparent)`,
                  transition: 'opacity 0.3s'
                }}
              />

<Image
  src={program.img}
  alt={program.title}
  fill
  className="object-cover brightness-110 contrast-105 saturate-125 transition-transform duration-500 hover:scale-105"
/>

              
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-4">{program.title}</h3>
                <Link href="/contactUs" >
                <button className="blood-button relative bg-red-500/90 text-white px-6 py-3 rounded-lg font-bold overflow-hidden group">
                  <span className="relative z-10">ENLIST NOW</span>
                  <div className="absolute inset-0 bg-red-600/50 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Scrolling Text */}
        <div className="scrolling-text relative h-40 overflow-hidden rotate-[-3deg] transform perspective-1000">
          <div className="absolute whitespace-nowrap flex gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-stroke inline-block text-8xl font-black uppercase italic">
                <span className="text-transparent stroke-text">BLOOD</span>
                <span className="text-red-500 mx-8">SWEAT</span>
                <span className="text-transparent stroke-text">GLORY</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 2px #ff4655;
          color: transparent;
        }

        .stroke-text {
          -webkit-text-stroke: 1px #ffffff;
        }

        .blood-button::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, #ff0000, #ff4655, #ff0000);
          z-index: -1;
          filter: blur(10px);
          opacity: 0.3;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .text-stroke {
          text-shadow: 4px 4px 0 #ff4655, 
                       -1px -1px 0 #ff4655,  
                       1px -1px 0 #ff4655,
                       -1px 1px 0 #ff4655,
                       1px 1px 0 #ff4655;
        }
      `}</style>
    </section>
  );
}