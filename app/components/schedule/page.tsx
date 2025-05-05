// components/ScheduleSection.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ScheduleSection() {
  useGSAP(() => {
    // Time blast effect
    gsap.from(".time-blast", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2
    });

    // Schedule cards animation
     (gsap.utils.toArray('.schedule-card') as HTMLElement[]).forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(card,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out"
            }
          );
        }
      });
    });

    // Real-time clock
    const updateTime = () => {
      const now = new Date();
      gsap.to(".live-clock", {
        innerText: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        duration: 0.5,
        ease: "power1.out",
        onUpdate: () => {
          const status = document.querySelector('.gym-status') as HTMLElement | null;
          const hours = now.getHours();
          const isOpen = (hours >= 5 && hours < 24) || (hours >= 0 && hours < 2);
          if (status) {
            status.textContent = isOpen ? "WE'RE OPEN NOW" : "CLOSED - COME BACK SOON";
            status.style.color = isOpen ? "#25D366" : "#FF4655";
          }
              }
      });
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Hover effects for table
     (gsap.utils.toArray('.schedule-row') as HTMLElement[]).forEach((row, i) => {
      row.addEventListener('mouseenter', () => {
        gsap.to(row, {
          backgroundColor: '#ffffff08',
          duration: 0.3
        });
      });
      row.addEventListener('mouseleave', () => {
        gsap.to(row, {
          backgroundColor: 'transparent',
          duration: 0.3
        });
      });
    });
  });

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img9.jpg"
          alt="Gym Interior"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">
            <span className="text-red-500">24/7</span> BATTLE STATION
          </h2>
          <div className="time-blast inline-block text-4xl font-bold text-white px-8 py-4 rounded-full border-2 border-red-500/30">
            <span className="live-clock">--:--</span> • 
            <span className="gym-status ml-4">CHECKING STATUS...</span>
          </div>
        </div>
        {/* Motivation Blog Section */}
<div className="text-center text-white max-w-4xl mx-auto mb-24">
  <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-500 animate-pulse tracking-tight">
    🔥 GRIND NEVER STOPS
  </h3>
  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
    No excuses. No shortcuts. Just pure effort every single day. At <strong className="text-white">LUPUS GYM</strong>,
    we open our doors before the sun rises and keep them open past midnight — so every warrior has their time
    to rise, grind, and dominate.
  </p>
  <p className="text-md mt-6 text-red-400 font-mono">
    🕒 5:00 AM – 12:00 MIDNIGHT | 7 DAYS A WEEK | NEVER CLOSED
  </p>
</div>


        {/* Schedule Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Gym Timings */}
          <div className="schedule-card bg-black/60 backdrop-blur-sm border-2 border-red-500/20 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">WARRIOR ACCESS</h3>
            <div className="space-y-6">
              {[
                ['MON-THU', '5:00 AM - 12:00 MIDNIGHT'],
                ['FRIDAY', '2:00 PM - 12:00 MIDNIGHT'],
                ['SAT-SUN', '5:00 AM - 12:00 MIDNIGHT']
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center py-3 border-b border-red-500/10">
                  <span className="text-gray-300 font-medium">{day}</span>
                  <span className="text-red-400 font-mono">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Class Schedule */}
          <div className="schedule-card bg-black/60 backdrop-blur-sm border-2 border-red-500/20 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">COMBAT PROGRAMS</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-500/20 to-transparent">
                    <th className="text-left py-4 px-4 text-red-400">CLASS TYPE</th>
                    <th className="py-4 px-4 text-red-400">SESSIONS/WEEK</th>
                    <th className="text-right py-4 px-4 text-red-400">INVESTMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Boxing', '3', '35 OMR'],
                    ['Functional Fitness', '3', '35 OMR'],
                    ['Crossfit', '3', '35 OMR'],
                    ['Personal Training', 'Custom', '130 OMR']
                  ].map(([type, sessions, price]) => (
                    <tr key={type} className="schedule-row border-b border-red-500/10">
                      <td className="py-4 px-4 text-white font-medium">{type}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{sessions}</td>
                      <td className="py-4 px-4 text-right text-red-400 font-mono">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="cta-button bg-gradient-to-r from-red-600 to-orange-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-2xl shadow-red-500/30">
            JOIN THE BATTLEFIELD NOW
          </button>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-1 h-20 bg-red-500/20 animate-laser"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }} />
        ))}
      </div>

      <style jsx global>{`
        @keyframes laser {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .animate-laser {
          animation: laser 4s linear infinite;
        }
      `}</style>
      <style jsx global>{`
        @keyframes status-pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        .gym-status {
          animation: status-pulse 2s infinite;
        }
      `}</style>
    </section>
  );
}