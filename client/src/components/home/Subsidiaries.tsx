import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Subsidiaries: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const overlineRef = useRef<HTMLParagraphElement>(null);
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const closingRef = useRef<HTMLDivElement>(null);

    const addToRefs = (refsArray: React.MutableRefObject<(HTMLElement | null)[]>) => (el: HTMLElement | null) => {
        if (el && !refsArray.current.includes(el)) {
            refsArray.current.push(el);
        }
    };

    // Added 'link' property to each object for your redirections
    const subsidiariesData = [
        {
            title: "Agilavetri Trading Academy",
            description: "World-class professional training in financial markets and strategic trading.",
            image: "subsidiaries/agilavetri-trading-academy.png",
            colSpan: "lg:col-span-8",
            link: "https://avgtradingacademy.com/"
        },
        {
            title: "Agilavetri Jewelers Pvt Ltd",
            description: "Exquisite craftsmanship and timeless value in every piece of fine jewelry.",
            image: "subsidiaries/agilavetri-jewelers.png",
            colSpan: "lg:col-span-4",
            link: "#"
        },
        {
            title: "Agilavetri Land Promoters",
            description: "Strategic land development and transparent real-estate investments.",
            image: "subsidiaries/agilavetri-land-promoters.png",
            colSpan: "lg:col-span-4",
            link: "https://agilavetripromoters.com/"
        },
        {
            title: "Agilavetri Builders Pvt Ltd",
            description: "Building foundations for the future with innovative architectural solutions.",
            image: "subsidiaries/agilavetri-builders.png",
            colSpan: "lg:col-span-8",
            link: "https://agilavetripromoters.com/"
        },
        {
            title: "Public Charitable Trust",
            description: "Committed to impactful social initiatives and community empowerment.",
            image: "subsidiaries/public-charitable-trust.png",
            colSpan: "lg:col-span-6",
            link: "https://agilavetriganesha.org/"
        },
        {
            title: "Crypto Currency",
            description: "Leading the digital revolution with secure cryptocurrency ecosystems.",
            image: "subsidiaries/crypto-currency.png",
            colSpan: "lg:col-span-6",
            link: "https://avgexchange.io"
        }
    ];

    useEffect(() => {
        // --- 1. Top Overline Reveal ---
        gsap.fromTo(overlineRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
            }
        );

        // --- 2. Massive Intro Title Skew & Reveal ---
        titleRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { yPercent: 120, skewY: 3 },
                    {
                        yPercent: 0, skewY: 0, duration: 2.5, delay: index * 0.15, ease: "expo.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                    }
                );
            }
        });

        // --- 3. Subtitle Reveal ---
        gsap.fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
            }
        );

        // --- 4. Staggered Grid Cards Reveal ---
        cardRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 1.2, delay: (index % 3) * 0.15, ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                        }
                    }
                );
            }
        });

        // --- 5. Closing Statement Reveal ---
        gsap.fromTo(closingRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 2, ease: "power3.out",
                scrollTrigger: { trigger: closingRef.current, start: "top 85%" }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#fafafa] text-[#010a1f] py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-7xl mx-auto flex flex-col">

                {/* --- Top Heading Area --- */}
                <div className="flex flex-col mb-12 md:mb-20">
                    <p
                        ref={overlineRef}
                        className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-6 md:mb-10"
                    >
                        Our Ecosystem
                    </p>

                    <div className="overflow-hidden pb-1 md:pb-2">
                        <h2
                            ref={addToRefs(titleRefs)}
                            className="text-5xl md:text-6xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] text-[#010a1f] uppercase"
                        >
                            Pioneering
                        </h2>
                    </div>
                    <div className="overflow-hidden pb-2 md:pb-4">
                        <h2
                            ref={addToRefs(titleRefs)}
                            className="text-5xl md:text-6xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] text-[#0437cc] uppercase"
                        >
                            Global Sectors
                        </h2>
                    </div>
                </div>

                {/* --- Subtitle --- */}
                <div className="flex items-center justify-between mb-12 md:mb-16">
                    <p
                        ref={subtitleRef}
                        className="text-lg sm:text-xl md:text-2xl font-light text-[#010a1f]/70 max-w-2xl"
                    >
                        Explore our diverse subsidiaries driving innovation and sustainable growth across industries.
                    </p>
                </div>

                {/* --- Asymmetrical Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
                    {subsidiariesData.map((item, index) => (
                        <a
                            href={item.link}
                            key={index}
                            ref={addToRefs(cardRefs as unknown as React.MutableRefObject<(HTMLElement | null)[]>)}
                            className={`block group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer h-[350px] md:h-[400px] lg:h-[450px] ${item.colSpan}`}
                        >
                            {/* Background Image with Zoom on Hover */}
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                            </div>

                            {/* Dark Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010a1f]/90 via-[#010a1f]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

                            {/* Card Content Area */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 text-white">
                                {/* Numbering */}
                                <div className="text-sm font-bold tracking-widest text-[#f77704] mb-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    0{index + 1} //
                                </div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-sm md:text-base font-light text-white/80 line-clamp-2 max-w-md group-hover:text-white transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>

                            {/* Explore Arrow Button (Top Right) */}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-[#f77704] group-hover:border-[#f77704] group-hover:scale-110 group-hover:-rotate-45 shadow-lg">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                {/* --- Bottom Centered Closing Statement --- */}
                <div className="max-w-4xl mx-auto text-center mt-24 md:mt-32">
                    <div ref={closingRef}>
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light leading-snug text-[#010a1f]/80">
                            Each branch operates with a singular focus: <br className="hidden md:block" />
                            <span className="font-bold text-[#0437cc] relative inline-block group cursor-default">
                                Sustainable and limitless growth
                                <span className="absolute left-0 bottom-0 w-full h-[2px] md:h-[3px] bg-[#f77704] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                            </span>.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Subsidiaries;