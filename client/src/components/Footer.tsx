import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PopUpForm from './PopUpForm';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Popup State
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const navLinksColumn1 = [
        { name: 'Hero', href: '#hero' },
        { name: 'About Us', href: '#about' },
        { name: 'Vision & Mission', href: '#vision' },
        { name: 'Subsidiaries', href: '#subsidiaries' },
    ];

    const navLinksColumn2 = [
        { name: 'Global Presence', href: '#presence' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Gold', href: '#gold' },
    ];

    useEffect(() => {
        if (bgImageRef.current && footerRef.current) {
            gsap.fromTo(bgImageRef.current,
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );
        }

        if (footerRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%",
                }
            });

            tl.fromTo(ctaRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
                .fromTo(gridRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=0.5"
                );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        if (window.history.pushState) {
            window.history.pushState(null, '', href);
        }

        if (href === '#hero' || href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <footer
                ref={footerRef}
                className="relative w-full text-white pt-20 md:pt-32 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#010a1f]"
            >
                {/* --- Parallax Background Image --- */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <img
                        ref={bgImageRef}
                        src="/footer.png"
                        alt="Agilavetri Footer Background"
                        className="w-full h-full object-cover scale-125 origin-center opacity-90"
                    />
                </div>

                {/* --- Dark Gradient Overlay --- */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#010a1f]/90 via-[#010a1f]/95 to-[#010a1f] z-0 pointer-events-none"></div>

                {/* --- Background Watermark --- */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] z-10 overflow-hidden">
                    <h1 className="text-[10vw] font-bold tracking-tighter leading-none whitespace-nowrap">
                        AGILAVETRI GROUPS
                    </h1>
                </div>

                <div className="max-w-7xl mx-auto relative z-20 flex flex-col">

                    {/* --- Top CTA Section --- */}
                    <div ref={ctaRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
                        <div className="max-w-2xl">
                            <p className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4 drop-shadow-md">
                                Ready to build the future?
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight drop-shadow-lg">
                                Let's engineer <span className="text-[#0437cc]">success</span> together.
                            </h2>
                        </div>
                        <div className="shrink-0 pb-2">
                            {/* Changed to trigger PopUpForm */}
                            <a
                                onClick={(e) => { e.preventDefault(); setIsPopupOpen(true); }}
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-[#f77704] hover:bg-[#0437cc] transition-colors duration-300 rounded-full shadow-[0_10px_30px_rgba(247,119,4,0.3)] hover:shadow-[0_10px_30px_rgba(4,55,204,0.5)] backdrop-blur-md cursor-pointer"
                            >
                                Connect With Us
                            </a>
                        </div>
                    </div>

                    {/* --- Main Footer Grid --- */}
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                        {/* Brand Column */}
                        <div className="lg:col-span-4 flex flex-col">
                            <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="flex items-center gap-3 mb-6 cursor-pointer inline-block w-fit">
                                <span className="font-bold tracking-wider text-xl lg:text-2xl text-white drop-shadow-md">
                                    AGILAVETRIGROUPS
                                </span>
                            </a>
                            <p className="text-white/70 font-light leading-relaxed mb-8 max-w-sm">
                                Empowering Visions, Engineering Success. Driving innovation and sustainable growth across global sectors.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-5">
                                <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#f77704] hover:bg-[#f77704] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#f77704] hover:bg-[#f77704] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#f77704] hover:bg-[#f77704] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links Column 1 */}
                        <div className="lg:col-span-2 lg:col-start-6 flex flex-col">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6">Company</h4>
                            <ul className="flex flex-col gap-4">
                                {navLinksColumn1.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className="cursor-pointer text-white/70 hover:text-[#f77704] font-light transition-all duration-300 inline-block hover:translate-x-2"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links Column 2 */}
                        <div className="lg:col-span-2 flex flex-col">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6">Discover</h4>
                            <ul className="flex flex-col gap-4">
                                {navLinksColumn2.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className="cursor-pointer text-white/70 hover:text-[#f77704] font-light transition-all duration-300 inline-block hover:translate-x-2"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        onClick={(e) => { e.preventDefault(); setIsPopupOpen(true); }}
                                        className="cursor-pointer text-white/70 hover:text-[#f77704] font-light transition-all duration-300 inline-block hover:translate-x-2"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Column */}
                        <div className="lg:col-span-3 flex flex-col">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-white/50 mb-6">Get in Touch</h4>
                            <ul className="flex flex-col gap-4 font-light text-white/70">
                                <li>
                                    <a href="mailto:support@agilavetrigroups.com" className="hover:text-[#f77704] transition-colors duration-300">
                                        support@agilavetrigroups.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+919187112123" className="hover:text-[#f77704] transition-colors duration-300">
                                        +91 9187112123
                                    </a>
                                </li>
                                <li className="pt-2">
                                    {/* Updated Address */}
                                    <address className="not-italic text-white/60 text-sm leading-relaxed">
                                        NO.123/4, KOOTHAKUDI ROAD,<br />
                                        NEELAMANGALAM, Kallakurichi,<br />
                                        Kallakurichi(dt),<br />
                                        Tamil Nadu, 606202
                                    </address>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* --- Bottom Legal Bar --- */}
                    <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/50">
                        <p>
                            &copy; {new Date().getFullYear()} Agilavetri Groups Pvt Ltd. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
                            <a href="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Form Overlay Component */}
            <PopUpForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};

export default Footer;