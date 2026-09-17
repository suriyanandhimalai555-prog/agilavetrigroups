import React, { useState } from 'react';
import Footer from '../components/Footer';
import About from '../components/home/About';
import Gallery from '../components/home/Gallery';
import GlobalPresence from '../components/home/GlobalPresence';
import HomeHeroCom from '../components/home/HomeHero';
import Subsidiaries from '../components/home/Subsidiaries';
import VisionMission from '../components/home/VisionMission';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const Index: React.FC = () => {
    // State to track if the initial loader is active
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <>
            {/* Render the Loader if isLoading is true */}
            {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
            
            <div className="w-full min-h-screen">
                <Navbar />
                <section id="hero">
                    <HomeHeroCom />
                </section>
                <section id="about">
                    <About />
                </section>
                <section id="vision">
                    <VisionMission />
                </section>
                <section id="subsidiaries">
                    <Subsidiaries />
                </section>
                <section id="presence">
                    <GlobalPresence />
                </section>
                <section id="gallery">
                    <Gallery />
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Index;