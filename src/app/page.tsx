'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSpotlightSection from '@/components/landing/FeatureSpotlightSection';
import StudioBentoGrid from '@/components/landing/StudioBentoGrid';
import WhyWhatWhereSection from '@/components/landing/WhyWhatWhereSection';
import FinalCtaSection from '@/components/landing/FinalCtaSection';
import Footer from '@/components/landing/Footer';
import OnboardingModal from '@/components/ui/OnboardingModal';
import { Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col transition-colors duration-200 relative">
      {/* 1. Global Navigation with Product Tour Trigger */}
      <Navbar onOpenTour={() => setIsTourOpen(true)} />

      {/* 2. Google AI Studio-Grade Rhythmic Layout */}
      <main className="flex-1">
        {/* Interactive Studio Hero & Real-Time Document Deconstructor */}
        <HeroSection />

        {/* Highlighted Signature Spotlight: Spatial Coordinate Grounding (High-Contrast Break) */}
        <FeatureSpotlightSection />

        {/* Studio Bento Grid: 1M Multimodal Window + Table-to-CSV + Remedy Drafter */}
        <StudioBentoGrid />

        {/* Technical Accuracy Scorecard & Direct Comparison Matrix */}
        <WhyWhatWhereSection />

        {/* High-Conversion Command Center CTA */}
        <FinalCtaSection />
      </main>

      {/* 3. Floating Interactive Tour Helper Button */}
      <div className="fixed bottom-6 right-6 z-40 animate-in fade-in select-none">
        <button
          onClick={() => setIsTourOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/85 dark:bg-[#0E1210]/90 backdrop-blur-2xl border border-blue-500/30 hover:border-blue-500/60 shadow-xl text-xs font-bold text-[#0F172A] dark:text-[#F2F4F3] hover:text-blue-700 dark:hover:text-blue-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Interactive Product Tour & Helper Guide"
        >
          <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Sparkles className="w-3 h-3 animate-pulse" />
          </div>
          <span>Quick Tour</span>
        </button>
      </div>

      {/* 4. Onboarding Tour Modal */}
      <OnboardingModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartAudit={() => router.push(isAuthenticated ? '/dashboard' : '/login')}
        onOpenSettings={() => router.push(isAuthenticated ? '/dashboard' : '/login')}
      />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
