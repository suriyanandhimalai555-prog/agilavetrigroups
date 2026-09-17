import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const HomeHeroCom: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Refs for the Hero Section Elements
    const overlineRef = useRef<HTMLHeadingElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- Main Hero Animation Timeline ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // 1. Fade & Slide in the text elements on the left
        tl.fromTo(overlineRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        )
            .fromTo(titleRef.current,
                { opacity: 0, y: 50, skewY: 2 },
                { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "expo.out" },
                "-=0.6"
            )
            .fromTo(dividerRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" },
                "-=0.8"
            )
            .fromTo(introRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.6"
            )
            .fromTo(quoteRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

        // 2. Creative Image Reveal on the right (Fixed to use timeline 'tl')
        if (imageContainerRef.current && imageRef.current) {
            tl.fromTo(imageContainerRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
                "-=1.5"
            );

            tl.fromTo(imageRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
                "-=1.2"
            );
        }

        // 3. Subtle Parallax for the massive background text
        if (bgTextRef.current) {
            gsap.to(bgTextRef.current, {
                x: "-10%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[90vh] md:min-h-screen bg-white overflow-hidden flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24"
        >
            {/* --- Decorative Background Accents --- */}
            <div className="absolute top-0 right-0 w-[40vw] h-[100vh] bg-[#010a1f]/[0.02] -skew-x-12 translate-x-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

                {/* --- Left Column: Typography & Intro --- */}
                <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 relative z-20">

                    {/* Overline */}
                    <div className="overflow-hidden mb-4">
                        <h2 ref={overlineRef} className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#f77704] uppercase">
                            Visionary Leadership
                        </h2>
                    </div>

                    {/* Massive Bold Title */}
                    <div className="overflow-hidden mb-6">
                        <h1 ref={titleRef} className="text-5xl sm:text-7xl lg:text-[6rem] leading-[1.05] font-bold text-[#010a1f] uppercase tracking-tighter">
                            Agilan <br />
                            <span className="text-[#0437cc]">Vasudevan</span>
                        </h1>
                    </div>

                    {/* Animated Divider */}
                    <div ref={dividerRef} className="w-20 h-[3px] bg-[#f77704] mb-8"></div>

                    {/* Concise Intro Text */}
                    <p ref={introRef} className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-[#010a1f]/80 max-w-2xl mb-10">
                        AGILAVETRIGROUPS is a forward-thinking conglomerate dedicated to driving innovation across multiple sectors. We specialize in building <span className="font-semibold text-[#0437cc]">sustainable, modern, and transformative solutions.</span>
                    </p>

                    {/* Highlighted Quote Box */}
                    <div ref={quoteRef} className="border-l-4 border-[#f77704] bg-[#0437cc]/5 p-6 max-w-xl">
                        <p className="text-xl md:text-2xl font-bold italic text-[#010a1f]">
                            "Empowering Visions, Engineering Success"
                        </p>
                    </div>
                </div>

                {/* --- Right Column: Creative Founder Presentation --- */}
                <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end mt-10 lg:mt-0">

                    {/* Abstract Glow Backdrop */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-[#0437cc]/15 to-[#f77704]/10 blur-3xl -z-10"></div>

                    {/* Image Container with Geometric Framing */}
                    <div ref={imageContainerRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[400px] sm:h-[500px] lg:h-[650px] flex items-end justify-center">

                        {/* Decorative Accent: Orange Square */}
                        <div className="absolute bottom-12 -right-4 md:-right-8 w-24 h-24 md:w-32 md:h-32 border-4 border-[#f77704] -z-10 transition-transform duration-700 hover:scale-110 hover:rotate-6"></div>

                        {/* Decorative Accent: Blue Block */}
                        <div className="absolute top-20 -left-4 md:-left-8 w-20 h-20 md:w-24 md:h-24 bg-[#0437cc]/10 -z-10"></div>

                        {/* Large Founder Image */}
                        <img
                            ref={imageRef}
                            src="/founder.png"
                            alt="Agilan Vasudevan - Founder"
                            className="w-auto h-full object-contain drop-shadow-2xl z-10"
                        />
                    </div>
                </div>
            </div>

            {/* --- Scrolling Background Watermark --- */}
            <div ref={bgTextRef} className="absolute bottom-10 left-0 whitespace-nowrap overflow-hidden opacity-[0.03] pointer-events-none select-none z-0">
                <h1 className="text-[10rem] md:text-[12rem] font-bold text-[#010a1f] uppercase leading-none tracking-tighter">
                    AGILAVETRI GROUPS AGILAVETRI GROUPS
                </h1>
            </div>
        </section>
    );
};

export default HomeHeroCom;