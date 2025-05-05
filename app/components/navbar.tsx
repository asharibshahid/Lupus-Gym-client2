'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    // Desktop animations
    gsap.from(".desktop-nav", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.5
    });

    gsap.from(".logo-img", {
      scale: 0,
      rotate: -180,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    });

    gsap.from(".nav-item", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".desktop-nav",
        start: "top center"
      }
    });

    // CTA button pulse
    const ctaTl = gsap.timeline({ repeat: -1 });
    ctaTl.to(".cta-button", {
      boxShadow: "0 0 25px rgba(37, 211, 102, 0.5)",
      scale: 1.02,
      duration: 1.5,
      ease: "power1.inOut"
    }).to(".cta-button", {
      boxShadow: "0 0 10px rgba(37, 211, 102, 0.3)",
      scale: 1,
      duration: 1.5,
      ease: "power1.inOut"
    });

    // Nav item hover
    (gsap.utils.toArray(".nav-item") as HTMLElement[]).forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -3, color: "#FF4655", duration: 0.3 });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { y: 0, color: "#FFFFFF", duration: 0.3 });
      });
    });

    // Mobile menu initial setup
    gsap.set(".mobile-nav", { x: '-100%' });
    gsap.set(".menu-backdrop", { opacity: 0, pointerEvents: 'none' });
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Close menu
      gsap.to(".mobile-nav", {
        x: '-100%',
        duration: 0.5,
        ease: "power4.out"
      });
      gsap.to(".menu-backdrop", {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.style.overflow = 'auto';
          gsap.set(".menu-backdrop", { pointerEvents: 'none' });
        }
      });
    } else {
      // Open menu
      document.body.style.overflow = 'hidden';
      gsap.set(".menu-backdrop", { pointerEvents: 'all' });
      gsap.to(".mobile-nav", {
        x: '0%',
        duration: 0.5,
        ease: "power4.out"
      });
      gsap.to(".menu-backdrop", {
        opacity: 1,
        duration: 0.3
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="desktop-nav fixed w-full top-0 z-50 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-xl shadow-2xl hidden md:block">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="logo-container flex items-center space-x-4">
            <div className="logo-img relative h-16 w-16 overflow-hidden rounded-full border-2 border-red-500/30">
              <Image
                src="/img1.jpg"
                alt="Lupus Gym Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">LUPUS GYM</h1>
              <p className="text-sm text-red-400 font-medium tracking-wide">
                TRAIN HARD • STAY STRONG • JOIN THE PACK
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-10">
            {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`/components/${item.toLowerCase()}`}
                className="nav-item text-white font-medium relative group"
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          <a
            href="https://wa.me/96895593558"
            className="cta-button bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full font-bold relative overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">Join on WhatsApp</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="logo-img relative h-12 w-12 overflow-hidden rounded-full border-2 border-red-500/30">
              <Image
                src="/img1.jpg"
                alt="Lupus Gym Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">LUPUS GYM</span>
          </Link>
          
          <button 
            onClick={toggleMenu}
            className="text-white text-2xl z-50 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        <div 
          className="menu-backdrop fixed inset-0 bg-black/80 z-40" 
          onClick={toggleMenu}
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Mobile Menu Content */}
        <div className="mobile-nav fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl z-50 shadow-2xl p-8 transform -translate-x-full">
          <div className="space-y-8 mt-16">
            {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`/components/${item.toLowerCase()}`}
                className="mobile-nav-item block text-2xl text-white font-medium hover:text-red-500 transition-colors"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
            
            <a
              href="https://wa.me/96895593558"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-bold transform transition-all duration-300 flex items-center space-x-2"
            >
              <span>Join on WhatsApp</span>
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
