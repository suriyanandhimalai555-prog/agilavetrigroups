import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Arrays of refs for scroll animations
    const headlineRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const storyTextRefs = useRef<(HTMLParagraphElement | HTMLDivElement | null)[]>([]);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Helper functions to collect refs dynamically
    const addToHeadlineRefs = (el: HTMLHeadingElement | null) => {
        if (el && !headlineRefs.current.includes(el)) {
            headlineRefs.current.push(el);
        }
    };

    const addToStoryRefs = (el: HTMLParagraphElement | HTMLDivElement | null) => {
        if (el && !storyTextRefs.current.includes(el)) {
            storyTextRefs.current.push(el);
        }
    };

    useEffect(() => {
        // --- 1. Main Headline Reveal ("About AgilaVetri") ---
        headlineRefs.current.forEach((el) => {
            if (el) {
                gsap.fromTo(el,
                    { yPercent: 120, skewY: 3 },
                    {
                        yPercent: 0,
                        skewY: 0,
                        duration: 2,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: el.parentNode as Element,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        // --- 2. Story Text Fade & Slide Up ---
        storyTextRefs.current.forEach((el) => {
            if (el) {
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        // --- 3. Cinematic Rectangular Image Reveal ---
        if (imageContainerRef.current && imageRef.current) {
            gsap.fromTo(imageContainerRef.current,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 2,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: "top 85%",
                    }
                }
            );

            gsap.fromTo(imageRef.current,
                { scale: 1.15 },
                {
                    scale: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: "top 85%",
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white text-[#010a1f] py-12 px-6 md:px-12 lg:px-24"
        >
            {/* --- Section 1: The Hook --- */}
            <div className="max-w-7xl mx-auto mb-20 md:mb-32 pt-10">
                <p className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-6">
                    Our Foundation
                </p>
                <div className="overflow-hidden">
                    <h2 ref={addToHeadlineRefs} className="text-4xl md:text-5xl lg:text-[6rem] font-bold tracking-tight leading-[1.1] text-[#010a1f]">
                        About Us
                    </h2>
                </div>
            </div>

            {/* --- Section 2: The Story (Editorial Split Layout) --- */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 mb-24 md:mb-32">
                {/* Left Column - Sticky Heading */}
                <div className="lg:w-1/3">
                    <div className="sticky top-32">
                        <h3 className="text-3xl md:text-5xl text-[#010a1f] font-bold tracking-tight mb-4">
                            AgilaVetri <br className="hidden lg:block" />
                            <span className="text-[#0437cc]">அகிலவெற்றி!</span>
                        </h3>
                        <div className="w-16 h-[3px] bg-[#f77704]"></div>
                    </div>
                </div>

                {/* Right Column - Foundation Story */}
                <div className="lg:w-2/3 flex flex-col gap-8 md:gap-12 text-xl lg:text-3xl font-light leading-relaxed text-[#010a1f]/80 text-justify">
                    <p ref={addToStoryRefs}>
                        <span className="text-[#0437cc] font-bold block mb-2 text-2xl lg:text-4xl">Driven by Purpose</span>
                        A conglomerate built on the principles of integrity, innovation, and sustainable development. We look beyond traditional business models to engineer lasting value.
                    </p>
                    <p ref={addToStoryRefs}>
                        Our journey began with a clear understanding of the evolving global market—where progress demands adaptability. By uniting diverse sectors under one visionary umbrella, we bridge the gap between foundational infrastructure and next-generation technology.
                    </p>
                </div>
            </div>

            {/* --- Section 3: Cinematic Rectangular Image --- */}
            <div className="max-w-7xl mx-auto mb-24 md:mb-32">
                <div
                    ref={imageContainerRef}
                    className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-[#010a1f]/5 border border-[#010a1f]/10"
                >
                    {/* Orange accent square behind the image border to tie in the theme */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f77704]/20 blur-2xl z-0"></div>

                    <img
                        ref={imageRef}
                        src="/about/about.webp"
                        alt="AgilaVetri Groups Corporate Excellence"
                        className="relative z-10 w-full h-full object-cover transition-all duration-1000"
                    />
                </div>
            </div>

        </section>
    );
};

export default About;