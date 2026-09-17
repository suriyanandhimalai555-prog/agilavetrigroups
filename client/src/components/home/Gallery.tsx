import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryContainerRef = useRef<HTMLDivElement>(null);

    // --- State Management ---
    // Generate an array of 52 image paths based on the requested format
    const totalImages = 38;
    const images = Array.from({ length: totalImages }, (_, i) => `/gallery/${i + 1}.jpg`);

    // Number of images to show initially (2 rows * 4 cols = 8 images)
    const initialCount = 8;
    const [visibleCount, setVisibleCount] = useState<number>(initialCount);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    // --- Pagination Handlers ---
    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, totalImages));
    };

    const handleShowLess = () => {
        setVisibleCount((prev) => Math.max(prev - 8, initialCount));
    };

    // --- Lightbox Handlers ---
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    const showNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };

    const showPrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % totalImages);
            if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, totalImages]);

    // --- Initial Scroll Animations ---
    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        if (galleryContainerRef.current) {
            gsap.fromTo(galleryContainerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
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
            className="w-full bg-[#fafafa] text-[#010a1f] py-20 md:py-32 px-6 md:px-12 lg:px-24 min-h-screen"
        >
            <div className="max-w-7xl mx-auto">

                {/* --- Section Header --- */}
                <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
                    <p className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4">
                        Visual Journey
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#010a1f] uppercase">
                        Our <span className="text-[#0437cc]">Gallery</span>
                    </h2>
                    {/* <div className="w-24 h-[3px] bg-[#f77704] mt-8"></div> */}
                </div>

                {/* --- Gallery Grid --- */}
                <div
                    ref={galleryContainerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
                >
                    {images.slice(0, visibleCount).map((src, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative w-full aspect-square overflow-hidden cursor-pointer bg-[#010a1f]/5 rounded-sm"
                        >
                            {/* Overlay Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010a1f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                            {/* Hover Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 scale-50 group-hover:scale-100">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Image */}
                            <img
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback if image path is incorrect before assets are added
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888082-ce46c2fbe5aa?q=80&w=600&auto=format&fit=crop";
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* --- Pagination Buttons --- */}
                <div className="flex items-center justify-center gap-6">
                    {/* Show Less Button */}
                    {visibleCount > initialCount && (
                        <button
                            onClick={handleShowLess}
                            className="px-8 py-3 text-sm md:text-base font-bold uppercase tracking-widest text-[#010a1f] border-2 border-[#010a1f] hover:bg-[#010a1f] hover:text-white transition-colors duration-300 rounded-full"
                        >
                            Show Less
                        </button>
                    )}

                    {/* Show More Button */}
                    {visibleCount < totalImages && (
                        <button
                            onClick={handleShowMore}
                            className="px-8 py-3 text-sm md:text-base font-bold uppercase tracking-widest text-white border-2 border-[#0437cc] bg-[#0437cc] hover:bg-[#f77704] hover:border-[#f77704] transition-all duration-300 rounded-full shadow-lg"
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>

            {/* =========================================
                LIGHTBOX (FULL SCREEN VIEWER)
            ========================================= */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#010a1f]/95 backdrop-blur-xl"
                    onClick={closeLightbox}
                >
                    {/* Top Bar: Counter & Close Button */}
                    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
                        <span className="text-white/70 font-medium tracking-widest text-sm md:text-base">
                            {currentImageIndex + 1} / {totalImages}
                        </span>

                        <button
                            onClick={closeLightbox}
                            className="text-white/70 hover:text-[#f77704] transition-colors p-2"
                            aria-label="Close Lightbox"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full max-w-5xl max-h-[80vh] px-4 md:px-12 flex items-center justify-center">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Gallery Fullscreen ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
                            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing lightbox
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541888082-ce46c2fbe5aa?q=80&w=1200&auto=format&fit=crop";
                            }}
                        />
                    </div>

                    {/* Left Navigation Arrow */}
                    <button
                        onClick={showPrevImage}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0437cc] border border-white/10 hover:border-[#0437cc] text-white backdrop-blur-md transition-all duration-300 z-50"
                        aria-label="Previous Image"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={showNextImage}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0437cc] border border-white/10 hover:border-[#0437cc] text-white backdrop-blur-md transition-all duration-300 z-50"
                        aria-label="Next Image"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
};

export default Gallery;