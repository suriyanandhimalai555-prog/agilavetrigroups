import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    const policySections = [
        {
            id: "introduction",
            title: "1. Introduction",
            content: "Welcome to Agilavetri Groups PVT LTD. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you. We engineer success through ethical practices, and safeguarding your information is a fundamental part of that commitment."
        },
        {
            id: "data-collection",
            title: "2. The Data We Collect",
            content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (first name, last name, title), Contact Data (email address, telephone numbers), Technical Data (internet protocol (IP) address, browser type and version, time zone setting and location), and Usage Data (information about how you use our website and services)."
        },
        {
            id: "how-we-use",
            title: "3. How We Use Your Data",
            content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you; Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests; Where we need to comply with a legal obligation."
        },
        {
            id: "data-sharing",
            title: "4. Data Sharing & Security",
            content: "We may share your personal data with internal third parties (our subsidiaries across South India and internationally) and external third parties (service providers acting as processors). We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Access to your personal data is limited to those employees, agents, and contractors who have a strict business need to know."
        },
        {
            id: "your-rights",
            title: "5. Your Legal Rights",
            content: "Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to: Request access to your personal data; Request correction of your personal data; Request erasure of your personal data; Object to processing of your personal data; Request restriction of processing your personal data; Request transfer of your personal data; Right to withdraw consent."
        },
        {
            id: "contact",
            title: "6. Contact Us",
            content: "If you have any questions about this privacy policy or our privacy practices, please contact us at:\n\nEmail: contact@agilavetri.com\nPhone: +91 9187112123\nAddress: NO.123/4, KOOTHAKUDI ROAD, NEELAMANGALAM, Kallakurichi, Kallakurichi(dt), Tamil Nadu, 606202"
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
        contentRefs.current.forEach((el, index) => {
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
                        Privacy Policy
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
                                {policySections.map((section) => (
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
                        {policySections.map((section) => (
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

export default PrivacyPolicy;