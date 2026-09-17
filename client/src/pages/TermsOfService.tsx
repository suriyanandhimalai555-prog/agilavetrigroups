import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const TermsOfService: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    const termsSections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: "By accessing and using the Agilavetri Groups PVT LTD website and its related services, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement."
        },
        {
            id: "use-of-services",
            title: "2. Use of Services",
            content: "You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our platforms."
        },
        {
            id: "intellectual-property",
            title: "3. Intellectual Property",
            content: "All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Agilavetri Groups or its content suppliers and protected by international copyright laws. The compilation of all content on this site is the exclusive property of Agilavetri Groups, with copyright authorship for this collection by Agilavetri Groups."
        },
        {
            id: "limitation-liability",
            title: "4. Limitation of Liability",
            content: "Agilavetri Groups and its subsidiaries shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the website or services. This includes, but is not limited to, damages for loss of profits, use, data, or other intangible losses, even if Agilavetri Groups has been advised of the possibility of such damages."
        },
        {
            id: "governing-law",
            title: "5. Governing Law",
            content: "These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India, specifically under the jurisdiction of the courts in Tamil Nadu. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Tamil Nadu."
        },
        {
            id: "contact",
            title: "6. Contact Information",
            content: "Questions about the Terms of Service should be sent to us at:\n\nEmail: contact@agilavetri.com\nPhone: +91 9187112123\nAddress: NO.123/4, KOOTHAKUDI ROAD, NEELAMANGALAM, Kallakurichi, Kallakurichi(dt), Tamil Nadu, 606202"
        }
    ];

    useEffect(() => {
        // Hero Header Animation
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
            );
        }

        // Content Sections Scroll Reveal
        contentRefs.current.forEach((el) => {
            if (el) {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Smooth Scroll for Sidebar Navigation
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        // Offset for fixed navbar
        const yOffset = -100;
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-[#fafafa] min-h-screen">
            <Navbar />

            {/* --- Hero Header --- */}
            <header className="w-full bg-white pt-40 pb-20 px-6 md:px-12 lg:px-24 border-b border-[#010a1f]/10 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-[40vw] h-full bg-[#0437cc]/[0.02] -skew-x-12 translate-x-20 pointer-events-none"></div>

                <div ref={headerRef} className="max-w-7xl mx-auto relative z-10">
                    <p className="text-[#f77704] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4">
                        Legal Information
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter leading-[1.05] text-[#010a1f] mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-[#010a1f]/60 font-light text-lg">
                        Last Updated: September 16, 2026
                    </p>
                </div>
            </header>

            {/* --- Main Content Split Layout --- */}
            <main className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left Column: Sticky Sidebar / Table of Contents */}
                    <aside className="hidden lg:block lg:w-1/3 shrink-0">
                        <div className="sticky top-32">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-[#010a1f] mb-8 border-b border-[#010a1f]/10 pb-4">
                                Table of Contents
                            </h4>
                            <ul className="flex flex-col gap-5">
                                {termsSections.map((section) => (
                                    <li key={`nav-${section.id}`}>
                                        <a
                                            href={`#${section.id}`}
                                            onClick={(e) => scrollToSection(e, section.id)}
                                            className="text-[#010a1f]/60 hover:text-[#0437cc] font-light transition-all duration-300 inline-block hover:translate-x-2"
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Right Column: Policy Content */}
                    <div className="lg:w-2/3 flex flex-col gap-16 md:gap-20">
                        {termsSections.map((section) => (
                            <section
                                key={section.id}
                                id={section.id}
                                ref={addToRefs}
                                className="scroll-mt-32" // Helps native anchor links not hide under navbar
                            >
                                <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#010a1f] mb-6 flex items-center gap-4">
                                    {section.title}
                                </h2>
                                <div className="w-12 h-[2px] bg-[#f77704] mb-8"></div>
                                <div className="text-lg md:text-xl font-light leading-relaxed text-[#010a1f]/80 whitespace-pre-wrap">
                                    {section.content}
                                </div>
                            </section>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;