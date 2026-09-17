import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PopUpFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const PopUpForm: React.FC<PopUpFormProps> = ({ isOpen, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (isOpen) {
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
            document.body.style.overflow = 'auto';
            // Reset form when closed
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', message: '' });
                setErrors({});
                setSubmitStatus('idle');
            }, 300);
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

        if (!formData.name.trim()) newErrors.name = "Full name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (!formData.message.trim()) newErrors.message = "Please enter your message";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Check for the Vite env variable, fallback to localhost for development
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Automatically close the modal after 3 seconds
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010a1f]/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={!isSubmitting ? onClose : undefined}
        >
            <div
                ref={formRef}
                className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Strip */}
                <div className="w-full h-2 bg-gradient-to-r from-[#0437cc] to-[#f77704]"></div>

                {/* Close (X) Button - Fixed clickability by adding z-50 and padding */}
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className={`absolute top-4 right-4 z-50 p-2 transition-colors duration-300 ${isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-[#010a1f]/40 hover:text-[#f77704]'}`}
                    aria-label="Close form"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8 md:p-10 relative">

                    {/* Success Overlay */}
                    {submitStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-10">
                            <div className="w-20 h-20 bg-[#0437cc]/10 text-[#0437cc] rounded-full flex items-center justify-center mb-6">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight text-[#010a1f] mb-2">Message Sent</h3>
                            <p className="text-[#010a1f]/60 font-light">Thank you for reaching out. Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-3xl font-bold tracking-tight text-[#010a1f] mb-2">
                                Let's Connect
                            </h3>
                            <p className="text-[#010a1f]/60 font-light mb-8">
                                Leave your details below and our team will get back to you shortly.
                            </p>

                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="flex flex-col gap-1">
                                    <label className={`text-xs font-bold uppercase tracking-widest ${errors.name ? 'text-red-500' : 'text-[#010a1f]/50'}`}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full border-b-2 py-2 bg-transparent text-[#010a1f] focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#010a1f]/10 focus:border-[#0437cc]'}`}
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-1">
                                    <label className={`text-xs font-bold uppercase tracking-widest ${errors.email ? 'text-red-500' : 'text-[#010a1f]/50'}`}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`w-full border-b-2 py-2 bg-transparent text-[#010a1f] focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#010a1f]/10 focus:border-[#0437cc]'}`}
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                                </div>

                                {/* Phone Input */}
                                <div className="flex flex-col gap-1">
                                    <label className={`text-xs font-bold uppercase tracking-widest ${errors.phone ? 'text-red-500' : 'text-[#010a1f]/50'}`}>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 00000 00000"
                                        className={`w-full border-b-2 py-2 bg-transparent text-[#010a1f] focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#010a1f]/10 focus:border-[#0437cc]'}`}
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                                </div>

                                {/* Message Input */}
                                <div className="flex flex-col gap-1 mb-2">
                                    <label className={`text-xs font-bold uppercase tracking-widest ${errors.message ? 'text-red-500' : 'text-[#010a1f]/50'}`}>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        rows={3}
                                        className={`w-full border-b-2 py-2 bg-transparent text-[#010a1f] focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-[#010a1f]/10 focus:border-[#0437cc]'}`}
                                    ></textarea>
                                    {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="text-red-500 text-sm font-medium text-center">
                                        Failed to send message. Please try again later.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-full text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0437cc] hover:bg-[#f77704] shadow-lg shadow-[#0437cc]/20 hover:shadow-[#f77704]/30'}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopUpForm;