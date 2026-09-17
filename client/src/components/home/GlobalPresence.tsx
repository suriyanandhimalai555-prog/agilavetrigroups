import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const GlobalPresence: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const overlineRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

    const addToStatsRefs = (el: HTMLDivElement | null) => {
        if (el && !statsRefs.current.includes(el)) {
            statsRefs.current.push(el);
        }
    };

    const dummyStats = [
        { value: "50+", label: "Operational Branches" },
        { value: "10K+", label: "Trusted Partners" },
        { value: "5+", label: "International Markets" },
        { value: "100%", label: "Ethical Standards" }
    ];

    useEffect(() => {
        // --- 1. Background Parallax Effect ---
        if (bgImageRef.current && sectionRef.current) {
            gsap.fromTo(bgImageRef.current,
                { yPercent: -20 },
                {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );
        }

        // --- 2. Main Content Reveal ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textContainerRef.current,
                start: "top 80%",
            }
        });

        tl.fromTo(overlineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(titleRef.current,
            { opacity: 0, y: 40, skewY: 2 },
            { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "expo.out" },
            "-=0.6"
        )
        .fromTo(paragraphRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.8"
        );

        // --- 3. Glassmorphism Stats Staggered Reveal ---
        statsRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.9, y: 30 },
                    {
                        opacity: 1, 
                        scale: 1, 
                        y: 0, 
                        duration: 1.2, 
                        delay: index * 0.15,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: textContainerRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[90vh] flex items-center py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#010a1f]"
        >
            {/* --- Parallax Background Image --- */}
            {/* We scale the image to 120% (scale-120) so it has room to move up and down without showing edges */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <img
                    ref={bgImageRef}
                    src="/global-presence/global.png"
                    alt="Global Network Background"
                    className="w-full h-full object-cover scale-125 origin-center opacity-40"
                />
            </div>

            {/* --- Dark Gradient Overlay for Readability --- */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#010a1f] via-[#010a1f]/90 to-[#010a1f]/40 z-0 pointer-events-none"></div>

            {/* --- Main Content Grid --- */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                    
                    {/* Left Column: Typography & Content */}
                    <div ref={textContainerRef} className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-10">
                        
                        <p
                            ref={overlineRef}
                            className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-6 flex items-center gap-4"
                        >
                            <span className="w-12 h-[2px] bg-[#f77704]"></span>
                            Expanding Horizons
                        </p>

                        <div className="overflow-hidden mb-8">
                            <h2
                                ref={titleRef}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white"
                            >
                                A Global Network <br className="hidden md:block"/>
                                <span className="text-[#0437cc] drop-shadow-lg">of Trust.</span>
                            </h2>
                        </div>

                        <p
                            ref={paragraphRef}
                            className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white/80 max-w-2xl text-justify"
                        >
                            With a strong presence across multiple locations, Agilavetri Groups is expanding its footprint with operational branches throughout South India and a growing international reach. 
                            <br /><br />
                            The organization focuses on building a trusted global network through strategic partnerships, professional systems, and disciplined expansion. By maintaining high standards and ethical business practices, the group continues to strengthen its presence while creating <span className="font-semibold text-white">sustainable opportunities worldwide.</span>
                        </p>
                    </div>

                    {/* Right Column: Glassmorphism Stats (Dummy Content) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
                        {dummyStats.map((stat, index) => (
                            <div
                                key={index}
                                ref={addToStatsRefs}
                                className="relative flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#f77704]/50 transition-colors duration-500 group overflow-hidden"
                            >
                                {/* Subtle hover glow behind the glass */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0437cc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                                
                                <h4 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-[#f77704] mb-2 tracking-tighter">
                                    {stat.value}
                                </h4>
                                <p className="relative z-10 text-sm md:text-base font-medium text-white/70 uppercase tracking-widest">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GlobalPresence;