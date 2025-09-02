"use client";

import Navbar from "@/components/Navbar/navbar";
import AppShowcase from "@/components/Sections/App Showcase/app-showcase";
import DesignJourney from "@/components/Sections/Design Journey/design-journey";
import FeaturedProjects from "@/components/Sections/Featured Projects/featured-projects";
import Hero from "@/components/Sections/Hero/hero";
import MiniAbout from "@/components/Sections/MiniAbout/mini-about";
import Preloader from "@/components/PreLoader/pre-loader";
import ScrollIndicator from "@/components/ScrollIndicator/scroll-indicator";
import { useState } from "react";
import ContactFooter from "@/components/Sections/Contact/contact";
import NextPageFooter from "@/components/Sections/Next Page Footer/next-page-footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <ScrollIndicator />
          <Navbar />
          <main className="bg-[#f0f1fa]">
            <Hero />
            <MiniAbout />
            <FeaturedProjects />
            <AppShowcase />
            <DesignJourney />
            <ContactFooter />
            <NextPageFooter />
          </main>
        </>
      )}
    </>
  );
}
