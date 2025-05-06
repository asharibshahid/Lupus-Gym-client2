'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ScheduleSection() {
  useGSAP(() => {
    // Mobile-first animations
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(".schedule-card", {
        x: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: ".schedule-card",
          start: "top 90%",
        }
      });
    });

    // Time blast effect
    gsap.from(".time-blast", {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    });

    // Mobile-specific animations
    gsap.from(".motivation-section", {
      scrollTrigger: {
        trigger: ".motivation-section",
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 1
    });

    // Real-time clock with mobile optimization
    const updateTime = () => {
      const now = new Date();
      gsap.to(".live-clock", {
        innerText: now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        duration: 0.5,
        ease: "power1.out",
        onUpdate: () => {
          const status = document.querySelector('.gym-status') as HTMLElement;
          const hours = now.getHours();
          const isOpen = hours >= 5 && hours < 24;
          if (status) {
            status.innerHTML = isOpen ? 
              `<span class="status-dot animate-pulse"></span> WE'RE OPEN NOW` : 
              "CLOSED - COME BACK SOON";
            if (status) {
              status.style.color = isOpen ? "#25D366" : "#FF4655";
            }
          }
        }
      });
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Mobile hover removal
    if(window.innerWidth >= 768) {
      gsap.utils.toArray('.schedule-row').forEach((row) => {
        (row as HTMLElement).addEventListener('mouseenter', () => {
          gsap.to(row as HTMLElement, { backgroundColor: '#ffffff08', duration: 0.3 });
        });
        (row as HTMLElement).addEventListener('mouseleave', () => {
          gsap.to(row as HTMLElement, { backgroundColor: 'transparent', duration: 0.3 });
        });
      });
    }
  });

  return (
    <section className="relative bg-black py-16 md:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img9.jpg"
          alt="Gym Interior"
          fill
          priority
          className="object-cover opacity-20"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header with Mobile Padding */}
        <div className="text-center mb-12 md:mb-20 px-2">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-4 md:mb-6 leading-tight">
            <span className="text-red-500 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              24/7
            </span><br className="md:hidden" /> 
            BATTLE STATION
          </h2>
          <div className="time-blast inline-block text-xl md:text-4xl font-bold text-white px-6 py-3 md:px-8 md:py-4 rounded-full border-2 border-red-500/30">
            <span className="live-clock">--:--</span> • 
            <span className="gym-status ml-2 md:ml-4 text-sm md:text-base">
              <span className="status-dot animate-pulse"></span> CHECKING STATUS...
            </span>
          </div>
        </div>

        {/* Motivation Section with Enhanced Animations */}
        <div className="motivation-section text-center text-white max-w-4xl mx-auto mb-16 md:mb-24 px-2">
          <h3 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
            🔥 GRIND NEVER STOPS
          </h3>
          <div className="animated-border mx-auto mb-6 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4">
            No excuses. No shortcuts. Just pure effort every single day. At{' '}
            <strong className="text-white font-bold">LUPUS GYM</strong>,
            we open our doors before the sun rises and keep them open past midnight.
          </p>
          <div className="gradient-text font-mono text-sm md:text-md bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
            🕒 5:00 AM – 12:00 MIDNIGHT | 7 DAYS A WEEK
          </div>
        </div>

        {/* Responsive Schedule Grid */}
        <div className="grid gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Gym Timings Card */}
          <div className="schedule-card bg-black/60 backdrop-blur-sm border-2 border-red-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              ⚡ WARRIOR ACCESS
            </h3>
            <div className="space-y-4 md:space-y-6">
              {[
                ['MON-THU', '5:00 AM - 12:00 MIDNIGHT'],
                ['FRIDAY', '2:00 PM - 12:00 MIDNIGHT'],
                ['SAT-SUN', '5:00 AM - 12:00 MIDNIGHT']
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center py-2 md:py-3 border-b border-red-500/10">
                  <span className="text-gray-300 text-sm md:text-base">{day}</span>
                  <span className="text-red-400 font-mono text-sm md:text-base">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Class Schedule Card */}
          <div className="schedule-card bg-black/60 backdrop-blur-sm border-2 border-red-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              🥊 COMBAT PROGRAMS
            </h3>
            <div className="overflow-x-auto pb-2">
              <table className="w-full min-w-[500px] md:min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-500/20 to-transparent">
                    <th className="text-left py-3 md:py-4 px-2 md:px-4 text-red-400 text-sm md:text-base">CLASS</th>
                    <th className="py-3 md:py-4 px-2 md:px-4 text-red-400 text-sm md:text-base">SESSIONS</th>
                    <th className="text-right py-3 md:py-4 px-2 md:px-4 text-red-400 text-sm md:text-base">PRICE</th>
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
                      <td className="py-3 md:py-4 px-2 md:px-4 text-white text-sm md:text-base">{type}</td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-center text-gray-300 text-sm md:text-base">{sessions}</td>
                      <td className="py-3 md:py-4 px-2 md:px-4 text-right text-red-400 font-mono text-sm md:text-base">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center px-2">
          <button className="cta-button w-full md:w-auto bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-xl md:rounded-full text-lg md:text-xl font-bold transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-red-500/30">
            JOIN THE BATTLEFIELD NOW
          </button>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-20 bg-red-500/20 animate-laser"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`
            }} />
        ))}
      </div>

      {/* Mobile-Specific Styles */}
      <style jsx global>{`
        @keyframes laser {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(150vh); }
        }

        .animate-laser {
          animation: laser 8s linear infinite;
        }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #25D366;
          margin-right: 8px;
        }

        @media (max-width: 768px) {
          .animated-border {
            width: 80px;
            height: 2px;
          }
          
          .schedule-card {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        }
      `}</style>
    </section>
  );
}