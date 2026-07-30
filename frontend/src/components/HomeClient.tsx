'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import HeroSection from '@/components/sections/HeroSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CourseBenefits from '@/components/sections/CourseBenefits';
import ChallengeTimeline from '@/components/sections/ChallengeTimeline';
import FAQ from '@/components/sections/FAQ';
import ContactSection from '@/components/sections/ContactSection';
import RegistrationForm from '@/components/sections/RegistrationForm';
import BackToTop from '@/components/common/BackToTop';
import InstructorDrawer from '@/components/sections/InstructorDrawer';

import MobileBottomBar from '@/components/layout/MobileBottomBar';
import MobileQuickAccess from '@/components/common/MobileQuickAccess';
export default function HomeClient() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const handleOpen = () => setDrawerOpen(true);
    window.addEventListener('open-instructor-drawer', handleOpen);
    return () => window.removeEventListener('open-instructor-drawer', handleOpen);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full pb-16 md:pb-0">
        <HeroSection onAboutClick={() => setDrawerOpen(true)} />
        <WhyChooseUs />
        <CourseBenefits />
        <ChallengeTimeline />
        <RegistrationForm />
        <FAQ />
        <ContactSection />
        <BackToTop />
      </div>

      {/* Mobile-first bottom action bar */}
      <MobileBottomBar />

      {/* Instructor Drawer — hidden by default, opens on button click */}
      <InstructorDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

