import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const VisionMission: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const overlineRef = useRef<HTMLParagraphElement>(null);
    const bigWordsRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const mainStatementRef = useRef<HTMLParagraphElement>(null);
    const listHeaderRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const listItemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const closingRefs = useRef<(HTMLParagraphElement | null)[]>([]);

    // Helper to dynamically push elements to ref arrays
    const addToBigWordsRefs = (el: HTMLHeadingElement | null) => {
        if (el && !bigWordsRefs.current.includes(el)) {
            bigWordsRefs.current.push(el);
        }
    };

    const addToListHeaderRefs = (el: HTMLHeadingElement | null) => {
        if (el && !listHeaderRefs.current.includes(el)) {
            listHeaderRefs.current.push(el);
        }
    };

    const addToListItemRefs = (el: HTMLLIElement | null) => {
        if (el && !listItemRefs.current.includes(el)) {
            listItemRefs.current.push(el);
        }
    };

    const addToClosingRefs = (el: HTMLParagraphElement | null) => {
        if (el && !closingRefs.current.includes(el)) {
            closingRefs.current.push(el);
        }
    };

    const missionPoints = [
        "Provide assured and profitable opportunities",
        "Empower individuals to secure their future",
        "Guide through structured systems and training",
        "Enable sustainable growth and success",
        "Support dreams through ethical practices"
    ];

    const visionPoints = [
        "Strong team spirit and unity",
        "High standards with discipline",
        "Systematic sustainable development",
        "Assured growth and better life standards",
        "Future-ready strong leadership teams"
    ];

    useEffect(() => {
        // --- 1. Overline Reveal ---
        gsap.fromTo(overlineRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
                scrollTrigger: { trigger: overlineRef.current, start: "top 85%" }
            }
        );

        // --- 2. Massive Core Values ---
        bigWordsRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { yPercent: 120, skewY: 3 },
                    {
                        yPercent: 0,
                        skewY: 0,
                        duration: 2.5,
                        delay: index * 0.15,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: el.parentNode as Element,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        // --- 3. Main Strategic Statement Fade/Slide Up ---
        gsap.fromTo(mainStatementRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 2, ease: "power3.out",
                scrollTrigger: { trigger: mainStatementRef.current, start: "top 85%" }
            }
        );

        // --- 4. Split Lists Reveal ---
        listHeaderRefs.current.forEach((el) => {
            if (el) {
                gsap.fromTo(el,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1, x: 0, duration: 1.5, ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 85%" }
                    }
                );
            }
        });

        listItemRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 1.5, delay: (index % 5) * 0.1,
                        ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 90%" }
                    }
                );
            }
        });

        // --- 5. Closing Statement ---
        closingRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 2, delay: index * 0.2, ease: "power3.out",
                        scrollTrigger: { trigger: el.parentNode as Element, start: "top 85%" }
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
            className="w-full bg-white text-[#010a1f] py-12 px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">

                {/* --- Section Header (Top Left Alignment) --- */}
                <div className="mb-6 md:mb-10">
                    <p
                        ref={overlineRef}
                        className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold"
                    >
                        Vision & Mission
                    </p>
                </div>

                {/* --- Row 1: Unified Values & Statement --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 md:mb-20">

                    {/* Left: Core Values (Massive Typography) */}
                    <div className="lg:w-1/2 shrink-0 flex flex-col gap-1 md:gap-2">
                        {["Growth Unity", "Ethics"].map((word, i) => (
                            <div key={i} className="overflow-hidden">
                                <h2
                                    ref={addToBigWordsRefs}
                                    className={`text-4xl md:text-5xl lg:text-[6rem] font-bold tracking-tighter leading-[0.9] uppercase ${i === 1 ? "text-[#0437cc]" : "text-[#010a1f]" // Highlights "Unity"
                                        }`}
                                >
                                    {word}
                                </h2>
                            </div>
                        ))}
                    </div>

                    {/* Right: Main Strategic Statement */}
                    <div className="lg:w-1/2 lg:pl-12 max-w-2xl">
                        <p
                            ref={mainStatementRef}
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-snug text-[#010a1f]/90"
                        >
                            Empowering individuals to achieve their dreams demands more than just opportunity. <span className="font-bold text-[#0437cc]">It requires a systematic foundation.</span>
                        </p>
                    </div>

                </div>

                {/* --- Row 2: Two-Column Split Lists --- */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-20 mb-16 md:mb-20 border-t border-[#010a1f]/10 pt-10 md:pt-14">

                    {/* Left Column: Mission */}
                    <div className="flex-1">
                        <h3
                            ref={addToListHeaderRefs}
                            className="text-lg md:text-xl font-bold text-[#010a1f] mb-6 tracking-wide uppercase"
                        >
                            Our Mission is driven by:
                        </h3>
                        <ul className="flex flex-col gap-5">
                            {missionPoints.map((item, i) => (
                                <li
                                    key={i}
                                    ref={addToListItemRefs}
                                    className="text-lg md:text-xl font-light text-[#010a1f]/80 flex items-center gap-5"
                                >
                                    <span className="w-6 md:w-8 h-[2px] bg-[#f77704]/80 block shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Vision */}
                    <div className="flex-1">
                        <h3
                            ref={addToListHeaderRefs}
                            className="text-lg md:text-xl font-bold text-[#010a1f] mb-6 tracking-wide uppercase"
                        >
                            Our Global Vision ensures:
                        </h3>
                        <ul className="flex flex-col gap-5">
                            {visionPoints.map((item, i) => (
                                <li
                                    key={i}
                                    ref={addToListItemRefs}
                                    className="text-lg md:text-xl font-light text-[#010a1f]/80 flex items-center gap-5"
                                >
                                    <span className="w-6 md:w-8 h-[2px] bg-[#0437cc]/80 block shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* --- Closing Vision --- */}
                <div className="max-w-4xl mx-auto text-center pt-8 md:pt-12">
                    <p ref={addToClosingRefs} className="text-xl md:text-2xl font-light text-[#010a1f]/60 mb-2">
                        Our fundamental approach is clear:
                    </p>
                    <p ref={addToClosingRefs} className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0437cc] leading-snug">
                        Ethical foundations <span className="text-[#010a1f]">for</span> wealthy profits.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default VisionMission;