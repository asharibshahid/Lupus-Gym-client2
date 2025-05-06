'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaTimes, FaBars } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".desktop-nav", { y: -100, opacity: 0, duration: 1.2, ease: "expo.out", delay: 0.5 });
    gsap.from(".logo-img", { scale: 0, rotate: -180, duration: 1.5, ease: "elastic.out(1, 0.5)" });
    gsap.from(".nav-item", { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power4.out" });
    
    const ctaTl = gsap.timeline({ repeat: -1 });
    ctaTl.to(".cta-button", { boxShadow: "0 0 25px rgba(37, 211, 102, 0.5)", scale: 1.02, duration: 1.5 })
         .to(".cta-button", { boxShadow: "0 0 10px rgba(37, 211, 102, 0.3)", scale: 1, duration: 1.5 });

    (gsap.utils.toArray(".nav-item") as HTMLElement[]).forEach((item) => {
      item.addEventListener('mouseenter', () => gsap.to(item, { y: -3, color: "#FF4655", duration: 0.3 }));
      item.addEventListener('mouseleave', () => gsap.to(item, { y: 0, color: "#FFFFFF", duration: 0.3 }));
    });
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.timeline()
        .to(mobileNavRef.current, { x: '-100%', duration: 0.8, ease: "power4.out" })
        .to(backdropRef.current, { opacity: 0, duration: 0.5 }, 0)
        .then(() => document.body.style.overflow = 'auto');
    } else {
      document.body.style.overflow = 'hidden';
      gsap.timeline()
        .fromTo(mobileNavRef.current, { x: '-100%' }, { x: '0%', duration: 0.8, ease: "power4.out" })
        .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
        .from(".mobile-nav-item", { x: -50, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.2);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="desktop-nav fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-xl shadow-2xl hidden md:block">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="logo-container flex items-center gap-3">
            <div className="logo-img relative h-14 w-14 overflow-hidden rounded-full border-2 border-red-500/30">
              <Image src="/img1.jpg" alt="Logo" fill className="object-cover" priority />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">LUPUS GYM</h1>
              <p className="text-xs text-red-400 font-medium">TRAIN HARD • STAY STRONG</p>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing'].map((item) => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="nav-item text-white font-medium relative group">
                <span className="relative z-10">{item}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          <a href="https://wa.me/96895593558" className="cta-button bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2">
            <FaWhatsapp className="text-lg" /> Join Now
          </a>
        </div>
      </nav>

      <nav className="md:hidden fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="logo-img relative h-12 w-12 overflow-hidden rounded-full border-2 border-red-500/30">
              <Image src="/img1.jpg" alt="Logo" fill className="object-cover" priority />
            </div>
            <span className="text-lg font-bold text-white">LUPUS GYM</span>
          </Link>
          
          <button onClick={toggleMenu} className="text-white z-50 p-2">
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        <div ref={backdropRef} className="menu-backdrop fixed inset-0 bg-black/80 z-40" onClick={toggleMenu} />
        
        <div ref={mobileNavRef} className="mobile-nav fixed left-0 top-0 h-full w-72 bg-gray-900/95 backdrop-blur-xl z-50 shadow-2xl p-6">
          <div className="space-y-6 mt-20">
            {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} onClick={toggleMenu}
                className="mobile-nav-item block text-xl text-white font-medium hover:text-red-500 transition-colors">
                {item}
              </Link>
            ))}
            
            <a href="https://wa.me/96895593558" target="_blank" rel="noreferrer"
              className="cta-button bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 text-lg">
              <FaWhatsapp /> Join Now
            </a>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        .mobile-nav { transform: translateX(-100%); }
        .menu-backdrop { opacity: 0; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { transform: translateX(-100%); transition: transform 0.3s ease; }
          .menu-backdrop { transition: opacity 0.3s ease; }
        }
      `}</style>
    </>
  );
}