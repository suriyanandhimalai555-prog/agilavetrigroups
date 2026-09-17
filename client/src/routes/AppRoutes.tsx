import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Main Landing Page */}
                <Route path="/" element={<Index />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                {/* 404 Catch-All Route */}
                <Route path="*" element={
                    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] text-[#010a1f]">
                        <h1 className="text-6xl font-bold mb-4">404</h1>
                        <p className="text-xl font-light">The page you are looking for does not exist.</p>
                        <a href="/" className="mt-8 px-6 py-3 bg-[#0437cc] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#f77704] transition-colors">
                            Return Home
                        </a>
                    </div>
                } />
            </Routes>
        </Router>
    );
};

export default AppRoutes;