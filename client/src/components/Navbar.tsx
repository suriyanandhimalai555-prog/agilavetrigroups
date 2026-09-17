import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PopUpForm from './PopUpForm'; // Adjust path if needed

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

interface NavLink {
    name: string;
    href: string;
    isDropdown?: boolean;
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Popup State

    const navRef = useRef<HTMLDivElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const navLinks: NavLink[] = [
        { name: 'Hero', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Vision', href: '#vision' },
        { name: 'Subsidiaries', href: '#subsidiaries' },
        { name: 'Presence', href: '#presence' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Gold', href: '#gold' },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                gsap.to(navRef.current, { y: -100, duration: 0.5, ease: 'power3.out' });
            } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                gsap.to(navRef.current, { y: 0, duration: 0.5, ease: 'power3.out' });
            }

            if (currentScrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuOverlayRef.current, {
                y: '0%',
                duration: 0.8,
                ease: 'power4.inOut',
            });

            gsap.fromTo(
                linksRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
            );
        } else {
            gsap.to(menuOverlayRef.current, {
                y: '-100%',
                duration: 0.8,
                ease: 'power4.inOut',
            });
            setTimeout(() => setOpenDropdown(null), 800);
        }
    }, [isMenuOpen]);

    const handleDropdownToggle = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* --- Main Top Navbar --- */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full px-4 sm:px-6 md:px-12 lg:px-24 py-4 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-[#010a1f]/5 shadow-sm'
                    : 'bg-transparent border-transparent'
                    }`}
            >
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-12 md:h-14">
                    {/* Replaced scrollToSection with direct index page navigation */}
                    <a href="/" className="flex items-center gap-2 sm:gap-3 h-full shrink-0 overflow-hidden cursor-pointer">
                        <img
                            src="/logo.jpg"
                            alt="AgilaVetri Logo"
                            className="h-8 sm:h-10 md:h-12 w-auto object-contain shrink-0"
                        />
                        <span className={`font-bold tracking-wider text-xs sm:text-sm md:text-base transition-colors duration-300 truncate ${isScrolled ? 'text-[#010a1f]' : 'text-[#010a1f]'}`}>
                            AGILAVETRIGROUPS <span className="hidden sm:inline">PVT LTD</span>
                        </span>
                    </a>

                    <div className="flex items-center gap-3 sm:gap-4 md:gap-8 h-full shrink-0">
                        <a onClick={(e) => { e.preventDefault(); setIsPopupOpen(true); }} className={`flex items-center justify-center rounded-full border px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-400 cursor-pointer ${isScrolled
                            ? 'border-[#010a1f] text-[#010a1f] hover:bg-[#f77704] hover:text-white hover:border-[#f77704]'
                            : 'border-[#010a1f] text-[#010a1f] hover:bg-[#f77704] hover:text-white hover:border-[#f77704]'
                            }`}>
                            Connect
                        </a>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="group flex flex-col justify-center gap-[5px] md:gap-[6px] cursor-pointer p-1 md:p-2 h-full shrink-0"
                            aria-label="Open Menu"
                        >
                            <div className={`w-6 sm:w-8 md:w-9 h-[1.5px] transition-colors duration-300 ${isScrolled ? 'bg-[#010a1f] group-hover:bg-[#0437cc]' : 'bg-[#010a1f] group-hover:bg-[#0437cc]'}`}></div>
                            <div className={`w-6 sm:w-8 md:w-9 h-[1.5px] transition-colors duration-300 ${isScrolled ? 'bg-[#010a1f] group-hover:bg-[#0437cc]' : 'bg-[#010a1f] group-hover:bg-[#0437cc]'}`}></div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Fullscreen Menu Overlay --- */}
            <div
                ref={menuOverlayRef}
                className="fixed top-0 left-0 w-full h-screen bg-[#fafafa] z-50 flex flex-col translate-y-[-100%]"
            >
                <div className="w-full border-b border-[#010a1f]/5 px-4 sm:px-6 md:px-12 lg:px-24 py-4">
                    <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-12 md:h-14">
                        {/* Direct index page navigation & close menu */}
                        <a href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-hidden cursor-pointer">
                            <img
                                src="/logo.jpg"
                                alt="AgilaVetri Logo"
                                className="h-8 sm:h-10 md:h-12 w-auto object-contain shrink-0"
                            />
                            <span className="font-bold text-[#010a1f] tracking-wider text-xs sm:text-sm md:text-base truncate">
                                AGILAVETRIGROUPS <span className="hidden sm:inline">PVT LTD</span>
                            </span>
                        </a>

                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0"
                            aria-label="Close Menu"
                        >
                            <div className="absolute w-6 md:w-8 h-[1.5px] bg-[#010a1f] rotate-45"></div>
                            <div className="absolute w-6 md:w-8 h-[1.5px] bg-[#010a1f] -rotate-45"></div>
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex justify-center w-full h-full">
                    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row h-full">

                        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 md:py-0 overflow-y-auto">
                            <ul className="flex flex-col gap-5 md:gap-6">
                                {navLinks.map((link, index) => (
                                    <li key={link.name} className="overflow-hidden flex flex-col">
                                        <div className="flex items-center">
                                            <a
                                                href={link.href}
                                                ref={(el) => { linksRef.current[index] = el; }}
                                                onClick={(e) => link.isDropdown ? handleDropdownToggle(index, e) : scrollToSection(e, link.href)}
                                                className="cursor-pointer text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#010a1f] hover:text-[#0437cc] transition-all duration-400 hover:translate-x-3 inline-flex items-center gap-4"
                                            >
                                                {link.name}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col md:hidden gap-2 mt-16 pt-8 border-t border-[#010a1f]/10 text-[#010a1f]/80 font-light">
                                <p>contact@agilavetri.com</p>
                                <p>+91 9187112123</p>
                            </div>
                        </div>

                        <div className="hidden md:flex w-1/3 bg-[#fafafa] flex-col justify-end p-8 relative border-l border-[#010a1f]/5">
                            <div className="mb-12 z-10 relative">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#010a1f]/50 mb-4">Let's connect</h4>
                                <p className="text-lg md:text-xl font-light text-[#010a1f] mb-2">contact@agilavetri.com</p>
                                <p className="text-lg md:text-xl font-light text-[#010a1f] mb-6">+91 9187112123</p>

                                <div className="flex items-center gap-6">
                                    <a href="#" target="_blank" rel="noreferrer" className="text-[#010a1f]/40 hover:text-[#f77704] transition-colors duration-300 hover:-translate-y-1">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer" className="text-[#010a1f]/40 hover:text-[#f77704] transition-colors duration-300 hover:-translate-y-1">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-right text-[#010a1f]/5 text-5xl lg:text-7xl font-bold tracking-tighter uppercase pointer-events-none whitespace-nowrap">
                                AGILAVETRIGROUPS
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`fixed bottom-8 right-8 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0437cc] text-white shadow-[0_10px_30px_rgba(4,55,204,0.3)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#f77704] hover:scale-110 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(247,119,4,0.3)]
                ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            </button>

            {/* Form Overlay Component */}
            <PopUpForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
};

export default Navbar;