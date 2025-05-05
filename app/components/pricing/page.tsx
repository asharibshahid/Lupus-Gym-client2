// components/PricingSection.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const [currency, setCurrency] = useState('OMR');
  const [conversionRate] = useState(0.38); // Example rate

  useGSAP(() => {
    // Section title animation
    gsap.from('.section-title', {
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top center'
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out'
    });

    // Currency switch animation
    gsap.from('.currency-switch', {
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });

    // Card matrix entrance
    gsap.utils.toArray('.pricing-card').forEach((card: any, i) => {
      const xPos = i % 2 === 0 ? 500 : -500;
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
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

    // Hover effects
    gsap.utils.toArray('.pricing-card').forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(255, 70, 85, 0.3)',
          duration: 0.5
        });
        gsap.to(card.querySelector('.price-badge'), {
          scale: 1.1,
          backgroundColor: '#ff4655',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 10px 30px rgba(255, 70, 85, 0.1)',
          duration: 0.5
        });
        gsap.to(card.querySelector('.price-badge'), {
          scale: 1,
          backgroundColor: '#1a1a1a',
          duration: 0.3
        });
      });
    });

    // Floating animation
    gsap.to('.pricing-card', {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });

    // Background particles
    const particleTl = gsap.timeline({ repeat: -1 });
    document.querySelectorAll('.price-particle').forEach(particle => {
      particleTl.to(particle, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(-360, 360)',
        duration: 8,
        ease: 'none'
      }, 0);
    });
  });

  const pricingPlans = [
    {
      title: 'RAW POWER ACCESS',
      price: 'TBA',
      details: ['24/7 Battle Station Entry', 'Warrior Nutrition Bar', 'Biometric Lockers'],
      intensity: 3
    },
    {
      title: 'COMBAT BOXING',
      price: 35,
      details: ['3 Weekly War Sessions', 'Sparring Simulations', 'Championship Drills'],
      intensity: 4
    },
    {
      title: 'FUNCTIONAL WARFARE',
      price: 35,
      details: ['Tactical Movement Training', 'Obstacle Course Access', 'SWAT Conditioning'],
      intensity: 5
    },
    {
      title: 'ELITE CROSSFIT',
      price: 35,
      details: ['Extreme HIIT Protocols', 'Olympic Lifting Zone', 'Neuro-Muscular Drills'],
      intensity: 4
    },
    {
      title: '1-ON-1 DOCTRINE',
      price: 130,
      details: ['Custom Battle Plans', 'Black Ops Nutrition', 'Weakness Eradication'],
      intensity: 5
    }
  ];

  const convertPrice = (price: number) => {
    if (currency === 'USD') return `$${(price * conversionRate).toFixed(2)}`;
    return `${price} OMR`;
  };

  return (
    <section className="pricing-section relative py-32 bg-black overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="price-particle absolute w-2 h-2 bg-red-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }} />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="section-title text-6xl md:text-7xl font-black uppercase mb-6">
            <span className="text-outline">INVEST IN</span>
            <span className="text-red-500 mx-4">DOMINATION</span>
          </h2>
          
          {/* Currency Switch */}
          <div className="currency-switch inline-flex items-center gap-4 mb-8">
            <span className="text-gray-400">Show prices in:</span>
            <button 
              onClick={() => setCurrency('OMR')}
              className={`px-4 py-2 rounded-full ${currency === 'OMR' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              OMR
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-full ${currency === 'USD' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-300'}`}
            >
              USD
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="pricing-card relative bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/20 rounded-2xl p-8 transform-style-preserve-3d">
              {/* Intensity Meter */}
              <div className="absolute top-8 right-8 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-2 h-8 ${i < plan.intensity ? 'bg-red-500' : 'bg-gray-800'}`} />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                
                <div className="price-badge inline-block bg-gray-800 px-6 py-3 rounded-full mb-6 transition-all">
                  <span className="text-3xl font-black bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    {typeof plan.price === 'number' ? convertPrice(plan.price) : plan.price}
                  </span>
                </div>

                <ul className="space-y-4 text-gray-300">
                  {plan.details.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 border-b border-red-500/10 pb-4">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-red-500">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="mt-8 w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full relative overflow-hidden group">
                  <span className="relative z-10">DEPLOY TO BATTLE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Blood Oath */}
        <div className="mt-20 text-center">
          <p className="text-red-400 font-mono text-xl border border-red-500/30 inline-block px-8 py-4 rounded-full animate-pulse">
            WARNING: Results require 100% commitment. Weakness will be eliminated.
          </p>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 2px #ff4655;
          color: transparent;
        }

        @keyframes blood-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        .animate-pulse {
          animation: blood-pulse 2s infinite;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
          @keyframes particle-float {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

.price-particle {
  animation: particle-float 10s infinite linear;
}
      `}</style>
    </section>
  );
}