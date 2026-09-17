import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent scrolling while the loader is active
        document.body.style.overflow = 'hidden';

        // GSAP Timeline to animate the loader out after a short delay
        const tl = gsap.timeline({
            delay: 2.5, // Adjust this delay based on how long you want the loader to stay on screen
            onComplete: () => {
                document.body.style.overflow = 'auto'; // Restore scrolling
                onComplete(); // Tell the parent component to unmount the loader
            }
        });

        // Smoothly slide the loader up and out of the frame
        tl.to(loaderRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
        });

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010a1f] w-full h-screen"
        >
            {/* Lottie Animation Container - Size Increased */}
            <div className="w-64 h-64 md:w-[400px] md:h-[400px]  flex items-center justify-center">
                <DotLottieReact
                    src="/cube.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default Loader;