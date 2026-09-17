import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PopUpFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({ isOpen, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';

            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
            );
        } else {
            // Restore background scrolling
            document.body.style.overflow = 'auto';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010a1f]/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                ref={formRef}
                className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside form from closing modal
            >
                {/* Header Strip */}
                <div className="w-full h-2 bg-gradient-to-r from-[#0437cc] to-[#f77704]"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#010a1f]/40 hover:text-[#f77704] transition-colors duration-300"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 md:p-10">
                    <h3 className="text-3xl font-bold tracking-tight text-[#010a1f] mb-2">
                        Let's Connect
                    </h3>
                    <p className="text-[#010a1f]/60 font-light mb-8">
                        Leave your details below and our team will get back to you shortly.
                    </p>

                    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#010a1f]/50">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full border-b-2 border-[#010a1f]/10 py-2 bg-transparent text-[#010a1f] focus:outline-none focus:border-[#0437cc] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#010a1f]/50">Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full border-b-2 border-[#010a1f]/10 py-2 bg-transparent text-[#010a1f] focus:outline-none focus:border-[#0437cc] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#010a1f]/50">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 00000 00000"
                                className="w-full border-b-2 border-[#010a1f]/10 py-2 bg-transparent text-[#010a1f] focus:outline-none focus:border-[#0437cc] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#010a1f]/50">Message</label>
                            <textarea
                                placeholder="How can we help you?"
                                rows={3}
                                className="w-full border-b-2 border-[#010a1f]/10 py-2 bg-transparent text-[#010a1f] focus:outline-none focus:border-[#0437cc] transition-colors resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-full bg-[#0437cc] hover:bg-[#f77704] text-white font-bold uppercase tracking-widest text-sm transition-colors duration-300 shadow-lg shadow-[#0437cc]/20 hover:shadow-[#f77704]/30"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PopUpForm;